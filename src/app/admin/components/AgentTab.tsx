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

  // 弹窗
  const [confirmModal, setConfirmModal] = useState<any>(null);
  const [progress, setProgress] = useState<{ current: number; total: number; label: string } | null>(null);
  const [localRuneCount, setLocalRuneCount] = useState(0);
  const [hasDeepSeek, setHasDeepSeek] = useState(false);

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
    setProgress({ current: 0, total: 1, label: `正在更新(${srcLabel})...` });
    try {
      const res = await fetch("/api/admin/agent/compare-runes", { method: "POST", headers: h, body: JSON.stringify({ source, forceUpdateDesc, runeNames: ids }) });
      const data = await res.json();
      setProgress(null);
      setRuneMsg(`更新完成！[${srcLabel}] 更新${data.updated||0} 新增${data.created||0} 停用${data.deactivated||0}`);
      setRuneChecks(new Set());
      handleRunePreview();
    } catch (e: any) { setRuneMsg(e.message); setProgress(null); }
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
    setRecLoading(true); setRecCollapsed(false); setRecMsg("预览中...");
    try {
      const res = await fetch("/api/admin/agent/generate-recs", { method: "POST", headers: h, body: JSON.stringify({ mode: recMode, dryRun: true }) });
      const data = await res.json();
      setRecResult(data);
      if (data.success && data.preview) {
        const toCheck = (data.preview.details || []).filter((d: any) => d.action === "add" || d.action === "update").map((d: any) => `${d.heroName}:${d.runeName}`);
        setRecChecks(new Set(toCheck));
      }
      setRecMsg(data.success ? "预览完成" : "预览失败");
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
                else { if (d.name_diff) cParts.push("名:" + d.db_name); if (d.tier_diff) cParts.push(d.db_tier + "→" + d.remote_tier); if (d.desc_diff) cParts.push("描述不同"); if (d.need_source_id) cParts.push("补ID"); if (cParts.length===0) cParts.push("元数据"); }
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
              <span className="text-green-600 font-bold">+{recResult.preview.summary.toAdd}推荐</span>
              <span className="text-gold-600 font-bold">~{recResult.preview.summary.toUpdate}更新</span>
              <span className="text-blue-600 font-bold">🛡️{recResult.preview.summary.skipManual}保护</span>
              {(() => {
                const ids = (recResult.preview.details || []).filter((d: any) => d.action === "add" || d.action === "update" || d.action === "skip_manual").map((d: any) => `${d.heroName}:${d.runeName}`);
                const all = ids.length > 0 && ids.every((id: string) => recChecks.has(id));
                return <button onClick={() => setRecChecks(all ? new Set() : new Set(ids))} className={`text-[10px] font-medium ml-auto ${all ? "text-sage-400" : "text-gold-500"}`}>{all ? `取消全选(${recChecks.size})` : "全选"}</button>;
              })()}
              <button onClick={() => setRecCollapsed(!recCollapsed)} className="text-[10px] text-sage-400">{recCollapsed ? "展开 ▸" : "收起 ▾"}</button>
            </div>
            {recCollapsed ? (
              <div className="px-3 py-2 text-[11px] text-sage-500">共{recResult.preview.details.length}条推荐变更，已选{recChecks.size}项。</div>
            ) : (
              <>
                <div className="grid grid-cols-[20px_1fr_1fr_2fr_50px_100px] gap-1.5 px-3 py-1 text-[9px] font-semibold text-sage-500 border-b border-sage-100/30 bg-white/20 items-center">
                  <span /><span>英雄</span><span>符文</span><span>符文描述</span><span className="text-center">分</span><span className="text-right">变更</span>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {(recResult.preview.details || []).slice(0, 100).map((d: any, i: number) => {
                    const key = `${d.heroName}:${d.runeName}`;
                    const checked = recChecks.has(key);
                    const colors: Record<string, string> = { add: "text-green-600", update: "text-gold-600", skip_manual: "text-blue-500", skip_exists: "text-sage-400" };
                    const ct = d.action === "add" ? `新增(${d.newScore})` : d.action === "update" ? `${d.oldScore}→${d.newScore}` : d.action === "skip_manual" ? "手动🛡️" : "已存在";
                    const canCheck = d.action !== "skip_exists";
                    return (
                      <label key={i} className={`grid grid-cols-[20px_1fr_1fr_2fr_50px_100px] gap-1.5 px-3 py-1.5 text-[11px] cursor-pointer hover:bg-white/50 items-start ${colors[d.action] || ""}`}>
                        {canCheck ? <input type="checkbox" checked={checked} onChange={() => toggleRecCheck(key)} className="size-3 rounded mt-0.5" /> : <span />}
                        <span className="text-sage-700 font-medium truncate">{d.heroName}</span>
                        <span className="text-sage-700 truncate">{d.runeName}</span>
                        <span className="text-[10px] text-sage-500 line-clamp-2">{d.runeDesc || ""}</span>
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
