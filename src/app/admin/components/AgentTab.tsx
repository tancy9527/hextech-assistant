"use client";

import { useState, useEffect } from "react";

function apiHeaders(adminKey: string) {
  return { "Content-Type": "application/json", "X-Admin-Key": adminKey };
}

export default function AgentTab({ adminKey }: { adminKey: string }) {
  const h = apiHeaders(adminKey);

  // 双源版本信息
  const [sourcesInfo, setSourcesInfo] = useState<any>(null);

  // 符文池同步 - 双源
  const [runeMsg, setRuneMsg] = useState("");
  const [communityResult, setCommunityResult] = useState<any>(null);
  const [dataStationResult, setDataStationResult] = useState<any>(null);
  const [activeRuneSource, setActiveRuneSource] = useState<"community" | "data_station">("community");
  const [commLoading, setCommLoading] = useState(false);
  const [dsLoading, setDsLoading] = useState(false);
  const [runeChecks, setRuneChecks] = useState<Set<string>>(new Set());
  const [forceUpdateDesc, setForceUpdateDesc] = useState(false);
  const [runeCollapsed, setRuneCollapsed] = useState(false);

  // 英雄胜率
  const [statsMsg, setStatsMsg] = useState("");
  const [statsLoading, setStatsLoading] = useState(false);
  const [statsResult, setStatsResult] = useState<any>(null);
  const [statsChecks, setStatsChecks] = useState<Set<string>>(new Set());
  const [statsCollapsed, setStatsCollapsed] = useState(false);

  // 英雄-符文匹配
  const [recMsg, setRecMsg] = useState("");
  const [recLoading, setRecLoading] = useState(false);
  const [recResult, setRecResult] = useState<any>(null);
  const [recMode, setRecMode] = useState<"incremental" | "fullRefresh">("incremental");
  const [recChecks, setRecChecks] = useState<Set<string>>(new Set());
  const [recCollapsed, setRecCollapsed] = useState(false);
  const [recFilter, setRecFilter] = useState<"all" | "add" | "update" | "skip_manual" | "skip_exists">("all");

  // AI比对结果
  const [aiCompareResult, setAiCompareResult] = useState<any>(null);
  const [aiCompareLoading, setAiCompareLoading] = useState(false);

  // 弹窗
  const [confirmModal, setConfirmModal] = useState<any>(null);
  const [progress, setProgress] = useState<{ current: number; total: number; label: string } | null>(null);
  const [aiCompare, setAiCompare] = useState<any>(null);
  const [localRuneCount, setLocalRuneCount] = useState(0);
  const [hasDeepSeek, setHasDeepSeek] = useState(false);

  // 装备池同步
  const [equipMsg, setEquipMsg] = useState("");
  const [equipLoading, setEquipLoading] = useState(false);
  const [equipResult, setEquipResult] = useState<any>(null);
  const [equipChecks, setEquipChecks] = useState<Set<string>>(new Set());
  const [equipCollapsed, setEquipCollapsed] = useState(false);

  // 装备推荐同步
  const [equipRecMsg, setEquipRecMsg] = useState("");
  const [equipRecLoading, setEquipRecLoading] = useState(false);
  const [equipRecResult, setEquipRecResult] = useState<any>(null);
  const [equipRecChecks, setEquipRecChecks] = useState<Set<string>>(new Set());
  const [equipRecCollapsed, setEquipRecCollapsed] = useState(false);

  useEffect(() => {
    fetch("/api/admin/agent/status").then(r => r.json()).then(d => setHasDeepSeek(!!d.deepseek)).catch(() => {});
    fetch("/api/admin/agent/sources").then(r => r.json()).then(d => setSourcesInfo(d)).catch(() => {});
    fetch("/api/admin/runes?active=true", { headers: h }).then(r => r.json()).then(d => { if (Array.isArray(d)) setLocalRuneCount(d.length); }).catch(() => {});
  }, []);

  // ====== 符文池同步 ======
  const handleRunePreview = async () => {
    setCommLoading(true); setDsLoading(true);
    setCommunityResult(null); setDataStationResult(null);
    setRuneCollapsed(false);
    setRuneMsg("加载双源数据...");
    try {
      const [comRes, dsRes] = await Promise.all([
        fetch("/api/admin/agent/compare-runes?source=community&page=1&size=200", { headers: h }),
        fetch("/api/admin/agent/compare-runes?source=data_station&page=1&size=200", { headers: h }),
      ]);
      const comData = await comRes.json();
      const dsData = await dsRes.json();
      if (comData.success) { setCommunityResult(comData); setActiveRuneSource("community"); }
      if (dsData.success) setDataStationResult(dsData);
      setRuneMsg("预览完成");
      setRuneChecks(new Set());
    } catch (e: any) { setRuneMsg(e.message); }
    setCommLoading(false); setDsLoading(false);
  };

  const handleRuneExecute = async () => {
    const source = activeRuneSource === "community" ? "community" : "data_station";
    const srcLabel = source === "community" ? "社区" : "数据站";
    if (runeChecks.size === 0) { setRuneMsg("请先预览并勾选要更新的符文"); return; }
    const ids = Array.from(runeChecks);
    setRuneMsg(`正在更新(${srcLabel})...`);
    try {
      const res = await fetch("/api/admin/agent/compare-runes", { method: "POST", headers: h, body: JSON.stringify({ source, forceUpdateDesc, runeNames: ids }) });
      const data = await res.json();
      setRuneMsg(`✅ [${srcLabel}] 更新完成！新增${data.created||0} 更新${data.updated||0} 停用${data.deactivated||0}`);
      setRuneChecks(new Set());
      handleRunePreview();
    } catch (e: any) { setRuneMsg(e.message); }
  };

  const toggleRuneCheck = (name: string) => {
    const next = new Set(runeChecks);
    next.has(name) ? next.delete(name) : next.add(name);
    setRuneChecks(next);
  };

  // ====== 英雄胜率 ======
  const handleStatsPreview = async () => {
    setStatsLoading(true); setStatsCollapsed(false); setStatsMsg("加载中...");
    try {
      const res = await fetch("/api/admin/agent/sync-hero-stats", { method: "POST", headers: h, body: JSON.stringify({ dryRun: true }) });
      const data = await res.json();
      setStatsResult(data);
      if (data.result?.changes) setStatsChecks(new Set(data.result.changes.map((c: any) => c.heroName)));
      setStatsMsg(data.success ? "预览完成" : "预览失败");
    } catch (e: any) { setStatsMsg(e.message); }
    setStatsLoading(false);
  };

  const handleStatsExecute = async () => {
    const heroNames = Array.from(statsChecks);
    if (heroNames.length === 0) { setStatsMsg("请先预览并勾选要更新的英雄"); return; }
    setProgress({ current: 0, total: heroNames.length, label: `正在更新英雄胜率... 0/${heroNames.length}` });
    let done = 0;
    for (let i = 0; i < heroNames.length; i += 20) {
      const batch = heroNames.slice(i, i + 20);
      const res = await fetch("/api/admin/agent/sync-hero-stats", { method: "POST", headers: h, body: JSON.stringify({ dryRun: false, heroNames: batch }) });
      const data = await res.json();
      done += Math.min(batch.length, heroNames.length - i);
      setProgress({ current: done, total: heroNames.length, label: `正在更新英雄胜率... ${done}/${heroNames.length}` });
    }
    setProgress(null);
    setStatsMsg(`✅ 胜率同步完成！共更新 ${done} 个英雄。数据来源：hexdata.com.cn P16.11`);
    setStatsChecks(new Set());
    setTimeout(() => handleStatsPreview(), 500);
    handleStatsPreview();
  };

  const toggleStatsCheck = (name: string) => {
    const next = new Set(statsChecks);
    next.has(name) ? next.delete(name) : next.add(name);
    setStatsChecks(next);
  };

  // ====== 英雄-符文匹配 ======
  const handleRecPreview = async () => {
    setRecLoading(true); setRecCollapsed(false); setRecMsg("连接arammayhem.com获取组合数据...");
    try {
      const res = await fetch("/api/admin/agent/generate-recs", { method: "POST", headers: h, body: JSON.stringify({ mode: recMode, dryRun: true }) });
      const data = await res.json();
      setRecResult(data);
      if (data.success && data.preview) {
        const toCheck = (data.preview.details || []).filter((d: any) => d.action === "add" || d.action === "update").map((d: any) => `${d.heroName}:${d.runeName}`);
        setRecChecks(new Set(toCheck));
      }
      setRecMsg(data.success ? "预览完成" : data.error || "预览失败");
    } catch (e: any) { setRecMsg(e.message); }
    setRecLoading(false);
  };

  const handleRecExecute = async () => {
    if (recChecks.size === 0) { setRecMsg("请先预览并勾选要更新的组合"); return; }
    const names = Array.from(recChecks).map(k => k.split(":")[0]).filter((v, i, a) => a.indexOf(v) === i);
    setProgress({ current: 0, total: names.length, label: `同步推荐... 0/${names.length}英雄` });
    let entries = 0;
    for (let i = 0; i < names.length; i += 20) {
      const batch = names.slice(i, i + 20);
      const res = await fetch("/api/admin/agent/generate-recs", { method: "POST", headers: h, body: JSON.stringify({ mode: recMode, heroNames: batch }) });
      const data = await res.json();
      entries += data.stats?.entriesGenerated || 0;
      setProgress({ current: Math.min(i + 20, names.length), total: names.length, label: `同步推荐... ${Math.min(i + 20, names.length)}/${names.length}英雄` });
    }
    setProgress(null);
    setRecMsg(`更新完成！${names.length}个英雄，生成${entries}条推荐`);
    handleRecPreview();
  };

  const toggleRecCheck = (key: string) => {
    const next = new Set(recChecks);
    next.has(key) ? next.delete(key) : next.add(key);
    setRecChecks(next);
  };

  // ====== 装备池同步 ======
  const handleEquipPreview = async () => {
    setEquipLoading(true); setEquipCollapsed(false); setEquipMsg("连接DataDragon中文版获取装备...");
    setEquipResult(null);
    try {
      const res = await fetch("/api/admin/agent/sync-equipment", { method: "POST", headers: h, body: JSON.stringify({ dryRun: true }) });
      const data = await res.json();
      if (data.success) {
        setEquipResult(data);
        setEquipChecks(new Set(data.diffs?.map((d: any) => d.game_id) || []));
        setEquipMsg("预览完成");
      } else {
        setEquipMsg(data.error || "预览失败");
      }
    } catch (e: any) { setEquipMsg(e.message); }
    setEquipLoading(false);
  };

  const handleEquipExecute = async () => {
    if (equipChecks.size === 0) { setEquipMsg("请先预览并勾选要更新的装备"); return; }
    const ids = Array.from(equipChecks);
    setEquipLoading(true); setEquipMsg("正在同步装备到数据库...");
    try {
      const res = await fetch("/api/admin/agent/sync-equipment", { method: "POST", headers: h, body: JSON.stringify({ dryRun: false, equipIds: ids }) });
      const data = await res.json();
      setEquipMsg(data.success ? `装备同步完成！新增${data.created} 更新${data.updated} 停用${data.deactivated||0}` : "失败");
      setEquipChecks(new Set());
      handleEquipPreview();
    } catch (e: any) { setEquipMsg(e.message); }
    setEquipLoading(false);
  };

  const toggleEquipCheck = (gameId: string) => {
    const next = new Set(equipChecks);
    next.has(gameId) ? next.delete(gameId) : next.add(gameId);
    setEquipChecks(next);
  };

  // ====== 装备推荐同步 ======
  const handleEquipRecPreview = async () => {
    setEquipRecLoading(true); setEquipRecCollapsed(false); setEquipRecMsg("连接hexdata获取装备推荐...");
    setEquipRecResult(null);
    try {
      const res = await fetch("/api/admin/agent/sync-equipment-recs", { method: "POST", headers: h, body: JSON.stringify({ dryRun: true }) });
      const data = await res.json();
      if (data.success) {
        setEquipRecResult(data);
        setEquipRecChecks(new Set(data.diffs?.map((d: any) => d.hero_id) || []));
        setEquipRecMsg("预览完成");
      } else {
        setEquipRecMsg(data.error || "预览失败");
      }
    } catch (e: any) { setEquipRecMsg(e.message); }
    setEquipRecLoading(false);
  };

  const handleEquipRecExecute = async () => {
    if (equipRecChecks.size === 0) { setEquipRecMsg("请先预览并勾选要更新的英雄"); return; }
    const ids = Array.from(equipRecChecks);
    setEquipRecLoading(true); setEquipRecResult(null); setEquipRecMsg("正在同步装备推荐...");
    try {
      const res = await fetch("/api/admin/agent/sync-equipment-recs", { method: "POST", headers: h, body: JSON.stringify({ dryRun: false, heroIds: ids }) });
      const data = await res.json();
      setEquipRecMsg(data.success ? `✅ 装备推荐同步完成！共 ${data.synced} 个英雄` : `失败: ${data.error}`);
      setEquipRecChecks(new Set());
    } catch (e: any) { setEquipRecMsg(e.message); }
    setEquipRecLoading(false);
  };

  const toggleEquipRecCheck = (heroId: string) => {
    const next = new Set(equipRecChecks);
    next.has(heroId) ? next.delete(heroId) : next.add(heroId);
    setEquipRecChecks(next);
  };

  const currentRuneSrc = activeRuneSource === "community" ? communityResult : dataStationResult;

  return (
    <div className="space-y-3">
      {/* 顶部状态栏 */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-xl p-3 text-white shadow-lg">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span className="text-[18px]">🤖</span>
            <div>
              <h2 className="text-[14px] font-bold">海克斯智能体</h2>
              <p className="text-[10px] text-slate-400">HEXTECH ASSISTANT AGENT v1.0</p>
            </div>
          </div>
          <div className="flex flex-col gap-0.5 text-[10px]">
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
              <span className="text-green-400">arammayhem.com</span>
              <span className="text-slate-500">{sourcesInfo?.community?.patch ? `P${sourcesInfo.community.patch}` : (communityResult?.remoteCount ? `P26.11` : "")}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-blue-400 animate-pulse inline-block" />
              <span className="text-blue-400">hexdata.com.cn</span>
              <span className="text-slate-500">{sourcesInfo?.data_station?.patch ? `P${sourcesInfo.data_station.patch}` : (dataStationResult?.remoteCount ? "P16.11" : "")}</span>
              <span className="text-slate-500">{dataStationResult?.remoteCount ? `P16.11` : ""}</span>
            </span>
          </div>
        </div>
      </div>

      {/* ======== 卡片1：符文池同步 ======== */}
      <div className="bg-white/60 rounded-xl border border-sage-200/50 overflow-hidden">
        <div className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="size-7 rounded-lg bg-gold-100 flex items-center justify-center text-sm">⚡</span>
            <h3 className="text-[13px] font-bold text-sage-700">符文池同步</h3>
            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-green-100 text-green-600">{localRuneCount}符文</span>
          </div>
          <p className="text-[10px] text-sage-500 mb-2">双源对比：🌐社区(arammayhem) + 📊数据站(hexdata)。分别与数据库比对，切换Tab查看各来源结果。</p>
          <div className="flex gap-2 flex-wrap">
            <button onClick={handleRunePreview} disabled={commLoading || dsLoading}
              className="text-[11px] px-4 py-2 rounded-lg bg-white/80 text-sage-600 font-medium hover:bg-white border border-sage-200/50 disabled:opacity-40">
              {commLoading || dsLoading ? "加载中..." : "🔍 预览变更"}
            </button>
            <button onClick={handleRuneExecute} disabled={runeChecks.size === 0}
              className="text-[11px] px-4 py-2 rounded-lg bg-gold-300 text-gold-700 font-bold hover:bg-gold-400 disabled:opacity-40">
              确认更新 ({runeChecks.size})
            </button>
            <label className="flex items-center gap-1 text-[10px] text-sage-500 cursor-pointer">
              <input type="checkbox" checked={forceUpdateDesc} onChange={e => setForceUpdateDesc(e.target.checked)} className="size-3 rounded" />
              同时更新描述
            </label>
            <button onClick={async () => {
              if (!confirm("将用社区(arammayhem)图标覆盖所有已匹配符文，不改动名称和描述。确定？")) return;
              setRuneMsg("正在更新社区图标...");
              try {
                const res = await fetch("/api/admin/agent/compare-runes", { method: "POST", headers: h, body: JSON.stringify({ source: "community", iconOnly: true }) });
                const data = await res.json();
                setRuneMsg(data.success ? `✅ 社区图标更新完成！${data.updated}个符文` : `失败: ${data.error}`);
              } catch (e: any) { setRuneMsg(e.message); }
            }} className="text-[10px] px-2 py-1 rounded-full bg-purple-100 text-purple-600 font-medium hover:bg-purple-200">🖼 社区图标</button>
            <button onClick={async () => {
              if (!confirm("将用数据站(hexdata)图标覆盖所有已匹配符文，不改动名称和描述。确定？")) return;
              setRuneMsg("正在更新数据站图标...");
              try {
                const res = await fetch("/api/admin/agent/compare-runes", { method: "POST", headers: h, body: JSON.stringify({ source: "data_station", iconOnly: true }) });
                const data = await res.json();
                setRuneMsg(data.success ? `✅ 数据站图标更新完成！${data.updated}个符文` : `失败: ${data.error}`);
              } catch (e: any) { setRuneMsg(e.message); }
            }} className="text-[10px] px-2 py-1 rounded-full bg-blue-100 text-blue-600 font-medium hover:bg-blue-200">🖼 数据站图标</button>
          </div>
          {runeMsg && <p className="text-[11px] mt-1 text-sage-500">{runeMsg}</p>}
        </div>

        {(communityResult || dataStationResult) && (
          <div className="border-t border-sage-200/50 px-3 py-1.5 flex items-center gap-2 text-[11px] bg-sage-50/30">
            <span className="text-sage-500">对比来源：</span>
            {communityResult && (
              <button onClick={() => setActiveRuneSource("community")}
                className={`px-3 py-1 rounded-full font-medium ${activeRuneSource === "community" ? "bg-green-500 text-white" : "bg-white/50 text-sage-500"}`}>
                🌐 社区 ({communityResult.total})
              </button>
            )}
            {dataStationResult && (
              <button onClick={() => setActiveRuneSource("data_station")}
                className={`px-3 py-1 rounded-full font-medium ${activeRuneSource === "data_station" ? "bg-blue-500 text-white" : "bg-white/50 text-sage-500"}`}>
                📊 数据站 ({dataStationResult.total})
              </button>
            )}
            {communityResult && dataStationResult && (
              <button onClick={async () => { setAiCompareLoading(true); const r = await fetch("/api/admin/agent/ai-compare", { headers: h }); setAiCompare(await r.json()); setAiCompareLoading(false); }}
                disabled={aiCompareLoading} className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-600 font-medium hover:bg-purple-200">
                🤖 AI比对
              </button>
            )}
            <button onClick={() => setRuneCollapsed(!runeCollapsed)} className="ml-auto text-[10px] text-sage-400">{runeCollapsed ? "展开 ▸" : "收起 ▾"}</button>
          </div>
        )}

        {currentRuneSrc?.diffs && currentRuneSrc.diffs.length > 0 && !runeCollapsed && (
          <div className="border-t border-sage-200/50 bg-sage-50/30">
            <div className="flex items-center gap-2 px-3 py-1.5 border-b border-sage-100/50 text-[10px]">
              <span className="text-green-600 font-bold">+{currentRuneSrc.diffs.filter((d: any) => d.action === "created").length}新增</span>
              <span className="text-gold-600 font-bold">~{currentRuneSrc.diffs.filter((d: any) => d.action === "updated").length}更新</span>
              <span className="text-rose-500 font-bold">-{currentRuneSrc.diffs.filter((d: any) => d.action === "deactivated").length}停用</span>
              <span className="text-sage-400 ml-auto">
                {activeRuneSource === "community" ? "arammayhem P26.11" : "hexdata P16.11"} · {currentRuneSrc.remoteCount}符文 · 💾{currentRuneSrc.localCount}
              </span>
              {(() => {
                const ids = currentRuneSrc.diffs.filter((d: any) => d.action !== "deactivated").map((d: any) => d.name);
                const allChecked = ids.length > 0 && ids.every((id: string) => runeChecks.has(id));
                return (
                  <button onClick={() => setRuneChecks(allChecked ? new Set() : new Set(ids))}
                    className={`text-[10px] font-medium ${allChecked ? "text-sage-400" : "text-gold-500"}`}>
                    {allChecked ? `取消全选(${runeChecks.size})` : "全选"}
                  </button>
                );
              })()}
            </div>
            <div className="grid grid-cols-[24px_1fr_2fr_120px] gap-1.5 px-3 py-1 text-[9px] font-semibold text-sage-500 border-b border-sage-200/50 bg-white/20 items-center">
              <span /><span>符文名</span><span>描述</span><span className="text-right">变更说明</span>
            </div>
            <div className="max-h-72 overflow-y-auto">
              {currentRuneSrc.diffs.slice(0, 100).map((d: any, i: number) => {
                const checked = runeChecks.has(d.name);
                const bg = d.action === "created" ? "bg-green-50/30" : d.action === "deactivated" ? "bg-rose-50/30" : "";
                const cParts: string[] = [];
                if (d.action === "created") cParts.push("新增");
                else if (d.action === "deactivated") cParts.push("停用(不在前台显示)");
                else { if (d.name_diff) cParts.push("名:" + d.db_name); if (d.tier_diff) cParts.push(d.db_tier + "→" + d.remote_tier); if (d.desc_diff) cParts.push("描述不同"); if (d.icon_diff) cParts.push("图标更新"); if (d.need_source_id) cParts.push("补ID"); if (cParts.length===0) cParts.push("元数据"); }
                const changeDesc = cParts.join(" ");
                return (
                  <label key={i} className={`grid grid-cols-[24px_1fr_2fr_120px] gap-1.5 px-3 py-1.5 text-[11px] cursor-pointer hover:bg-white/50 items-start ${bg}`}>
                    <input type="checkbox" checked={checked} onChange={() => toggleRuneCheck(d.name)} className="size-3 rounded flex-shrink-0 mt-0.5" />
                    <span className="text-sage-700 font-medium truncate">{d.name}</span>
                    <span className="text-[10px] text-sage-500 line-clamp-2">{d.remote_desc || d.db_desc || ""}</span>
                    <span className="text-[9px] text-sage-500 text-right">{changeDesc}</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {currentRuneSrc?.diffs && currentRuneSrc.diffs.length > 0 && runeCollapsed && (
          <div className="border-t border-sage-200/50 px-3 py-2 text-[11px] text-sage-500 bg-sage-50/30">
            共 {currentRuneSrc.diffs.length} 项差异（{activeRuneSource === "community" ? "arammayhem" : "hexdata"} vs 数据库），已选 {runeChecks.size} 项。
          </div>
        )}

        {currentRuneSrc && (!currentRuneSrc.diffs || currentRuneSrc.diffs.length === 0) && (
          <div className="border-t border-sage-200/50 px-3 py-2 text-[11px] text-green-600 bg-green-50/50">
            ✅ 经过检测，目前没有需要变更的。数据来源：{activeRuneSource === "community" ? "arammayhem.com" : "hexdata.com.cn"}。
          </div>
        )}
      </div>

      {/* ======== 卡片2：英雄胜率同步 ======== */}
      <div className="bg-white/60 rounded-xl border border-sage-200/50 overflow-hidden">
        <div className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="size-7 rounded-lg bg-rose-100 flex items-center justify-center text-sm">📊</span>
            <h3 className="text-[13px] font-bold text-sage-700">英雄胜率同步</h3>
            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-600">172英雄</span>
          </div>
          <p className="text-[10px] text-sage-500 mb-2">从hexdata.com.cn获取英雄胜率和统计数据，数据将显示在前台英雄卡片上</p>
          <div className="flex gap-2">
            <button onClick={handleStatsPreview} disabled={statsLoading}
              className="text-[11px] px-4 py-2 rounded-lg bg-white/80 text-sage-600 font-medium hover:bg-white border border-sage-200/50 disabled:opacity-40">
              {statsLoading ? "..." : "📊 预览变更"}
            </button>
            <button onClick={handleStatsExecute} disabled={statsChecks.size === 0}
              className="text-[11px] px-4 py-2 rounded-lg bg-gold-300 text-gold-700 font-bold hover:bg-gold-400 disabled:opacity-40">
              确认更新 ({statsChecks.size})
            </button>
          </div>
          {statsMsg && <p className="text-[11px] mt-1 text-sage-500">{statsMsg}</p>}
        </div>

        {statsResult?.result?.changes && statsResult.result.changes.length > 0 && (
          <div className="border-t border-sage-200/50 bg-sage-50/30">
            <div className="flex items-center justify-between px-3 py-1.5 border-b border-sage-100/50 text-[10px]">
              <span className="text-sage-500">{statsResult.result.changes.length}个英雄变更 · 已选{statsChecks.size}</span>
              <div className="flex gap-2">
                {(() => {
                  const ids = statsResult.result.changes.map((c: any) => c.heroName);
                  const all = ids.length > 0 && ids.every((id: string) => statsChecks.has(id));
                  return <button onClick={() => setStatsChecks(all ? new Set() : new Set(ids))} className={`text-[10px] font-medium ${all ? "text-sage-400" : "text-gold-500"}`}>{all ? `取消全选(${statsChecks.size})` : "全选"}</button>;
                })()}
                <button onClick={() => setStatsCollapsed(!statsCollapsed)} className="text-[10px] text-sage-400">{statsCollapsed ? "展开 ▸" : "收起 ▾"}</button>
              </div>
            </div>
            {statsCollapsed ? (
              <div className="px-3 py-2 text-[11px] text-sage-500">共{statsResult.result.changes.length}个英雄胜率变更，已选{statsChecks.size}个</div>
            ) : (
              <>
                <div className="grid grid-cols-[24px_1fr_60px_80px_1fr_100px] gap-1.5 px-3 py-1 text-[9px] font-semibold text-sage-500 border-b border-sage-100/30 bg-white/20 items-center">
                  <span /><span>英雄名</span><span className="text-center">等级</span><span className="text-center">胜率</span><span>定位</span><span className="text-right">变更说明</span>
                </div>
                <div className="max-h-48 overflow-y-auto">
                  {statsResult.result.changes.slice(0, 50).map((c: any, i: number) => {
                    const checked = statsChecks.has(c.heroName);
                    const tc = c.oldTier !== c.newTier;
                    const wc = c.oldWinRate !== c.newWinRate;
                    const cd: string[] = [];
                    if (tc) cd.push(`等级${c.oldTier || "—"}→${c.newTier}`);
                    if (wc) cd.push(`胜率${c.oldWinRate || "—"}→${c.newWinRate}`);
                    return (
                      <label key={i} className="grid grid-cols-[24px_1fr_60px_80px_1fr_100px] gap-1.5 px-3 py-1 text-[11px] cursor-pointer hover:bg-white/50 items-center">
                        <input type="checkbox" checked={checked} onChange={() => toggleStatsCheck(c.heroName)} className="size-3 rounded" />
                        <span className="text-sage-700 font-medium truncate">{c.heroName}</span>
                        <span className={`text-[10px] text-center font-medium ${tc ? "text-gold-600" : "text-sage-400"}`}>{tc ? <>{c.oldTier || "—"}→<b>{c.newTier}</b></> : c.newTier || "—"}</span>
                        <span className={`text-[10px] text-center ${wc ? "text-green-600 font-medium" : "text-sage-400"}`}>{wc ? <>{c.oldWinRate || "—"}→<b>{c.newWinRate}</b></> : c.newWinRate || "—"}</span>
                        <span className="text-[10px] text-sage-400 truncate">{c.attackType || ""}</span>
                        <span className="text-[9px] text-sage-500 text-right">{cd.join("，")}</span>
                      </label>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}

        {statsResult?.result && (!statsResult.result.changes || statsResult.result.changes.length === 0) && (
          <div className="border-t border-sage-200/50 px-3 py-2 text-[11px] text-green-600 bg-green-50/50">✅ 经过检测，目前没有需要变更的。数据来源：hexdata.com.cn。</div>
        )}
      </div>

      {/* ======== 卡片3：英雄-符文匹配 ======== */}
      <div className="bg-white/60 rounded-xl border border-sage-200/50 overflow-hidden">
        <div className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="size-7 rounded-lg bg-purple-100 flex items-center justify-center text-sm">🔗</span>
            <h3 className="text-[13px] font-bold text-sage-700">英雄-符文匹配</h3>
            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-600">666组合</span>
          </div>
          <p className="text-[10px] text-sage-500 mb-2">根据arammayhem社区666个英雄+符文组合评级，匹配推荐到通用流派。手动推荐永不覆盖。</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-2 p-1.5 bg-sage-50/70 rounded-lg text-[11px]">
            <span className="text-sage-400">模式:</span>
            <button onClick={() => setRecMode("incremental")} className={`px-2 py-0.5 rounded-md font-medium ${recMode === "incremental" ? "bg-green-200 text-green-700" : "bg-white/60 text-sage-500"}`}>增量</button>
            <button onClick={() => setRecMode("fullRefresh")} className={`px-2 py-0.5 rounded-md font-medium ${recMode === "fullRefresh" ? "bg-rose-200 text-rose-600" : "bg-white/60 text-sage-500"}`}>全量</button>
            <div className="flex gap-1.5 ml-auto">
              <button onClick={handleRecPreview} disabled={recLoading} className="px-2.5 py-1 rounded-lg bg-white/80 text-sage-600 text-[11px] font-medium hover:bg-white disabled:opacity-40 border border-sage-200/50">预览</button>
              <button onClick={handleRecExecute} disabled={recChecks.size === 0} className="px-2.5 py-1 rounded-lg bg-gold-300 text-gold-700 text-[11px] font-bold hover:bg-gold-400 disabled:opacity-40">确认更新({recChecks.size})</button>
            </div>
          </div>
          {recMsg && <p className="text-[11px] text-sage-500">{recMsg}</p>}
        </div>

        {recResult?.preview && recResult.preview.details?.length > 0 && (
          <div className="border-t border-sage-200/50 bg-sage-50/30">
            <div className="flex items-center gap-2 px-3 py-1.5 border-b border-sage-100/50 text-[10px]">
              <span className="text-purple-600 font-bold">🦸{recResult.preview.affectedHeroes?.length || 0}英雄</span>
              <span className="text-sage-400">· 匹配{recResult.preview.matchedCombos || 0}/{recResult.preview.totalCombos || 0}组合</span>
              {recResult.preview.unmatchedRuneCount > 0 && (
                <span className="text-rose-400" title={`未匹配符文: ${(recResult.preview.unmatchedRunes || []).join(", ")}`}>⚠️{recResult.preview.unmatchedRuneCount}符文未匹配</span>
              )}
              <span className="text-green-600 font-bold">+{recResult.preview.summary.toAdd}推荐</span>
              <span className="text-gold-600 font-bold">~{recResult.preview.summary.toUpdate}更新</span>
              <span className="text-blue-600 font-bold">🛡️{recResult.preview.summary.skipManual}保护</span>
              <span className="text-sage-500">· 跳过{recResult.preview.summary.skipExists}</span>
              {(() => {
                const filtered = (recResult.preview.details || []).filter((d: any) => recFilter === "all" || d.action === recFilter);
                const ids = filtered.filter((d: any) => d.action !== "skip_exists").map((d: any) => `${d.heroName}:${d.runeName}`);
                const all = ids.length > 0 && ids.every((id: string) => recChecks.has(id));
                return <button onClick={() => setRecChecks(all ? new Set() : new Set(ids))} className={`text-[10px] font-medium ml-auto ${all ? "text-sage-400" : "text-gold-500"}`}>{all ? `取消全选(${recChecks.size})` : `全选(${ids.length})`}</button>;
              })()}
              <button onClick={() => setRecCollapsed(!recCollapsed)} className="text-[10px] text-sage-400">{recCollapsed ? "展开 ▸" : "收起 ▾"}</button>
            </div>
            {/* 筛选按钮 */}
            <div className="flex gap-1.5 px-3 py-1 border-b border-sage-100/30">
              {([{k:"all",l:"全部"},{k:"add",l:"新增"},{k:"update",l:"更新"},{k:"skip_manual",l:"保护"},{k:"skip_exists",l:"已存在"}] as const).map(f => (
                <button key={f.k} onClick={() => setRecFilter(f.k)}
                  className={`text-[10px] px-2 py-0.5 rounded-full font-medium transition-all ${
                    recFilter === f.k ? "bg-sage-400 text-white" : "bg-white/50 text-sage-500"
                  }`}>
                  {f.l}
                </button>
              ))}
            </div>
            {recCollapsed ? (
              <div className="px-3 py-2 text-[11px] text-sage-500">共{recResult.preview.details.length}条推荐变更，已选{recChecks.size}项。</div>
            ) : (
              <>
                <div className="grid grid-cols-[20px_1fr_1fr_1.5fr_2fr_40px_70px] gap-1.5 px-3 py-1 text-[9px] font-semibold text-sage-500 border-b border-sage-100/30 bg-white/20 items-center">
                  <span /><span>英雄</span><span>符文</span><span>符文描述</span><span>推荐理由对比</span><span className="text-center">分</span><span className="text-right">变更</span>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {(recResult.preview.details || []).filter((d: any) => recFilter === "all" || d.action === recFilter).map((d: any, i: number) => {
                    const key = `${d.heroName}:${d.runeName}`;
                    const checked = recChecks.has(key);
                    const colors: Record<string, string> = { add: "text-green-600", update: "text-gold-600", skip_manual: "text-blue-500", skip_exists: "text-sage-400" };
                    const ct = d.action === "add" ? `新增(${d.newScore})` : d.action === "update" ? `${d.oldScore}→${d.newScore}` : d.action === "skip_manual" ? "手动🛡️" : "已存在";
                    const canCheck = d.action !== "skip_exists";
                    const reasonDisplay = d.action === "update" && d.oldReason && d.newReason && d.oldReason !== d.newReason
                      ? <><span className="text-sage-400 line-through text-[9px]">{d.oldReason}</span><br/><span className="text-gold-600 text-[9px]">{d.newReason}</span></>
                      : <span className="text-[10px] text-sage-500 line-clamp-2" title={d.newReason || d.oldReason || ""}>{d.newReason || d.oldReason || ""}</span>;
                    return (
                      <label key={i} className={`grid grid-cols-[20px_1fr_1fr_1.5fr_2fr_40px_70px] gap-1.5 px-3 py-1.5 text-[11px] cursor-pointer hover:bg-white/50 items-start ${colors[d.action] || ""}`}>
                        {canCheck ? <input type="checkbox" checked={checked} onChange={() => toggleRecCheck(key)} className="size-3 rounded mt-0.5" /> : <span />}
                        <span className="text-sage-700 font-medium truncate">{d.heroName}</span>
                        <span className="text-sage-700 truncate">{d.runeName}</span>
                        <span className="text-[10px] text-sage-500 line-clamp-2">{d.runeDesc || ""}</span>
                        <span className="leading-tight">{reasonDisplay}</span>
                        <span className="text-[10px] text-center font-bold">{d.newScore || d.oldScore || "—"}</span>
                        <span className="text-[9px] text-sage-500 text-right">{ct}</span>
                      </label>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}

        {recResult?.preview && recResult.preview.details?.length === 0 && (
          <div className="border-t border-sage-200/50 px-3 py-2 text-[11px] text-green-600 bg-green-50/50">✅ 经过检测，目前没有需要变更的。数据来源：hexdata.com.cn。</div>
        )}
      </div>



      {/* ======== 卡片4：装备池同步 ======== */}
      <div className="bg-white/60 rounded-xl border border-sage-200/50 overflow-hidden">
        <div className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="size-7 rounded-lg bg-cyan-100 flex items-center justify-center text-sm">🗡️</span>
            <h3 className="text-[13px] font-bold text-sage-700">装备池同步</h3>
            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-cyan-100 text-cyan-600">仅成装</span>
          </div>
          <p className="text-[10px] text-sage-500 mb-2">从DataDragon中文版获取成装数据（名称、描述、价格），自动识别适配类型。小件、消耗品、非ARAM装备不同步。</p>
          <div className="flex gap-2">
            <button onClick={handleEquipPreview} disabled={equipLoading}
              className="text-[11px] px-4 py-2 rounded-lg bg-white/80 text-sage-600 font-medium hover:bg-white border border-sage-200/50 disabled:opacity-40">
              {equipLoading ? "加载中..." : "🔍 预览变更"}
            </button>
            <button onClick={handleEquipExecute} disabled={equipChecks.size === 0}
              className="text-[11px] px-4 py-2 rounded-lg bg-gold-300 text-gold-700 font-bold hover:bg-gold-400 disabled:opacity-40">
              确认更新 ({equipChecks.size})
            </button>
          </div>
          {equipMsg && <p className="text-[11px] mt-1 text-sage-500">{equipMsg}</p>}
        </div>

        {equipResult?.diffs && equipResult.diffs.length > 0 && (
          <div className="border-t border-sage-200/50 bg-sage-50/30">
            <div className="flex items-center gap-2 px-3 py-1.5 border-b border-sage-100/50 text-[10px]">
              <span className="text-green-600 font-bold">+{equipResult.diffs.filter((d: any) => d.action === "created").length}新增</span>
              <span className="text-gold-600 font-bold">~{equipResult.diffs.filter((d: any) => d.action === "updated").length}更新</span>
              <span className="text-rose-500 font-bold">-{equipResult.diffs.filter((d: any) => d.action === "deactivated").length}停用</span>
              <span className="text-sage-400 ml-auto">DataDragon P{equipResult.version} · {equipResult.total}成装 · 💾{equipResult.localCount}</span>
              {(() => {
                const ids = equipResult.diffs.filter((d: any) => d.action !== "deactivated").map((d: any) => d.game_id);
                const allChecked = ids.length > 0 && ids.every((id: string) => equipChecks.has(id));
                return (
                  <button onClick={() => setEquipChecks(allChecked ? new Set() : new Set(ids))}
                    className={`text-[10px] font-medium ${allChecked ? "text-sage-400" : "text-gold-500"}`}>
                    {allChecked ? `取消全选(${equipChecks.size})` : "全选"}
                  </button>
                );
              })()}
              <button onClick={() => setEquipCollapsed(!equipCollapsed)} className="text-[10px] text-sage-400">{equipCollapsed ? "展开 ▸" : "收起 ▾"}</button>
            </div>
            {equipCollapsed ? (
              <div className="px-3 py-2 text-[11px] text-sage-500">共 {equipResult.diffs.length} 项变更，已选 {equipChecks.size} 项。</div>
            ) : (
              <>
                <div className="grid grid-cols-[20px_1fr_2fr_60px_60px_120px] gap-1.5 px-3 py-1 text-[9px] font-semibold text-sage-500 border-b border-sage-200/50 bg-white/20 items-center">
                  <span /><span>装备名称</span><span>装备描述</span><span className="text-center">价格</span><span className="text-center">适配类型</span><span className="text-right">变更说明</span>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {equipResult.diffs.slice(0, 100).map((d: any, i: number) => {
                    const checked = equipChecks.has(d.game_id);
                    const bg = d.action === "created" ? "bg-green-50/30" : d.action === "deactivated" ? "bg-rose-50/30" : "";
                    const catColors: Record<string, string> = {
                      "刺客": "bg-red-100 text-red-600", "战士": "bg-orange-100 text-orange-600",
                      "法师": "bg-purple-100 text-purple-600", "射手": "bg-blue-100 text-blue-600",
                      "坦克": "bg-slate-200 text-slate-600", "辅助": "bg-green-100 text-green-600",
                      "通用": "bg-sage-100 text-sage-500",
                    };
                    const catCls = catColors[d.category] || "bg-sage-100 text-sage-500";
                    return (
                      <label key={d.game_id} className={`grid grid-cols-[20px_1fr_2fr_60px_60px_120px] gap-1.5 px-3 py-1.5 text-[11px] cursor-pointer hover:bg-white/50 items-start ${bg}`}>
                        <input type="checkbox" checked={checked} onChange={() => toggleEquipCheck(d.game_id)} className="size-3 rounded flex-shrink-0 mt-0.5" />
                        <span className="text-sage-700 font-medium truncate" title={d.name}>{d.name}</span>
                        <span className="text-[10px] text-sage-500 line-clamp-2" title={(d.remote_description || d.description || "").replace(/<[^>]+>/g, "")}>{(d.remote_description || d.description || "").replace(/<[^>]+>/g, "")}</span>
                        <span className="text-[10px] text-gold-600 text-center font-medium">💰{d.remote_price || d.price}</span>
                        <span className={`text-[9px] px-1 py-0.5 rounded-full text-center font-medium ${catCls}`}>{d.category}</span>
                        <span className="text-[9px] text-sage-500 text-right">{d.change_desc}</span>
                      </label>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}

        {equipResult && (!equipResult.diffs || equipResult.diffs.length === 0) && (
          <div className="border-t border-sage-200/50 px-3 py-2 text-[11px] text-green-600 bg-green-50/50">
            ✅ 经过检测，目前没有需要变更的。数据来源：DataDragon中文版。
          </div>
        )}
      </div>

      {/* ======== 卡片5：装备推荐同步 ======== */}
      <div className="bg-white/60 rounded-xl border border-sage-200/50 overflow-hidden">
        <div className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="size-7 rounded-lg bg-teal-100 flex items-center justify-center text-sm">⚔️</span>
            <h3 className="text-[13px] font-bold text-sage-700">装备推荐同步</h3>
            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-teal-100 text-teal-600">172英雄</span>
          </div>
          <p className="text-[10px] text-sage-500 mb-2">从hexdata获取172个英雄的装备推荐（出门装+核心装），同步到通用流派。</p>
          <div className="flex gap-2">
            <button onClick={handleEquipRecPreview} disabled={equipRecLoading}
              className="text-[11px] px-4 py-2 rounded-lg bg-white/80 text-sage-600 font-medium hover:bg-white border border-sage-200/50 disabled:opacity-40">
              {equipRecLoading ? "加载中..." : "🔍 预览变更"}
            </button>
            <button onClick={handleEquipRecExecute} disabled={equipRecChecks.size === 0}
              className="text-[11px] px-4 py-2 rounded-lg bg-gold-300 text-gold-700 font-bold hover:bg-gold-400 disabled:opacity-40">
              确认更新 ({equipRecChecks.size})
            </button>
          </div>
          {equipRecMsg && <p className="text-[11px] mt-1 text-sage-500">{equipRecMsg}</p>}
        </div>

        {equipRecResult?.diffs && equipRecResult.diffs.length > 0 && (
          <div className="border-t border-sage-200/50 bg-sage-50/30">
            <div className="flex items-center gap-2 px-3 py-1.5 border-b border-sage-100/50 text-[10px]">
              <span className="text-green-600 font-bold">+{equipRecResult.diffs.filter((d: any) => d.action === "created").length}新增</span>
              <span className="text-gold-600 font-bold">~{equipRecResult.diffs.filter((d: any) => d.action === "updated").length}更新</span>
              <span className="text-sage-400 ml-auto">{equipRecResult.synced}英雄 · hexdata</span>
              {(() => {
                const ids = equipRecResult.diffs.map((d: any) => d.hero_id);
                const all = ids.every((id: string) => equipRecChecks.has(id));
                return (
                  <button onClick={() => setEquipRecChecks(all ? new Set() : new Set(ids))}
                    className={`text-[10px] font-medium ${all ? "text-sage-400" : "text-gold-500"}`}>
                    {all ? `取消全选(${equipRecChecks.size})` : "全选"}
                  </button>
                );
              })()}
              <button onClick={() => setEquipRecCollapsed(!equipRecCollapsed)} className="text-[10px] text-sage-400">{equipRecCollapsed ? "展开 ▸" : "收起 ▾"}</button>
            </div>
            {equipRecCollapsed ? (
              <div className="px-3 py-2 text-[11px] text-sage-500">共 {equipRecResult.diffs.length} 个英雄，已选 {equipRecChecks.size} 个。</div>
            ) : (
              <>
                <div className="grid grid-cols-[20px_1fr_1.5fr_1.5fr_2fr] gap-1.5 px-3 py-1 text-[9px] font-semibold text-sage-500 border-b border-sage-200/50 bg-white/20 items-center">
                  <span /><span>英雄</span><span>出门装</span><span>核心出装</span><span>变更说明</span>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {equipRecResult.diffs.map((d: any, i: number) => {
                    const checked = equipRecChecks.has(d.hero_id);
                    const bg = d.action === "created" ? "bg-green-50/30" : d.change === "无变化" ? "" : "bg-gold-50/30";
                    return (
                      <label key={d.hero_id} className={`grid grid-cols-[20px_1fr_1.5fr_1.5fr_2fr] gap-1.5 px-3 py-1.5 text-[11px] cursor-pointer hover:bg-white/50 items-start ${bg}`}>
                        <input type="checkbox" checked={checked} onChange={() => toggleEquipRecCheck(d.hero_id)} className="size-3 rounded flex-shrink-0 mt-0.5" />
                        <span className="text-sage-700 font-medium truncate">{d.heroName}</span>
                        <span className="text-[10px] text-sage-500 line-clamp-2" title={d.newStarters}>{d.newStarters}</span>
                        <span className="text-[10px] text-sage-500 line-clamp-2" title={d.newCores}>{d.newCores}</span>
                        <span className="text-[9px] text-sage-500">{d.change}</span>
                      </label>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}

        {equipRecResult && (!equipRecResult.diffs || equipRecResult.diffs.length === 0) && (
          <div className="border-t border-sage-200/50 px-3 py-2 text-[11px] text-green-600 bg-green-50/50">✅ 经过检测，目前没有需要变更的。</div>
        )}
      </div>

      {/* ======== AI比对结果弹窗 ======== */}
      {aiCompare?.success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setAiCompare(null)}>
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="px-5 pt-5 pb-3 flex items-center justify-between border-b flex-shrink-0">
              <h3 className="text-[16px] font-bold text-sage-700">🤖 AI双源比对结果</h3>
              <button onClick={() => setAiCompare(null)} className="size-7 rounded-full bg-sage-100 text-sage-500 text-[16px] font-bold">&times;</button>
            </div>
            <div className="px-5 py-2 border-b flex-shrink-0 text-[11px] text-sage-500">
              🌐社区 {aiCompare.community_count} 符文 | 📊数据站 {aiCompare.data_station_count} 符文 | 同名异述{aiCompare.cat1_count} | 异名似述{aiCompare.cat2_count} | 独有{aiCompare.cat3_count}
            </div>
            <div className="overflow-y-auto flex-1 px-5 py-3 space-y-3">
              {aiCompare.cat1?.length > 0 && (
                <div>
                  <h4 className="text-[12px] font-bold text-sage-600 mb-1">📋 类别1：同名异述 ({aiCompare.cat1.length}项)</h4>
                  <div className="space-y-1 max-h-40 overflow-y-auto bg-sage-50 rounded-lg p-2">
                    {aiCompare.cat1.slice(0,20).map((item: any, i: number) => (
                      <div key={i} className="text-[10px] bg-white/50 rounded p-1.5">
                        <b className="text-sage-700">{item.community_name}</b>
                        {item.tier_diff && <span className="ml-1 text-gold-600">[{item.community_tier}≠{item.data_station_tier}]</span>}
                        {item.desc_diff && <span className="ml-1 text-blue-500">描述不同</span>}
                        <div className="text-sage-400 mt-0.5 truncate">社区: {item.community_desc}</div>
                        <div className="text-sage-400 truncate">数据站: {item.data_station_desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {aiCompare.cat2?.length > 0 && (
                <div>
                  <h4 className="text-[12px] font-bold text-purple-600 mb-1">🤖 类别2：异名似述 ({aiCompare.cat2.length}项)</h4>
                  <div className="space-y-1 max-h-40 overflow-y-auto bg-purple-50 rounded-lg p-2">
                    {aiCompare.cat2.slice(0,20).map((item: any, i: number) => (
                      <div key={i} className="text-[10px] bg-white/50 rounded p-1.5">
                        <b className="text-purple-700">{item.community_name} ↔ {item.data_station_name}</b>
                        <span className="ml-1 text-purple-500">({item.similarity}%相似)</span>
                        <div className="text-sage-400 mt-0.5 truncate">社区: {item.community_desc}</div>
                        <div className="text-sage-400 truncate">数据站: {item.data_station_desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {aiCompare.cat3?.length > 0 && (
                <div>
                  <h4 className="text-[12px] font-bold text-amber-600 mb-1">⚠️ 类别3：独有符文 ({aiCompare.cat3.length}项)</h4>
                  <div className="space-y-1 max-h-40 overflow-y-auto bg-amber-50 rounded-lg p-2">
                    {aiCompare.cat3.slice(0,20).map((item: any, i: number) => (
                      <div key={i} className="text-[10px] bg-white/50 rounded p-1.5">
                        <b className="text-amber-700">{item.name}</b>
                        <span className="ml-1 text-amber-500">[{item.source==="community"?"社区独有":"数据站独有"}]</span>
                        <div className="text-sage-400 mt-0.5 truncate">{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="px-5 pb-5 pt-3 flex-shrink-0 border-t">
              <button onClick={() => setAiCompare(null)} className="w-full py-2.5 rounded-xl bg-sage-100 text-sage-600 font-medium text-[14px]">关闭</button>
            </div>
          </div>
        </div>
      )}

      {/* ======== 进度条弹窗 ======== */}
      {progress && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-80 p-6 text-center shadow-2xl">
            <div className="text-[28px] mb-3">⚡</div>
            <p className="text-[13px] text-sage-700 font-medium mb-3">{progress.label}</p>
            <div className="w-full bg-sage-100 rounded-full h-3 overflow-hidden">
              {progress.total > 0 ? (
                <div className="bg-gold-400 h-full rounded-full transition-all duration-300" style={{ width: `${Math.round(progress.current / progress.total * 100)}%` }} />
              ) : (
                <div className="bg-gold-400 h-full rounded-full w-2/3 animate-pulse" />
              )}
            </div>
            <p className="text-[11px] text-sage-400 mt-2">{progress.total > 0 ? `${Math.round(progress.current / progress.total * 100)}%` : "处理中..."}</p>
          </div>
        </div>
      )}

      {/* ======== 确认弹窗 ======== */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setConfirmModal(null)}>
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl max-h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="px-5 pt-5 pb-3 flex items-center justify-between border-b">
              <h3 className="text-[16px] font-bold text-sage-700">{confirmModal.title}</h3>
              <button onClick={() => setConfirmModal(null)} className="size-7 rounded-full bg-sage-100 text-sage-500">&times;</button>
            </div>
            <div className="px-5 py-3 border-b">
              <h4 className="text-[12px] font-semibold text-sage-600 mb-1">变更摘要</h4>
              {confirmModal.summary.split("\n").map((l: string, i: number) => <p key={i} className="text-[12px] text-sage-700">{l}</p>)}
            </div>
            {confirmModal.warnings?.length > 0 && (
              <div className="px-5 py-3 border-b bg-rose-50/50">
                <h4 className="text-[12px] font-semibold text-rose-600 mb-1">注意事项</h4>
                {confirmModal.warnings.map((w: string, i: number) => <p key={i} className="text-[11px] text-rose-600">{w}</p>)}
              </div>
            )}
            <div className="px-5 py-3 overflow-y-auto flex-1">
              <h4 className="text-[12px] font-semibold text-sage-600 mb-1">变更详情 ({confirmModal.details?.length || 0}条)</h4>
              <div className="space-y-0.5 max-h-48 overflow-y-auto bg-sage-50 rounded-lg p-2">
                {confirmModal.details?.map((d: string, i: number) => <p key={i} className="text-[11px] text-sage-700 whitespace-pre-wrap">{d}</p>)}
              </div>
            </div>
            <div className="px-5 pb-5 pt-3 flex gap-3 border-t">
              <button onClick={() => setConfirmModal(null)} className="flex-1 py-2.5 rounded-xl bg-sage-100 text-sage-600 font-medium text-[14px]">取消</button>
              <button onClick={confirmModal.onConfirm} className="flex-1 py-2.5 rounded-xl bg-gold-300 text-gold-700 font-bold text-[14px]">确认执行</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
