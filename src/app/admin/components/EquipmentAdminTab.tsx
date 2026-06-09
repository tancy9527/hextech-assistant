"use client";

import { useState, useEffect, useCallback, useMemo } from "react";

interface EquipItem {
  id: string; game_id: string; name: string; description: string;
  icon_url: string; price: number; is_active: boolean; category?: string;
}

const CATEGORIES = [
  { key: "all", label: "全部", cls: "bg-sage-200 text-sage-600" },
  { key: "战士", label: "战士", cls: "bg-orange-100 text-orange-600" },
  { key: "刺客", label: "刺客", cls: "bg-red-100 text-red-600" },
  { key: "法师", label: "法师", cls: "bg-purple-100 text-purple-600" },
  { key: "射手", label: "射手", cls: "bg-blue-100 text-blue-600" },
  { key: "坦克", label: "坦克", cls: "bg-slate-200 text-slate-600" },
  { key: "辅助", label: "辅助", cls: "bg-green-100 text-green-600" },
  { key: "通用", label: "通用", cls: "bg-sage-100 text-sage-500" },
  { key: "小件", label: "小件", cls: "bg-amber-100 text-amber-600" },
] as const;

type CatKey = typeof CATEGORIES[number]["key"];

const catColors: Record<string, string> = Object.fromEntries(
  CATEGORIES.map(c => [c.key, c.cls])
);

export default function EquipmentAdminTab({ adminKey }: { adminKey: string }) {
  const h = { "Content-Type": "application/json", "X-Admin-Key": adminKey };

  const [equipment, setEquipment] = useState<EquipItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "active" | "inactive">("all");
  const [catFilter, setCatFilter] = useState<CatKey>("all");
  const [edit, setEdit] = useState<Partial<EquipItem> | null>(null);

  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState("");
  const [syncProgress, setSyncProgress] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/equipment", { headers: h });
      const data = await res.json();
      if (Array.isArray(data)) setEquipment(data);
    } catch {}
    setLoading(false);
  }, [adminKey]);

  useEffect(() => { load(); }, [load]);

  const handleSync = async () => {
    setSyncing(true); setSyncMsg(""); setSyncProgress("连接DataDragon中文版获取装备...");
    try {
      const res = await fetch("/api/admin/agent/sync-equipment", {
        method: "POST", headers: h,
        body: JSON.stringify({ dryRun: true }),
      });
      const preview = await res.json();
      if (!preview.success) { setSyncMsg(`预览失败: ${preview.error}`); setSyncing(false); return; }

      setSyncProgress(`预览完成：${preview.total}件装备，新增${preview.created}，更新${preview.updated}`);
      await new Promise(r => setTimeout(r, 300));

      setSyncProgress("正在写入数据库...");
      const exec = await fetch("/api/admin/agent/sync-equipment", {
        method: "POST", headers: h,
        body: JSON.stringify({ dryRun: false }),
      });
      const result = await exec.json();
      if (result.success) {
        setSyncMsg(`✅ 同步完成！共${result.total}件 | 新增${result.created} | 更新${result.updated}`);
        load();
      } else {
        setSyncMsg(`同步失败: ${result.error}`);
      }
    } catch (e: any) {
      setSyncMsg(`错误: ${e.message}`);
    }
    setSyncing(false);
  };

  const toggleActive = async (item: EquipItem) => {
    const next = !item.is_active;
    const prev = equipment;
    setEquipment(prev => prev.map(e => e.id === item.id ? { ...e, is_active: next } : e));
    try {
      const res = await fetch(`/api/admin/equipment/${item.id}`, {
        method: "PUT", headers: h,
        body: JSON.stringify({ is_active: next }),
      });
      if (!res.ok) setEquipment(prev);
    } catch { setEquipment(prev); }
  };

  const saveEdit = async () => {
    if (!edit?.id || saving) return;
    setSaving(true); setSaveMsg("");
    try {
      const res = await fetch(`/api/admin/equipment/${edit.id}`, {
        method: "PUT", headers: h,
        body: JSON.stringify({
          name: edit.name, description: edit.description,
          price: edit.price, is_active: edit.is_active, category: edit.category,
        }),
      });
      if (res.ok) {
        setEquipment(prev => prev.map(e => e.id === edit.id ? { ...e, ...edit } as EquipItem : e));
        setSaveMsg("已保存");
        setTimeout(() => { setEdit(null); setSaveMsg(""); }, 300);
      } else {
        const d = await res.json().catch(() => ({}));
        setSaveMsg(`保存失败: ${(d as any).error || res.status}`);
      }
    } catch (e: any) { setSaveMsg(`网络错误: ${e.message}`); }
    setSaving(false);
    setTimeout(() => setSaveMsg(""), 2000);
  };

  const deleteEquip = async (id: string) => {
    if (!confirm("确定删除该装备？")) return;
    const prev = equipment;
    setEquipment(prev => prev.filter(e => e.id !== id));
    try {
      const res = await fetch(`/api/admin/equipment/${id}`, { method: "DELETE", headers: h });
      if (!res.ok) setEquipment(prev);
    } catch { setEquipment(prev); }
  };

  const counts = useMemo(() => {
    const result: Record<string, number> = {};
    for (const c of CATEGORIES) result[c.key] = 0;
    for (const e of equipment) {
      const k = e.category || "通用";
      if (result[k] !== undefined) result[k]++;
      else result["通用"]++;
    }
    return result;
  }, [equipment]);

  const activeCount = equipment.filter(e => e.is_active).length;
  const inactiveCount = equipment.filter(e => !e.is_active).length;

  const filtered = equipment.filter(e => {
    if (activeFilter === "active" && !e.is_active) return false;
    if (activeFilter === "inactive" && e.is_active) return false;
    if (catFilter !== "all" && (e.category || "通用") !== catFilter) return false;
    if (search && !e.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[15px] font-semibold text-sage-700 dark:text-sage-100">
          🗡️ 装备管理
        </h2>
        <span className="text-[11px] text-sage-400">
          {equipment.length}件 | 启用{activeCount} | 禁用{inactiveCount}
        </span>
      </div>

      {/* 同步区域 */}
      <div className="bg-white/50 rounded-xl p-3 mb-3 border border-sage-200/50 dark:bg-white/5 dark:border-white/10">
        <div className="flex items-center gap-2">
          <button
            onClick={handleSync}
            disabled={syncing}
            className="text-[12px] px-4 py-2 rounded-lg bg-gold-300 text-gold-700 font-bold hover:bg-gold-400 disabled:opacity-40"
          >
            {syncing ? "同步中..." : "🔄 从DataDragon同步装备"}
          </button>
          <span className="text-[10px] text-sage-400">ddragon.leagueoflegends.com（中文版）</span>
          {inactiveCount > 0 && (
            <button
              onClick={async () => {
                if (!confirm(`确定删除全部 ${inactiveCount} 件已禁用装备？此操作不可撤销。`)) return;
                await fetch("/api/admin/equipment", { method: "DELETE", headers: h });
                load();
              }}
              className="text-[10px] px-2 py-1 rounded-full bg-rose-100 text-rose-500 font-medium hover:bg-rose-200 ml-auto"
            >
              🗑 删除已禁用({inactiveCount})
            </button>
          )}
        </div>
        {syncProgress && !syncMsg && (
          <div className="mt-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[14px] animate-spin">⚙️</span>
              <p className="text-[11px] text-sage-500">{syncProgress}</p>
            </div>
            <div className="w-full bg-sage-100 rounded-full h-2 overflow-hidden">
              <div className="bg-gold-400 h-full rounded-full w-2/3 animate-pulse" />
            </div>
          </div>
        )}
        {syncMsg && (
          <p className={`text-[11px] mt-1.5 font-medium ${syncMsg.includes("✅") ? "text-green-600" : "text-rose-500"}`}>
            {syncMsg}
          </p>
        )}
      </div>

      {/* 搜索 */}
      <div className="mb-2">
        <input
          placeholder="搜索装备名..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-3 py-1.5 rounded-lg border border-sage-200 text-[12px] focus:outline-none focus:border-gold-400 dark:bg-white/5 dark:border-white/10 dark:text-sage-200"
        />
      </div>

      {/* 分类筛选 */}
      <div className="flex flex-wrap gap-1 mb-2">
        {CATEGORIES.map(c => (
          <button key={c.key} onClick={() => setCatFilter(c.key)}
            className={`text-[11px] px-2.5 py-1 rounded-full font-medium transition-all ${
              catFilter === c.key ? c.cls + " shadow-sm" : "bg-white/40 text-sage-500 dark:bg-white/5 dark:text-sage-400"
            }`}>
            {c.label} ({counts[c.key] || 0})
          </button>
        ))}
      </div>

      {/* 启停筛选 */}
      <div className="flex gap-1 mb-3">
        {(["all","active","inactive"] as const).map(f => (
          <button key={f} onClick={() => setActiveFilter(f)}
            className={`text-[10px] px-2.5 py-1 rounded-full font-medium transition-all ${
              activeFilter === f
                ? f === "active" ? "bg-green-100 text-green-600" : f === "inactive" ? "bg-rose-100 text-rose-400" : "bg-sage-200 text-sage-600"
                : "bg-white/40 text-sage-500 dark:bg-white/5"
            }`}>
            {f === "all" ? "全部" : f === "active" ? "已启用" : "已禁用"}
          </button>
        ))}
      </div>

      {/* 装备列表 */}
      {loading ? (
        <div className="space-y-1">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="h-12 bg-white/30 rounded-lg animate-pulse dark:bg-white/5" />
          ))}
        </div>
      ) : (
        <div className="max-h-[60vh] overflow-y-auto space-y-1">
          {filtered.slice(0, 100).map(item => (
            <div key={item.id}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 transition-all ${
                item.is_active ? "bg-white/40 dark:bg-white/5" : "bg-rose-50/50 opacity-60 dark:bg-rose-500/5"
              }`}
            >
              {item.icon_url ? (
                <img src={item.icon_url} alt="" className="size-8 rounded object-contain bg-sage-100/50 flex-shrink-0" loading="lazy" />
              ) : (
                <div className="size-8 rounded bg-sage-100 flex items-center justify-center text-[10px] flex-shrink-0">?</div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-medium text-sage-700 truncate dark:text-sage-200">{item.name}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${catColors[item.category || "通用"] || catColors["通用"]}`}>
                    {item.category || "通用"}
                  </span>
                  {item.price > 0 && (
                    <span className="text-[10px] text-gold-500 flex-shrink-0">💰{item.price}</span>
                  )}
                </div>
                {item.description && (
                  <p className="text-[10px] text-sage-400 truncate dark:text-sage-500">{item.description}</p>
                )}
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button onClick={() => toggleActive(item)}
                  className={`text-[10px] px-2 py-1 rounded-full font-medium ${
                    item.is_active ? "bg-green-100 text-green-600" : "bg-sage-100 text-sage-400"
                  }`}
                >
                  {item.is_active ? "启用" : "禁用"}
                </button>
                <button onClick={() => setEdit(item)}
                  className="text-[10px] px-2 py-1 rounded-full bg-sage-100 text-sage-500 dark:bg-white/10 dark:text-sage-400">
                  编辑
                </button>
                <button onClick={() => deleteEquip(item.id)}
                  className="text-[10px] px-1.5 py-1 text-rose-400">
                  ×
                </button>
              </div>
            </div>
          ))}
          {filtered.length > 100 && (
            <p className="text-[11px] text-sage-400 text-center py-2">
              显示前100件（共{filtered.length}件），请使用搜索缩小范围
            </p>
          )}
          {filtered.length === 0 && (
            <p className="text-[13px] text-sage-400 text-center py-8">
              {equipment.length === 0 ? "暂无装备数据，请先点击同步" : "无匹配装备"}
            </p>
          )}
        </div>
      )}

      {/* 编辑弹窗 */}
      {edit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4" onClick={() => setEdit(null)}>
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl p-5" onClick={e => e.stopPropagation()}>
            <h3 className="text-[15px] font-semibold text-sage-700 mb-3">编辑装备</h3>
            <div className="space-y-3">
              <div>
                <label className="text-[11px] text-sage-500">名称</label>
                <input value={edit.name || ""} onChange={e => setEdit({ ...edit, name: e.target.value })}
                  className="w-full px-3 py-2 mt-0.5 rounded-lg border border-sage-200 text-[13px]" />
              </div>
              <div>
                <label className="text-[11px] text-sage-500">描述</label>
                <textarea value={edit.description || ""} onChange={e => setEdit({ ...edit, description: e.target.value })} rows={3}
                  className="w-full px-3 py-2 mt-0.5 rounded-lg border border-sage-200 text-[12px] resize-none" />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="text-[11px] text-sage-500">价格</label>
                  <input type="number" value={edit.price || 0}
                    onChange={e => setEdit({ ...edit, price: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 mt-0.5 rounded-lg border border-sage-200 text-[13px]" />
                </div>
                <div className="flex-1">
                  <label className="text-[11px] text-sage-500">分类</label>
                  <select value={edit.category || "通用"}
                    onChange={e => setEdit({ ...edit, category: e.target.value })}
                    className="w-full px-3 py-2 mt-0.5 rounded-lg border border-sage-200 text-[13px]">
                    {CATEGORIES.filter(c => c.key !== "all").map(c => (
                      <option key={c.key} value={c.key}>{c.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-[11px] text-sage-500">状态</label>
                <button
                  onClick={() => setEdit({ ...edit, is_active: !edit.is_active })}
                  className={`text-[11px] px-3 py-1 rounded-full font-medium ${
                    edit.is_active ? "bg-green-100 text-green-600" : "bg-rose-100 text-rose-400"
                  }`}
                >
                  {edit.is_active ? "已启用" : "已禁用"}
                </button>
              </div>
              {saveMsg && <p className={`text-[11px] mb-1 ${saveMsg.includes("失败") || saveMsg.includes("错误") ? "text-rose-500" : "text-green-500"}`}>{saveMsg}</p>}
              <button onClick={saveEdit} disabled={saving} className="w-full py-2 rounded-xl bg-gold-300 text-gold-700 font-bold text-[13px] disabled:opacity-40">
                {saving ? "保存中..." : "保存"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
