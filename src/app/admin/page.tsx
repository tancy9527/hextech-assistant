"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import RecsTab from "@/app/admin/components/RecsTab";
import { compressImage } from "@/lib/utils";

const TABS = [
  { key: "dashboard", label: "仪表盘", icon: "📊" },
  { key: "heroes", label: "英雄管理", icon: "🦸" },
  { key: "runes", label: "符文管理", icon: "⚡" },
  { key: "recommendations", label: "推荐配置", icon: "🔗" },
  { key: "fetters", label: "羁绊管理", icon: "🧩" },
];

function apiHeaders(adminKey: string) {
  return { "Content-Type": "application/json", "X-Admin-Key": adminKey };
}

// ============================================================
// Page
// ============================================================
export default function AdminPage() {
  const [tab, setTab] = useState("dashboard");
  const [adminKey, setAdminKey] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [authError, setAuthError] = useState("");

  // Auto-detect if auth is needed
  useEffect(() => {
    async function check() {
      const saved = sessionStorage.getItem("admin_key") || "";
      // Try a call with saved key or without
      try {
        const res = await fetch("/api/admin/heroes", {
          headers: { "Content-Type": "application/json", "X-Admin-Key": saved },
        });
        if (res.ok) {
          setAdminKey(saved);
          setAuthorized(true);
        } else if (res.status === 401) {
          // Auth required but no valid key
          sessionStorage.removeItem("admin_key");
          setAuthorized(false);
        }
      } catch {
        // Server might not be running yet
      }
      setChecking(false);
    }
    check();
  }, []);

  const handleLogin = async () => {
    if (!adminKey.trim()) return;
    setAuthError("");
    try {
      await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: adminKey.trim() }),
      });
      const res = await fetch("/api/admin/heroes", {
        headers: { "Content-Type": "application/json", "X-Admin-Key": adminKey.trim() },
      });
      if (res.ok) {
        sessionStorage.setItem("admin_key", adminKey.trim());
        setAuthorized(true);
      } else {
        setAuthError("密钥不正确，或服务器未配置 ADMIN_SECRET_KEY");
      }
    } catch {
      setAuthError("无法连接服务器");
    }
  };

  if (checking) {
    return (
      <main className="max-w-md mx-auto px-4 py-6">
        <div className="glass-card p-6 text-center">
          <p className="text-[14px] text-sage-500">验证中...</p>
        </div>
      </main>
    );
  }

  if (!authorized) {
    return (
      <main className="max-w-md mx-auto px-4 py-6">
        <div className="glass-card p-6 text-center">
          <h1 className="text-[20px] font-bold text-sage-700 mb-4">后台管理</h1>
          <p className="text-[13px] text-sage-500 mb-4">
            请输入管理员密钥
          </p>
          {authError && (
            <p className="text-[12px] text-rose-500 mb-3 bg-rose-50 py-1.5 px-3 rounded-lg">{authError}</p>
          )}
          <input
            type="password"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="如未配置 ADMIN_SECRET_KEY 可留空"
            className="w-full px-4 py-2 rounded-xl border border-sage-200 text-[14px] mb-3"
          />
          <button onClick={handleLogin} className="btn-primary w-full py-2 text-[14px]">
            进入后台
          </button>
          <p className="text-[11px] text-sage-400 mt-3">
            如未在 .env.local 中配置 ADMIN_SECRET_KEY，可直接进入
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-4 safe-bottom">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-[18px] font-bold text-sage-700">后台管理</h1>
        <a href="/" className="text-[13px] text-gold-500 font-medium">返回首页</a>
      </div>

      {/* Tab nav */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`text-[12px] px-3 py-1.5 rounded-lg font-medium transition-all ${
              tab === t.key
                ? "bg-gold-300 text-gold-700 shadow-sm"
                : "bg-white/40 text-sage-500"
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="glass-card p-4">
        {tab === "dashboard" && <DashboardTab adminKey={adminKey} />}
        {tab === "heroes" && <HeroesTab adminKey={adminKey} />}
        {tab === "runes" && <RunesTab adminKey={adminKey} />}
        {tab === "recommendations" && <RecsTab adminKey={adminKey} />}
        {tab === "fetters" && <FettersTab adminKey={adminKey} />}
      </div>
    </main>
  );
}

// ============================================================
// 1. 仪表盘
// ============================================================
function DashboardTab({ adminKey }: { adminKey: string }) {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const h = apiHeaders(adminKey);
      const [heroes, runes, playstyles, recs, fetters, cards] = await Promise.all([
        fetch("/api/admin/heroes", { headers: h }).then((r) => r.json()),
        fetch("/api/admin/runes", { headers: h }).then((r) => r.json()),
        fetch("/api/admin/playstyles", { headers: h }).then((r) => r.json()),
        fetch("/api/admin/recommendations", { headers: h }).then((r) => r.json()),
        fetch("/api/admin/fetters", { headers: h }).then((r) => r.json()),
        fetch("/api/admin/build-cards", { headers: h }).then((r) => r.json()),
      ]);
      setCounts({
        heroes: Array.isArray(heroes) ? heroes.length : 0,
        runes: Array.isArray(runes) ? runes.length : 0,
        activeRunes: Array.isArray(runes) ? runes.filter((r: any) => r.is_active !== false).length : 0,
        playstyles: Array.isArray(playstyles) ? playstyles.length : 0,
        recommendations: Array.isArray(recs) ? recs.length : 0,
        fetters: Array.isArray(fetters) ? fetters.length : 0,
        buildCards: Array.isArray(cards) ? cards.length : 0,
      });
      setLoading(false);
    }
    load();
  }, [adminKey]);

  if (loading) return <p className="text-[13px] text-sage-400">加载中...</p>;

  const items = [
    { label: "英雄", count: counts.heroes },
    { label: "符文", count: counts.activeRunes },
    { label: "玩法流派", count: counts.playstyles },
    { label: "推荐配置", count: counts.recommendations },
    { label: "羁绊", count: counts.fetters },
    { label: "图文推荐卡", count: counts.buildCards },
  ];

  return (
    <div>
      <h2 className="text-[15px] font-semibold text-sage-700 mb-3">数据概览</h2>
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <div key={item.label} className="bg-white/50 rounded-xl p-3 text-center">
            <p className="text-[24px] font-bold text-sage-700">{item.count}</p>
            <p className="text-[11px] text-sage-500">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// 2. 英雄管理
// ============================================================
function HeroesTab({ adminKey }: { adminKey: string }) {
  const [heroes, setHeroes] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [edit, setEdit] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const h = apiHeaders(adminKey);
    const res = await fetch("/api/admin/heroes" + (search ? `?q=${encodeURIComponent(search)}` : ""), { headers: h });
    const data = await res.json();
    if (Array.isArray(data)) setHeroes(data);
    setLoading(false);
  }, [adminKey, search]);

  useEffect(() => { load(); }, [load]);

  const save = async () => {
    if (!edit) return;
    const h = apiHeaders(adminKey);
    await fetch(`/api/admin/heroes/${edit.id}`, { method: "PUT", headers: h, body: JSON.stringify(edit) });
    setEdit(null);
    load();
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <input
          placeholder="搜索英雄..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-3 py-1.5 rounded-lg border border-sage-200 text-[13px]"
        />
      </div>
      <div className="max-h-96 overflow-y-auto space-y-1">
        {loading ? <p className="text-[13px] text-sage-400">加载中...</p> : null}
        {heroes.slice(0, 50).map((h: any) => (
          <div key={h.id} className="flex items-center justify-between bg-white/40 rounded-lg px-3 py-2">
            <div>
              <span className="text-[14px] font-medium text-sage-700">{h.name}</span>
              <span className="text-[11px] text-sage-400 ml-2">{h.title?.split("—")[0]?.trim()}</span>
              <span className={`text-[10px] ml-2 px-1.5 py-0.5 rounded-full ${
                h.attack_type === "AP" ? "bg-purple-200 text-purple-700" :
                h.attack_type === "AD" ? "bg-red-200 text-red-700" :
                h.attack_type === "Tank" ? "bg-blue-200 text-blue-700" :
                "bg-green-200 text-green-700"
              }`}>{h.attack_type}</span>
            </div>
            <button onClick={() => setEdit({ ...h })} className="text-[12px] text-gold-500 font-medium">编辑</button>
          </div>
        ))}
      </div>

      {edit && (
        <Modal title={`编辑英雄 - ${edit.name}`} onClose={() => setEdit(null)}>
          <div className="space-y-3">
            <Field label="名称" value={edit.name} onChange={(v) => setEdit({ ...edit, name: v })} />
            <Field label="称号" value={edit.title} onChange={(v) => setEdit({ ...edit, title: v })} />
            <Field label="角色" value={edit.role} onChange={(v) => setEdit({ ...edit, role: v })} />
            <Select label="攻击类型" value={edit.attack_type} options={[{label:"AP",value:"AP"},{label:"AD",value:"AD"},{label:"坦克",value:"Tank"},{label:"辅助",value:"Support"}]} onChange={(v) => setEdit({ ...edit, attack_type: v })} />
            <Field label="描述" value={edit.description} onChange={(v) => setEdit({ ...edit, description: v })} />
            <Field label="昵称" value={edit.nicknames || ""} onChange={(v) => setEdit({ ...edit, nicknames: v })} />
            <button onClick={save} className="btn-primary w-full py-2 text-[13px]">保存</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ============================================================
// 3. 符文管理
// ============================================================
function RunesTab({ adminKey }: { adminKey: string }) {
  const [runes, setRunes] = useState<any[]>([]);
  const [tier, setTier] = useState("all");
  const [active, setActive] = useState("true");
  const [runeSearch, setRuneSearch] = useState("");
  const [edit, setEdit] = useState<any | null>(null);
  const [addNew, setAddNew] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const h = apiHeaders(adminKey);
    const params = new URLSearchParams();
    if (tier !== "all") params.set("tier", tier);
    if (active !== "all") params.set("active", active);
    const res = await fetch(`/api/admin/runes?${params}`, { headers: h });
    const data = await res.json();
    if (Array.isArray(data)) {
      // Sort: chromatic first, then gold, then silver
      const order: Record<string, number> = { chromatic: 0, gold: 1, silver: 2 };
      data.sort((a: any, b: any) => (order[a.tier] ?? 3) - (order[b.tier] ?? 3));
      setRunes(data);
    }
    setLoading(false);
  }, [adminKey, tier, active]);

  useEffect(() => { load(); }, [load]);

  const save = async () => {
    if (!edit) return;
    const h = apiHeaders(adminKey);
    const url = edit.id ? `/api/admin/runes/${edit.id}` : "/api/admin/runes";
    const method = edit.id ? "PUT" : "POST";
    await fetch(url, { method, headers: h, body: JSON.stringify(edit) });
    setEdit(null);
    setAddNew(false);
    load();
  };

  const disable = async (id: string) => {
    const h = apiHeaders(adminKey);
    await fetch(`/api/admin/runes/${id}`, { method: "DELETE", headers: h });
    load();
  };

  const tierLabel = (t: string) => t === "chromatic" ? "彩色" : t === "gold" ? "金色" : "银色";

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-3 items-center">
        <div className="flex gap-1">
          {(["all","chromatic","gold","silver"] as const).map((t) => {
            const label = t === "all" ? "全部" : t === "chromatic" ? "彩色" : t === "gold" ? "金色" : "银色";
            const cls = t === "chromatic" ? "bg-gradient-to-r from-purple-400 via-pink-400 to-gold-300 text-white" :
              t === "gold" ? "bg-gold-300 text-gold-700" : "bg-slate-300 text-slate-700";
            return (
              <button key={t} onClick={() => setTier(t)}
                className={`text-[11px] px-2.5 py-1 rounded-full font-medium transition-all ${
                  tier === t ? (t === "all" ? "bg-sage-400 text-white" : cls + " shadow-sm") : "bg-white/40 text-sage-500"
                }`}>
                {label}
              </button>
            );
          })}
        </div>
        <div className="flex gap-1">
          {(["true","false"] as const).map((a) => (
            <button key={a} onClick={() => setActive(active === a ? "all" : a)}
              className={`text-[11px] px-2.5 py-1 rounded-full font-medium transition-all ${
                active === a ? (a === "true" ? "bg-green-100 text-green-600" : "bg-rose-100 text-rose-400")
                : "bg-white/40 text-sage-400"
              }`}>
              {a === "true" ? "已启用" : "已禁用"}
            </button>
          ))}
        </div>
        <input
          placeholder="搜索符文名..."
          value={runeSearch}
          onChange={(e) => setRuneSearch(e.target.value)}
          className="text-[11px] px-3 py-1.5 rounded-full border border-sage-200 bg-white/60 w-28 focus:outline-none focus:border-gold-400"
        />
        <button onClick={() => { setAddNew(true); setEdit({ name: "", description: "", quality: "silver", tier: "silver", effect_type: "utility", pros: "", cons: "", scenarios: "", special_label: "", is_active: true }); }} className="text-[12px] px-3 py-1 bg-gold-300 text-gold-700 rounded-lg font-medium ml-auto">
          + 新增
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto space-y-1">
        {loading ? <p className="text-[13px] text-sage-400">加载中...</p> : null}
        {runes.filter((r: any) => !runeSearch || r.name.includes(runeSearch)).map((r: any) => (
          <div key={r.id} className={`flex items-center justify-between rounded-lg px-3 py-2 ${r.is_active === false ? "bg-rose-50/50" : "bg-white/40"}`}>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                r.tier === "chromatic" ? "bg-gradient-to-r from-purple-400 via-pink-400 to-gold-300 text-white" :
                r.tier === "gold" ? "bg-gold-300 text-gold-700" : "bg-slate-300 text-slate-700"
              }`}>{tierLabel(r.tier)}</span>
              <span className={`text-[13px] font-medium ${r.is_active === false ? "text-sage-400 line-through" : "text-sage-700"}`}>{r.name}</span>
              {r.special_label && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-rose-200 text-rose-600">{r.special_label}</span>}
              {r.is_active === false && <span className="text-[10px] text-rose-400">已禁用</span>}
            </div>
            <div className="flex gap-1">
              <button onClick={() => setEdit({ ...r })} className="text-[11px] text-gold-500">编辑</button>
              <button onClick={() => disable(r.id)} className="text-[11px] text-rose-400">
                {r.is_active === false ? "启用" : "禁用"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {(edit || addNew) && (
        <Modal title={addNew ? "新增符文" : `编辑符文 - ${edit?.name}`} onClose={() => { setEdit(null); setAddNew(false); }}>
          <div className="space-y-3 max-h-[60vh] overflow-y-auto">
            <Field label="名称 *" value={edit?.name} onChange={(v) => setEdit({ ...edit, name: v })} />
            <Field label="描述" value={edit?.description} onChange={(v) => setEdit({ ...edit, description: v })} />
            <div className="flex gap-2">
              <Select label="品质" value={edit?.quality} options={[
                {label:"银色", value:"silver"}, {label:"金色", value:"gold"}, {label:"彩色(棱彩)", value:"prismatic"}
              ]} onChange={(v) => setEdit({ ...edit, quality: v })} />
              <Select label="等级" value={edit?.tier} options={[
                {label:"彩色", value:"chromatic"}, {label:"金色", value:"gold"}, {label:"银色", value:"silver"}
              ]} onChange={(v) => setEdit({ ...edit, tier: v })} />
            </div>
            <Select label="效果类型" value={edit?.effect_type} options={[
              {label:"伤害", value:"damage"}, {label:"防御", value:"defense"}, {label:"机动", value:"mobility"}, {label:"通用", value:"utility"}, {label:"续航", value:"sustain"}
            ]} onChange={(v) => setEdit({ ...edit, effect_type: v })} />
            <Field label="优点" value={edit?.pros || ""} onChange={(v) => setEdit({ ...edit, pros: v })} />
            <Field label="缺点" value={edit?.cons || ""} onChange={(v) => setEdit({ ...edit, cons: v })} />
            <Field label="场景" value={edit?.scenarios || ""} onChange={(v) => setEdit({ ...edit, scenarios: v })} />
            <Field label="特殊标注" value={edit?.special_label || ""} onChange={(v) => setEdit({ ...edit, special_label: v })} placeholder="如：你是主播！！！" />
            <div className="flex items-center gap-2">
              <label className="text-[11px] text-sage-500 font-medium">状态</label>
              <button
                onClick={() => setEdit({ ...edit, is_active: !(edit?.is_active !== false) })}
                className={`text-[12px] px-3 py-1 rounded-full font-medium ${
                  edit?.is_active !== false ? "bg-green-100 text-green-600" : "bg-rose-100 text-rose-400"
                }`}
              >
                {edit?.is_active !== false ? "已启用" : "已禁用"}
              </button>
            </div>
            <button onClick={save} className="btn-primary w-full py-2 text-[13px]">{addNew ? "创建" : "保存"}</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ============================================================
// 4. 玩法流派
// ============================================================
function FettersTab({ adminKey }: { adminKey: string }) {
  const [fetters, setFetters] = useState<any[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [fetterRunes, setFetterRunes] = useState<any[]>([]);
  const [allRunes, setAllRunes] = useState<any[]>([]);
  const [edit, setEdit] = useState<any | null>(null);
  const [addNew, setAddNew] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const h = apiHeaders(adminKey);
    const [fRes, rRes] = await Promise.all([
      fetch("/api/admin/fetters", { headers: h }).then((r) => r.json()),
      fetch("/api/admin/runes?active=true", { headers: h }).then((r) => r.json()),
    ]);
    if (Array.isArray(fRes)) setFetters(fRes);
    if (Array.isArray(rRes)) setAllRunes(rRes);
    setLoading(false);
  }, [adminKey]);

  useEffect(() => { load(); }, [load]);

  const expand = async (id: string) => {
    if (expanded === id) { setExpanded(null); return; }
    setExpanded(id);
    const res = await fetch(`/api/admin/fetters/${id}/runes`, { headers: apiHeaders(adminKey) });
    const data = await res.json();
    if (Array.isArray(data)) setFetterRunes(data);
  };

  const addRune = async (fetterId: string, runeId: string) => {
    await fetch(`/api/admin/fetters/${fetterId}/runes`, {
      method: "POST", headers: apiHeaders(adminKey),
      body: JSON.stringify({ rune_id: runeId }),
    });
    expand(fetterId);
    setTimeout(() => expand(fetterId), 50);
  };

  const removeRune = async (fetterId: string, runeId: string) => {
    await fetch(`/api/admin/fetters/${fetterId}/runes?runeId=${runeId}`, { method: "DELETE", headers: apiHeaders(adminKey) });
    expand(fetterId);
    setTimeout(() => expand(fetterId), 50);
  };

  const save = async () => {
    if (!edit) return;
    const h = apiHeaders(adminKey);
    const url = edit.id ? `/api/admin/fetters/${edit.id}` : "/api/admin/fetters";
    const method = edit.id ? "PUT" : "POST";
    await fetch(url, { method, headers: h, body: JSON.stringify(edit) });
    setEdit(null); setAddNew(false); load();
  };

  const del = async (id: string) => {
    await fetch(`/api/admin/fetters/${id}`, { method: "DELETE", headers: apiHeaders(adminKey) });
    load();
  };

  if (loading) return <p className="text-[13px] text-sage-400">加载中...</p>;

  return (
    <div>
      <button onClick={() => { setAddNew(true); setEdit({ name: "", description: "", effect_2: "", effect_3: "", effect_4: "" }); }} className="text-[12px] px-3 py-1 bg-gold-300 text-gold-700 rounded-lg font-medium mb-3">+ 新增羁绊</button>

      <div className="space-y-2">
        {fetters.map((f: any) => {
          const isExpanded = expanded === f.id;
          const runeNames = isExpanded ? fetterRunes.filter((rf: any) => rf.fetter_id === f.id) : [];
          return (
            <div key={f.id} className="bg-white/40 rounded-lg">
              <div className="flex items-center justify-between px-3 py-2 cursor-pointer" onClick={() => expand(f.id)}>
                <div>
                  <span className="text-[14px] font-medium text-sage-700">{f.name}</span>
                  <span className="text-[11px] text-sage-400 ml-2">{f.description}</span>
                </div>
                <div className="flex gap-1">
                  <button onClick={(e) => { e.stopPropagation(); setEdit({ ...f }); }} className="text-[11px] text-gold-500">编辑</button>
                  <button onClick={(e) => { e.stopPropagation(); del(f.id); }} className="text-[11px] text-rose-400">删除</button>
                </div>
              </div>

              {isExpanded && (
                <div className="px-3 pb-3 border-t border-white/50 pt-2">
                  {f.effect_2 && <p className="text-[11px] text-sage-500">(2) {f.effect_2}</p>}
                  {f.effect_3 && <p className="text-[11px] text-sage-500">(3) {f.effect_3}</p>}
                  {f.effect_4 && <p className="text-[11px] text-sage-500">(4) {f.effect_4}</p>}
                  <p className="text-[12px] font-medium text-sage-600 mt-2 mb-1">包含符文:</p>
                  {runeNames.map((rf: any) => (
                    <span key={rf.id} className="inline-flex items-center gap-1 text-[11px] bg-sage-100 text-sage-600 rounded-full px-2 py-0.5 mr-1 mb-1">
                      {rf.runes?.name || rf.rune_id}
                      <button onClick={() => removeRune(f.id, rf.rune_id)} className="text-rose-400 font-bold">×</button>
                    </span>
                  ))}
                  <div className="mt-2">
                    <select
                      onChange={(e) => { if (e.target.value) { addRune(f.id, e.target.value); e.target.value = ""; } }}
                      className="text-[11px] px-2 py-1 rounded-lg border border-sage-200"
                    >
                      <option value="">+ 添加符文</option>
                      {allRunes.filter((r: any) => !runeNames.some((rf: any) => rf.rune_id === r.id)).map((r: any) => (
                        <option key={r.id} value={r.id}>{r.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {(edit || addNew) && (
        <Modal title={addNew ? "新增羁绊" : `编辑羁绊 - ${edit?.name}`} onClose={() => { setEdit(null); setAddNew(false); }}>
          <div className="space-y-3">
            <Field label="名称" value={edit?.name} onChange={(v) => setEdit({ ...edit, name: v })} />
            <Field label="描述" value={edit?.description} onChange={(v) => setEdit({ ...edit, description: v })} />
            <Field label="2件套效果" value={edit?.effect_2 || ""} onChange={(v) => setEdit({ ...edit, effect_2: v })} />
            <Field label="3件套效果" value={edit?.effect_3 || ""} onChange={(v) => setEdit({ ...edit, effect_3: v })} />
            <Field label="4件套效果" value={edit?.effect_4 || ""} onChange={(v) => setEdit({ ...edit, effect_4: v })} />
            <button onClick={save} className="btn-primary w-full py-2 text-[13px]">{addNew ? "创建" : "保存"}</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ============================================================
// 7. 图文推荐卡
// ============================================================
function BuildCardsTab({ adminKey }: { adminKey: string }) {
  const [cards, setCards] = useState<any[]>([]);
  const [heroes, setHeroes] = useState<any[]>([]);
  const [missingHeroes, setMissingHeroes] = useState<any[]>([]);
  const [showMissing, setShowMissing] = useState(false);
  const [selectedHero, setSelectedHero] = useState("");
  const [heroSearch, setHeroSearch] = useState("");
  const [playstyles, setPlaystyles] = useState<any[]>([]);
  const [selectedPlaystyle, setSelectedPlaystyle] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const h = apiHeaders(adminKey);
    const [cRes, hRes, mRes] = await Promise.all([
      fetch("/api/admin/build-cards", { headers: h }).then((r) => r.json()),
      fetch("/api/admin/heroes", { headers: h }).then((r) => r.json()),
      fetch("/api/admin/build-cards?missingOnly=true", { headers: h }).then((r) => r.json()),
    ]);
    if (Array.isArray(cRes)) setCards(cRes);
    if (Array.isArray(hRes)) setHeroes(hRes);
    if (Array.isArray(mRes)) setMissingHeroes(mRes);
    setLoading(false);
  }, [adminKey]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (selectedHero) {
      fetch(`/api/admin/playstyles?heroId=${selectedHero}`, { headers: apiHeaders(adminKey) })
        .then((r) => r.json()).then((d) => { if (Array.isArray(d)) setPlaystyles(d); });
    } else { setPlaystyles([]); }
  }, [adminKey, selectedHero]);

  const save = async () => {
    if (!selectedHero || !imageUrl.trim()) return;
    setSaving(true);
    const body: any = { hero_id: selectedHero, image_url: imageUrl.trim(), title, description: desc };
    if (selectedPlaystyle) body.playstyle_id = selectedPlaystyle;
    await fetch("/api/admin/build-cards", { method: "POST", headers: apiHeaders(adminKey), body: JSON.stringify(body) });
    setSaving(false);
    setSelectedHero(""); setSelectedPlaystyle(""); setTitle(""); setDesc(""); setImageUrl("");
    load();
  };

  const del = async (id: string) => {
    await fetch(`/api/admin/build-cards/${id}`, { method: "DELETE", headers: apiHeaders(adminKey) });
    load();
  };

  const heroName = (id: string) => heroes.find((h: any) => h.id === id)?.name || id;

  if (loading) return <p className="text-[13px] text-sage-400">加载中...</p>;

  return (
    <div>
      {/* 新增卡片 */}
      <div className="bg-white/50 rounded-xl p-3 mb-3 space-y-2">
        <h3 className="text-[13px] font-semibold text-sage-700">新增/更新图文推荐卡</h3>
        <input
          placeholder="搜索英雄..."
          value={heroSearch}
          onChange={(e) => { setHeroSearch(e.target.value); setSelectedHero(""); setSelectedPlaystyle(""); }}
          className="w-full px-3 py-2 rounded-lg border border-sage-200 text-[13px]"
        />
        {heroSearch && (
          <div className="max-h-32 overflow-y-auto bg-white rounded-lg border border-sage-200">
            {heroes.filter((h: any) => h.name.includes(heroSearch)).slice(0, 10).map((h: any) => (
              <button key={h.id} onClick={() => { setSelectedHero(h.id); setHeroSearch(h.name); setSelectedPlaystyle(""); }}
                className="w-full text-left px-3 py-1.5 text-[12px] hover:bg-sage-50 text-sage-700">
                {h.name} <span className="text-sage-400">({h.attack_type})</span>
              </button>
            ))}
          </div>
        )}
        <select
          value={selectedPlaystyle}
          onChange={(e) => setSelectedPlaystyle(e.target.value)}
          disabled={!selectedHero}
          className="w-full px-3 py-2 rounded-lg border border-sage-200 text-[13px] disabled:opacity-40"
        >
          <option value="">{selectedHero ? "选择流派 (可选)" : "请先选择英雄"}</option>
          {playstyles.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <input placeholder="标题 (可选)" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-sage-200 text-[13px]" />
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <label className="text-[11px] text-sage-500 font-medium">图片URL</label>
            <input placeholder="https://..." value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-sage-200 text-[13px]" />
          </div>
          <span className="text-[11px] text-sage-400 pb-2">或</span>
          <div>
            <label className="text-[11px] text-sage-500 font-medium">上传文件</label>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                setUploading(true);
                setUploadMsg("");
                const compressed = await compressImage(f);
                const fd = new FormData();
                fd.append("file", compressed);
                try {
                  const res = await fetch("/api/admin/upload", {
                    method: "POST",
                    headers: { "X-Admin-Key": adminKey },
                    body: fd,
                  });
                  const d = await res.json();
                  if (res.ok) {
                    setImageUrl(d.url);
                    setUploadMsg("上传成功 ✅");
                  } else {
                    setUploadMsg(`失败: ${d.error}`);
                  }
                } catch {
                  setUploadMsg("上传失败");
                }
                setUploading(false);
              }}
              className="text-[11px] text-sage-600 file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-[11px] file:bg-sage-200 file:text-sage-700"
            />
            {uploadMsg && <p className={`text-[10px] mt-0.5 ${uploadMsg.includes("成功") ? "text-green-500" : "text-rose-500"}`}>{uploadMsg}</p>}
            {uploading && <p className="text-[10px] text-sage-400 mt-0.5">上传中...</p>}
          </div>
        </div>
        <input placeholder="描述 (可选)" value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-sage-200 text-[13px]" />
        <button onClick={save} disabled={saving || !selectedHero || !imageUrl.trim()} className="btn-primary w-full py-2 text-[13px]">
          {saving ? "保存中..." : "保存图文卡"}
        </button>
      </div>

      {/* 筛选未添加的英雄 */}
      <div className="mb-3">
        <button
          onClick={() => setShowMissing(!showMissing)}
          className={`text-[12px] px-3 py-1.5 rounded-lg font-medium ${
            showMissing ? "bg-rose-200 text-rose-600" : "bg-white/50 text-sage-500"
          }`}
        >
          未添加图文推荐的英雄 ({missingHeroes.length})
        </button>
        {showMissing && (
          <div className="mt-2 bg-white/40 rounded-lg p-3 max-h-40 overflow-y-auto">
            {missingHeroes.length === 0 ? (
              <p className="text-[13px] text-sage-400">所有英雄都已添加图文推荐 👍</p>
            ) : (
              <div className="flex flex-wrap gap-1">
                {missingHeroes.map((h: any) => (
                  <button
                    key={h.id}
                    onClick={() => { setSelectedHero(h.id); setShowMissing(false); }}
                    className={`text-[11px] px-2 py-1 rounded-full ${
                      h.attack_type === "AP" ? "bg-purple-100 text-purple-600" :
                      h.attack_type === "AD" ? "bg-red-100 text-red-600" :
                      h.attack_type === "Tank" ? "bg-blue-100 text-blue-600" :
                      "bg-green-100 text-green-600"
                    }`}
                  >
                    {h.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 已有列表搜索 */}
      <input
        placeholder="搜索已有图文卡..."
        onChange={(e) => {/* client-side filter below */}}
        className="w-full px-3 py-2 rounded-lg border border-sage-200 text-[13px] mb-2"
        onInput={(e) => {
          const val = (e.target as HTMLInputElement).value;
          const items = document.querySelectorAll('.buildcard-item');
          items.forEach((item: any) => {
            item.style.display = !val || item.textContent.includes(val) ? '' : 'none';
          });
        }}
      />
      <div className="space-y-1 max-h-80 overflow-y-auto">
        {cards.map((c: any) => (
          <div key={c.id} className="buildcard-item flex items-center justify-between bg-white/40 rounded-lg px-3 py-2">
            <div className="flex items-center gap-2">
              {c.image_url && <img src={c.image_url} alt="" className="w-8 h-8 rounded object-cover" />}
              <div>
                <span className="text-[13px] font-medium text-sage-700">{c.heroes?.name || heroName(c.hero_id)}</span>
                {c.hero_playstyles?.name && <span className="text-[11px] text-sage-400 ml-1">{c.hero_playstyles.name}</span>}
              </div>
            </div>
            <button onClick={() => del(c.id)} className="text-[11px] text-rose-400">删除</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// 8. OCR 录入 (保留原有功能)
// ============================================================
function OCRTab() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [parsing, setParsing] = useState(false);
  const [parsed, setParsed] = useState<any>(null);
  const [error, setError] = useState("");
  const [inserting, setInserting] = useState(false);
  const [insertResult, setInsertResult] = useState<any[] | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f); setError(""); setParsed(null); setInsertResult(null);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(f);
  }, []);

  const handleParse = useCallback(async () => {
    if (!file) return;
    setParsing(true); setError("");
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch("/api/vision/parse", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "解析失败"); setParsed(null); }
      else setParsed(data);
    } catch (e: any) { setError(`请求失败: ${e.message}`); }
    finally { setParsing(false); }
  }, [file]);

  const handleInsert = useCallback(async () => {
    if (!parsed) return;
    setInserting(true); setError("");
    try {
      const res = await fetch("/api/runes/batch-insert", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed) });
      const data = await res.json();
      if (!res.ok) setError(data.error || "写入失败");
      else setInsertResult(data.results);
    } catch (e: any) { setError(`写入失败: ${e.message}`); }
    finally { setInserting(false); }
  }, [parsed]);

  const handleReset = () => {
    setFile(null); setPreview(""); setParsed(null); setError(""); setInsertResult(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div>
      <h2 className="text-[15px] font-semibold text-sage-700 mb-3">OCR 截图识别</h2>
      <p className="text-[12px] text-sage-500 mb-3">上传攻略截图，自动识别英雄和符文信息</p>

      <div className="mb-3">
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="w-full text-[13px] text-sage-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-[13px] file:font-medium file:bg-sage-200 file:text-sage-700" />
        {preview && <img src={preview} alt="Preview" className="w-full rounded-xl max-h-48 object-contain bg-cream-100 mt-2" />}
        {file && (
          <div className="flex gap-2 mt-2">
            <button onClick={handleParse} disabled={parsing} className="flex-1 btn-primary text-[13px] py-2">{parsing ? "识别中..." : "开始识别"}</button>
            <button onClick={handleReset} className="text-[13px] px-4 py-2 rounded-xl bg-white/40 text-sage-500 font-medium">重置</button>
          </div>
        )}
      </div>

      {error && <div className="bg-rose-50 rounded-lg p-3 mb-3"><p className="text-[13px] text-rose-500">{error}</p></div>}

      {parsed && (
        <div className="bg-white/40 rounded-xl p-3 mb-3">
          <h3 className="text-[14px] font-semibold text-sage-700 mb-2">识别结果</h3>
          <p className="text-[13px] mb-2"><span className="text-sage-500">英雄: </span><span className="font-semibold text-sage-700">{parsed.hero || "未识别"}</span></p>
          <div className="space-y-1 mb-3">
            {parsed.runes?.map((r: any, i: number) => (
              <div key={i} className="flex items-center gap-2 bg-white/40 rounded-lg px-3 py-2">
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                  r.tier === "chromatic" ? "bg-gradient-to-r from-purple-400 via-pink-400 to-gold-300 text-white" :
                  r.tier === "gold" ? "bg-gold-300 text-gold-700" : "bg-slate-300 text-slate-700"
                }`}>{r.tier === "chromatic" ? "彩色" : r.tier === "gold" ? "金色" : "银色"}</span>
                <span className="text-[13px] text-sage-700 font-medium">{r.name}</span>
                {r.reason && <span className="text-[11px] text-sage-400 ml-auto">{r.reason}</span>}
              </div>
            ))}
          </div>
          <button onClick={handleInsert} disabled={inserting || !parsed.hero || !parsed.runes?.length} className="btn-primary w-full py-2 text-[13px]">{inserting ? "写入中..." : "确认并写入数据库"}</button>
        </div>
      )}

      {insertResult && (
        <div className="bg-white/40 rounded-xl p-3">
          <h3 className="text-[14px] font-semibold text-sage-700 mb-2">写入结果</h3>
          {insertResult.map((r: any, i: number) => (
            <div key={i} className="flex items-center justify-between text-[13px] py-1">
              <span className="text-sage-700">{r.name}</span>
              <span className={r.status === "inserted" ? "text-green-500" : r.status === "skipped" ? "text-gold-500" : "text-rose-500"}>
                {r.status === "inserted" ? "已添加" : r.status === "skipped" ? "已跳过（重复）" : r.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// Shared components
// ============================================================
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-t-2xl sm:rounded-2xl p-5 w-full max-w-md max-h-[85vh] overflow-y-auto shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[15px] font-semibold text-sage-700">{title}</h3>
          <button onClick={onClose} className="text-[20px] text-sage-400">&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="text-[11px] text-sage-500 font-medium">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 mt-0.5 rounded-lg border border-sage-200 text-[13px]"
      />
    </div>
  );
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: {label: string, value: string}[]; onChange: (v: string) => void }) {
  return (
    <div className="flex-1">
      <label className="text-[11px] text-sage-500 font-medium">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-3 py-2 mt-0.5 rounded-lg border border-sage-200 text-[13px]">
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}
