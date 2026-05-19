"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface Hero {
  id: string; name: string; attack_type: string; title: string; nicknames?: string;
}
interface Rune {
  id: string; name: string; tier: string; quality: string; description: string;
}
interface Playstyle {
  id: string; hero_id: string; name: string; description: string;
}
interface Rec {
  id: string; hero_id: string; rune_id: string; playstyle_id: string | null;
  phase: string | null; priority_score: number; reason: string;
  build_synergy: string; adjustment_tags: string[];
  runes?: Rune;
}
interface BuildCard {
  id: string; hero_id: string; playstyle_id: string;
  image_url: string; title: string; description: string;
}

interface HeroData {
  hero: Hero;
  playstyles: Playstyle[];
  recs: Rec[];
  cards: BuildCard[];
}

type TierFilter = "chromatic" | "gold" | "silver" | "all";

const TIER_TABS: { key: TierFilter; label: string; cls: string }[] = [
  { key: "chromatic", label: "彩色", cls: "bg-gradient-to-r from-purple-400 via-pink-400 to-gold-300 text-white" },
  { key: "gold", label: "金色", cls: "bg-gold-300 text-gold-700" },
  { key: "silver", label: "银色", cls: "bg-slate-300 text-slate-700" },
  { key: "all", label: "全部", cls: "bg-sage-200 text-sage-600" },
];

const tierLabel = (t: string) => {
  switch (t) {
    case "chromatic": return { text: "彩色", cls: "bg-gradient-to-r from-purple-400 via-pink-400 to-gold-300 text-white" };
    case "gold": return { text: "金色", cls: "bg-gold-300 text-gold-700" };
    case "silver": return { text: "银色", cls: "bg-slate-300 text-slate-700" };
    default: return { text: t, cls: "bg-slate-200" };
  }
};

const attackBadge = (type: string) => {
  switch (type) {
    case "AP": return "bg-purple-200 text-purple-700";
    case "AD": return "bg-red-200 text-red-700";
    case "Tank": return "bg-blue-200 text-blue-700";
    case "Support": return "bg-green-200 text-green-700";
    default: return "bg-sage-200 text-sage-700";
  }
};

// 解析/构建出装JSON（存储在build_card.description中）
function parseItemBuild(bc: BuildCard | undefined): { text: string; items: string[]; alts: string[] } {
  if (!bc?.description) return { text: "", items: Array(6).fill(""), alts: Array(6).fill("") };
  try {
    const p = JSON.parse(bc.description);
    return {
      text: p.text || "",
      items: p.items || Array(6).fill(""),
      alts: p.alts || Array(6).fill(""),
    };
  } catch {
    return { text: bc.description, items: Array(6).fill(""), alts: Array(6).fill("") };
  }
}

export default function RecsTab({ adminKey }: { adminKey: string }) {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [allRunes, setAllRunes] = useState<Rune[]>([]);
  const [search, setSearch] = useState("");
  const [heroLimit, setHeroLimit] = useState(10);
  const [modalHero, setModalHero] = useState<Hero | null>(null);
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");

  const [expandedPsIds, setExpandedPsIds] = useState<Set<string>>(new Set());
  const [psName, setPsName] = useState("");
  const [psDesc, setPsDesc] = useState("");
  const [showNewPs, setShowNewPs] = useState(false);

  const [runeTierFilter, setRuneTierFilter] = useState<TierFilter>("chromatic");
  const [runeSearch, setRuneSearch] = useState("");

  // 符文编辑弹窗
  const [editingRec, setEditingRec] = useState<Rec | null>(null);
  const [recPriority, setRecPriority] = useState(50);
  const [recReason, setRecReason] = useState("");
  const [recBuildSynergy, setRecBuildSynergy] = useState("");

  // 图文卡编辑
  const [bcTitles, setBcTitles] = useState<Record<string, string>>({});
  const [bcDescs, setBcDescs] = useState<Record<string, string>>({});
  const [bcUrls, setBcUrls] = useState<Record<string, string>>({});
  const [bcUploading, setBcUploading] = useState<Record<string, boolean>>({});
  const [bcUploadError, setBcUploadError] = useState<Record<string, string>>({});

  // 出装编辑 (per playstyle)
  const [buildItems, setBuildItems] = useState<Record<string, string[]>>({});
  const [buildAlts, setBuildAlts] = useState<Record<string, string[]>>({});

  const h = { "Content-Type": "application/json", "X-Admin-Key": adminKey };

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/heroes", { headers: h }).then(r => r.json()),
      fetch("/api/admin/runes?active=true", { headers: h }).then(r => r.json()),
    ]).then(([hData, rData]) => {
      if (Array.isArray(hData)) setHeroes(hData);
      if (Array.isArray(rData)) setAllRunes(rData);
      setLoading(false);
    });
  }, [adminKey]);

  const loadHero = useCallback(async (heroId: string) => {
    setDetailLoading(true);
    setDetailError("");
    try {
      const [psRes, recRes, bcRes] = await Promise.all([
        fetch(`/api/admin/playstyles?heroId=${heroId}`, { headers: h }).then(r => r.json()),
        fetch(`/api/admin/recommendations?heroId=${heroId}&phase=all`, { headers: h }).then(r => r.json()),
        fetch(`/api/admin/build-cards?heroId=${heroId}`, { headers: h }).then(r => r.json()),
      ]);
      const hero = heroes.find(h => h.id === heroId) || null;
      const cards = Array.isArray(bcRes) ? bcRes : [];
      const titles: Record<string, string> = {};
      const descs: Record<string, string> = {};
      const urls: Record<string, string> = {};
      const items: Record<string, string[]> = {};
      const alts: Record<string, string[]> = {};
      for (const c of cards) {
        titles[c.playstyle_id] = c.title || "";
        urls[c.playstyle_id] = c.image_url || "";
        const ib = parseItemBuild(c);
        descs[c.playstyle_id] = ib.text;
        items[c.playstyle_id] = ib.items;
        alts[c.playstyle_id] = ib.alts;
      }
      setBcTitles(titles);
      setBcDescs(descs);
      setBcUrls(urls);
      setBuildItems(items);
      setBuildAlts(alts);
      setHeroData({
        hero: hero!,
        playstyles: Array.isArray(psRes) ? psRes : [],
        recs: Array.isArray(recRes) ? recRes : [],
        cards,
      });
    } catch {
      setDetailError("加载失败，请重试");
      setHeroData(null);
    }
    setDetailLoading(false);
  }, [adminKey, heroes]);

  const openModal = async (hero: Hero) => {
    setModalHero(hero);
    setExpandedPsIds(new Set());
    setEditingRec(null);
    setShowNewPs(false);
    await loadHero(hero.id);
  };

  const closeModal = () => {
    setModalHero(null);
    setHeroData(null);
  };

  const togglePs = (psId: string) => {
    setExpandedPsIds(prev => {
      const next = new Set(prev);
      if (next.has(psId)) next.delete(psId); else next.add(psId);
      return next;
    });
    setEditingRec(null);
  };

  // === 流派 ===
  const [psSaveMsg, setPsSaveMsg] = useState("");

  const savePlaystyle = async () => {
    if (!psName.trim() || !modalHero) return;
    const res = await fetch("/api/admin/playstyles", {
      method: "POST", headers: h,
      body: JSON.stringify({ hero_id: modalHero.id, name: psName, description: psDesc }),
    });
    if (res.ok) {
      setShowNewPs(false); setPsName(""); setPsDesc("");
      setPsSaveMsg("流派已创建");
      setTimeout(() => setPsSaveMsg(""), 2000);
      loadHero(modalHero.id);
    }
  };

  const updatePlaystyle = async (ps: Playstyle) => {
    if (!ps.name.trim()) return;
    const res = await fetch(`/api/admin/playstyles/${ps.id}`, {
      method: "PUT", headers: h,
      body: JSON.stringify({ name: ps.name, description: ps.description }),
    });
    if (res.ok) {
      setPsSaveMsg("已保存");
      setTimeout(() => setPsSaveMsg(""), 1500);
    }
  };

  const deletePlaystyle = async (id: string) => {
    if (!confirm("删除该流派会同时删除关联的推荐配置和图文卡，确定？")) return;
    // 乐观：立即从本地状态移除
    if (heroData) {
      setHeroData({
        ...heroData,
        playstyles: heroData.playstyles.filter(p => p.id !== id),
        recs: heroData.recs.filter(r => r.playstyle_id !== id),
        cards: heroData.cards.filter(c => c.playstyle_id !== id),
      });
    }
    fetch(`/api/admin/playstyles/${id}`, { method: "DELETE", headers: h }).catch(() => {
      if (modalHero) loadHero(modalHero.id); // 失败则回滚
    });
  };

  // === 符文：乐观更新 ===
  const addRec = async (runeId: string, psId: string) => {
    if (!modalHero || !heroData) return;
    const rune = allRunes.find(r => r.id === runeId);
    if (!rune) return;
    // 乐观：构造临时记录立即追加
    const tempRec: Rec = {
      id: "temp-" + Math.random().toString(36).slice(2),
      hero_id: modalHero.id, rune_id: runeId, playstyle_id: psId,
      phase: null, priority_score: 50, reason: "", build_synergy: "", adjustment_tags: [],
      runes: rune,
    };
    setHeroData({ ...heroData, recs: [...heroData.recs, tempRec] });
    // 发送请求，拿到真实ID后替换
    try {
      const res = await fetch("/api/admin/recommendations", {
        method: "POST", headers: h,
        body: JSON.stringify({
          hero_id: modalHero.id, rune_id: runeId, playstyle_id: psId,
          phase: null, priority_score: 50, reason: "", build_synergy: "", adjustment_tags: [],
        }),
      });
      const newRec = await res.json();
      if (newRec?.id) {
        setHeroData(prev => prev ? {
          ...prev,
          recs: prev.recs.map(r => r.id === tempRec.id ? { ...r, id: newRec.id, runes: rune } : r),
        } : prev);
      }
    } catch {
      // 失败则移除临时记录
      setHeroData(prev => prev ? { ...prev, recs: prev.recs.filter(r => r.id !== tempRec.id) } : prev);
    }
  };

  const quickScore = async (rec: Rec, delta: number) => {
    const ns = Math.max(0, Math.min(100, rec.priority_score + delta));
    // 乐观：立即更新本地
    if (heroData) {
      setHeroData({
        ...heroData,
        recs: heroData.recs.map(r => r.id === rec.id ? { ...r, priority_score: ns } : r),
      });
    }
    fetch(`/api/admin/recommendations/${rec.id}`, {
      method: "PUT", headers: h,
      body: JSON.stringify({ priority_score: ns }),
    }).catch(() => {
      if (modalHero) loadHero(modalHero.id);
    });
  };

  const updateRecDetail = async () => {
    if (!editingRec || !heroData) return;
    const updatedRecs = heroData.recs.map(r =>
      r.id === editingRec.id ? { ...r, priority_score: recPriority, reason: recReason, build_synergy: recBuildSynergy } : r
    );
    setHeroData({ ...heroData, recs: updatedRecs });
    setEditingRec(null);
    fetch(`/api/admin/recommendations/${editingRec.id}`, {
      method: "PUT", headers: h,
      body: JSON.stringify({ priority_score: recPriority, reason: recReason, build_synergy: recBuildSynergy }),
    }).catch(() => {
      if (modalHero) loadHero(modalHero.id);
    });
  };

  const deleteRec = async (recId: string) => {
    if (heroData) {
      setHeroData({ ...heroData, recs: heroData.recs.filter(r => r.id !== recId) });
    }
    fetch(`/api/admin/recommendations/${recId}`, { method: "DELETE", headers: h }).catch(() => {
      if (modalHero) loadHero(modalHero.id);
    });
  };

  // === 图文卡 ===
  const uploadBcImage = async (psId: string, file: File) => {
    setBcUploading(prev => ({ ...prev, [psId]: true }));
    setBcUploadError(prev => { const next = { ...prev }; delete next[psId]; return next; });
    try {
      const fd = new FormData(); fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", headers: { "X-Admin-Key": adminKey }, body: fd });
      const d = await res.json();
      if (d.url) {
        setBcUrls(prev => ({ ...prev, [psId]: d.url }));
      } else {
        setBcUploadError(prev => ({ ...prev, [psId]: d.error || "图片上传失败" }));
      }
    } catch {
      setBcUploadError(prev => ({ ...prev, [psId]: "网络错误，请重试" }));
    }
    setBcUploading(prev => ({ ...prev, [psId]: false }));
  };

  const [bcSaveMsg, setBcSaveMsg] = useState("");

  const deleteBuildCard = async (cardId: string, psId: string) => {
    if (!heroData) return;
    setHeroData({ ...heroData, cards: heroData.cards.filter(c => c.id !== cardId) });
    setBcTitles(prev => { const next = { ...prev }; delete next[psId]; return next; });
    setBcDescs(prev => { const next = { ...prev }; delete next[psId]; return next; });
    setBcUrls(prev => { const next = { ...prev }; delete next[psId]; return next; });
    setBuildItems(prev => { const next = { ...prev }; delete next[psId]; return next; });
    setBuildAlts(prev => { const next = { ...prev }; delete next[psId]; return next; });
    fetch(`/api/admin/build-cards/${cardId}`, { method: "DELETE", headers: h }).catch(() => {
      if (modalHero) loadHero(modalHero.id);
    });
  };

  const saveBuildCard = async (psId: string) => {
    if (!modalHero || !heroData) return;
    const hasContent = bcUrls[psId] || bcTitles[psId] || bcDescs[psId] ||
      (buildItems[psId] || []).some(Boolean) || (buildAlts[psId] || []).some(Boolean);
    if (!hasContent) return;

    const descObj = JSON.stringify({
      text: bcDescs[psId] || "",
      items: buildItems[psId] || Array(6).fill(""),
      alts: buildAlts[psId] || Array(6).fill(""),
    });
    const existingIdx = heroData.cards.findIndex(c => c.playstyle_id === psId);
    const existingId = existingIdx >= 0 ? heroData.cards[existingIdx].id : undefined;
    const body: Record<string, unknown> = {
      hero_id: modalHero.id, playstyle_id: psId,
      image_url: bcUrls[psId] || "",
      title: bcTitles[psId] || "",
      description: descObj,
    };
    if (existingId) body.id = existingId;
    const updatedCard: BuildCard = {
      id: heroData.cards[existingIdx]?.id || "temp-bc-" + psId,
      hero_id: modalHero.id, playstyle_id: psId,
      image_url: bcUrls[psId] || "",
      title: bcTitles[psId] || "",
      description: descObj,
    };
    const newCards = existingIdx >= 0
      ? heroData.cards.map((c, i) => i === existingIdx ? updatedCard : c)
      : [...heroData.cards, updatedCard];
    setHeroData({ ...heroData, cards: newCards });
    const res = await fetch("/api/admin/build-cards", { method: "POST", headers: h, body: JSON.stringify(body) });
    if (res.ok) {
      setBcSaveMsg("图文卡已保存");
      setTimeout(() => setBcSaveMsg(""), 2000);
    }
    if (!res.ok) { if (modalHero) loadHero(modalHero.id); }
  };

  // === 筛选 ===
  const filteredHeroes = heroes
    .filter(h => {
      if (!search) return true;
      const q = search.toLowerCase();
      return h.name.includes(search) ||
        (h.title && h.title.includes(search)) ||
        (h.attack_type && h.attack_type.toLowerCase().includes(q)) ||
        (h.nicknames && h.nicknames.includes(search));
    })
    .sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));

  if (loading) return <p className="text-[13px] text-sage-400">加载中...</p>;

  return (
    <div>
      <input
        placeholder="搜索英雄..."
        value={search}
        onChange={e => { setSearch(e.target.value); setHeroLimit(10); }}
        className="w-full px-3 py-2 rounded-xl border border-sage-200 text-[13px] text-sage-700 placeholder-sage-400 bg-white/50 mb-3 focus:outline-none focus:border-gold-400"
      />

      {/* 英雄卡片网格 */}
      <div className="grid grid-cols-2 gap-2">
        {filteredHeroes.slice(0, heroLimit).map(hero => (
          <button key={hero.id}
            onClick={() => openModal(hero)}
            className="text-left bg-white/40 hover:bg-white/70 rounded-xl p-3 transition-all active:scale-[0.98] border-2 border-transparent hover:border-gold-300/50"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[14px] font-semibold text-sage-700">{hero.name}</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${attackBadge(hero.attack_type)}`}>{hero.attack_type}</span>
            </div>
            <p className="text-[11px] text-sage-400 truncate">{hero.title?.split("—")[0]}</p>
            {hero.nicknames && <p className="text-[10px] text-sage-300 truncate">{hero.nicknames}</p>}
          </button>
        ))}
      </div>
      {filteredHeroes.length > heroLimit && (
        <button
          onClick={() => setHeroLimit(prev => prev + 20)}
          className="w-full mt-3 py-2.5 rounded-xl bg-white/50 text-sage-600 text-[13px] font-medium hover:bg-white/80 active:scale-[0.98] transition-all"
        >
          显示更多（剩余 {filteredHeroes.length - heroLimit} 个英雄）
        </button>
      )}

      {/* ============ 弹窗：英雄配置（Portal 到 body 避免 backdrop-filter containing block） ============ */}
      {createPortal(
        <AnimatePresence>
          {modalHero && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
            >
              <motion.div
                className="bg-cream-100 w-full max-w-3xl min-h-[60vh] max-h-[85vh] flex flex-col rounded-2xl shadow-2xl border border-sage-200 overflow-hidden"
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
                onClick={e => e.stopPropagation()}
              >
              {/* 弹窗头部 */}
              <div className="flex-shrink-0 z-10 bg-cream-100/95 backdrop-blur-sm flex items-center justify-between px-5 py-3 border-b border-sage-100">
                <div className="flex items-center gap-3">
                  <div>
                    <h2 className="text-[16px] font-bold text-sage-700">{modalHero.name}</h2>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${attackBadge(modalHero.attack_type)}`}>
                      {modalHero.attack_type}
                    </span>
                  </div>
                  {(psSaveMsg || bcSaveMsg) && (
                    <span className="text-[11px] px-2.5 py-1 rounded-full bg-gold-100 text-gold-600 font-medium animate-pulse">
                      {psSaveMsg || bcSaveMsg}
                    </span>
                  )}
                </div>
                <button onClick={closeModal}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100 text-[13px] font-medium transition-colors active:scale-95">
                  关闭 ✕
                </button>
              </div>

              {/* 弹窗内容 */}
              <div className="p-5 space-y-3 overflow-y-auto flex-1 min-h-0">
                {detailLoading ? (
                  <div className="flex items-center justify-center py-20">
                    <p className="text-[14px] text-sage-400">加载中...</p>
                  </div>
                ) : detailError ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-3">
                    <p className="text-[14px] text-rose-500">{detailError}</p>
                    <button onClick={() => modalHero && loadHero(modalHero.id)}
                      className="text-[13px] px-4 py-2 rounded-lg bg-sage-100 text-sage-600 font-medium hover:bg-sage-200 transition-colors">
                      重试
                    </button>
                  </div>
                ) : heroData ? (
                  <>
                    {heroData.playstyles.map(ps => {
                      const isExpanded = expandedPsIds.has(ps.id);
                      const psRecs = heroData.recs.filter(r => r.playstyle_id === ps.id);
                      const countByTier = { chromatic: 0, gold: 0, silver: 0 };
                      psRecs.forEach(r => {
                        const t = r.runes?.tier;
                        if (t === "chromatic" || t === "gold" || t === "silver") countByTier[t]++;
                      });
                      const bc = heroData.cards.find(c => c.playstyle_id === ps.id);

                      return (
                        <div key={ps.id} className="rounded-xl border border-sage-100 bg-white/70">
                          {/* 流派头部 — 吸顶，滚动时不消失 */}
                          <div
                            className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-sage-50/50 transition-colors sticky top-0 z-10 bg-white/95 backdrop-blur-sm"
                            onClick={() => togglePs(ps.id)}
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-[14px] font-semibold text-sage-700">{ps.name}</span>
                                <span className={`text-[14px] transition-transform text-sage-400 ${isExpanded ? "rotate-90" : ""}`}>›</span>
                                {bc?.image_url && <span className="text-[12px]">🃏</span>}
                              </div>
                              <div className="flex gap-2 mt-0.5">
                                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-600">彩{countByTier.chromatic}</span>
                                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-gold-200 text-gold-700">金{countByTier.gold}</span>
                                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-600">银{countByTier.silver}</span>
                              </div>
                            </div>
                            <button onClick={(e) => { e.stopPropagation(); deletePlaystyle(ps.id); }}
                              className="text-[10px] px-2.5 py-1 rounded-lg bg-rose-50 text-rose-400 hover:bg-rose-100 flex-shrink-0 ml-2">
                              删除流派
                            </button>
                          </div>

                          {/* ============ 四项内容 ============ */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-4 border-t border-sage-100 space-y-4 pt-3">
                                  {/* ====== 一、流派信息 ====== */}
                                  <section>
                                    <h4 className="text-[11px] font-semibold text-sage-500 mb-2">流派信息</h4>
                                    <input
                                      placeholder="流派名称"
                                      value={ps.name}
                                      onChange={e => {
                                        const updated = heroData.playstyles.map(p => p.id === ps.id ? { ...p, name: e.target.value } : p);
                                        setHeroData({ ...heroData, playstyles: updated });
                                      }}
                                      onBlur={() => updatePlaystyle(ps)}
                                      className="w-full px-3 py-2 rounded-lg border border-sage-200 bg-white/80 text-[13px] text-sage-700 focus:outline-none focus:border-gold-400"
                                    />
                                    <textarea
                                      placeholder="玩法说明..."
                                      value={ps.description}
                                      onChange={e => {
                                        const updated = heroData.playstyles.map(p => p.id === ps.id ? { ...p, description: e.target.value } : p);
                                        setHeroData({ ...heroData, playstyles: updated });
                                      }}
                                      onBlur={() => updatePlaystyle(ps)}
                                      rows={2}
                                      className="w-full mt-2 px-3 py-2 rounded-lg border border-sage-200 bg-white/80 text-[12px] text-sage-700 focus:outline-none focus:border-gold-400 resize-none"
                                    />
                                  </section>

                                  {/* ====== 二、图文推荐卡 ====== */}
                                  <section>
                                    <h4 className="text-[11px] font-semibold text-sage-500 mb-2">🃏 图文推荐卡</h4>
                                    <div className="flex gap-3">
                                      <div className="flex-shrink-0 w-24 h-24 rounded-xl border-2 border-dashed border-sage-200 bg-sage-50/50 flex items-center justify-center overflow-hidden relative group">
                                        {bcUploading[ps.id] ? (
                                          <span className="text-[11px] text-sage-400">上传中...</span>
                                        ) : bcUrls[ps.id] || bc?.image_url ? (
                                          <img src={bcUrls[ps.id] || bc?.image_url} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                          <span className="text-[24px] text-sage-300">🃏</span>
                                        )}
                                        {!bcUploading[ps.id] && (
                                          <label className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center cursor-pointer">
                                            <span className="text-white text-[11px] opacity-0 group-hover:opacity-100 transition-opacity font-medium">更换</span>
                                            <input type="file" accept="image/*" className="hidden"
                                              onChange={e => { const f = e.target.files?.[0]; if (f) uploadBcImage(ps.id, f); }} />
                                          </label>
                                        )}
                                        {bc && (
                                          <button
                                            onClick={(e) => { e.stopPropagation(); deleteBuildCard(bc.id, ps.id); }}
                                            className="absolute top-1 right-1 w-5 h-5 rounded-full bg-rose-400/80 text-white text-[11px] flex items-center justify-center hover:bg-rose-600 transition-colors z-10 opacity-0 group-hover:opacity-100"
                                          >
                                            ×
                                          </button>
                                        )}
                                      </div>
                                      <div className="flex-1 space-y-2">
                                        <input
                                          placeholder="图文卡标题"
                                          value={bcTitles[ps.id] ?? bc?.title ?? ""}
                                          onChange={e => setBcTitles(prev => ({ ...prev, [ps.id]: e.target.value }))}
                                          className="w-full px-3 py-1.5 rounded-lg border border-sage-200 bg-white/80 text-[12px] text-sage-700 focus:outline-none focus:border-gold-400"
                                        />
                                        {bcUploadError[ps.id] && (
                                          <p className="text-[10px] text-rose-500">{bcUploadError[ps.id]}</p>
                                        )}
                                      </div>
                                    </div>
                                  </section>

                                  {/* ====== 三、符文推荐 ====== */}
                                  <section>
                                    <h4 className="text-[11px] font-semibold text-sage-500 mb-2">符文推荐</h4>
                                    <div className="grid grid-cols-3 gap-2 mb-2">
                                      {(["chromatic", "gold", "silver"] as const).map(tier => {
                                        const tl = tierLabel(tier);
                                        const tierRecs = psRecs.filter(r => r.runes?.tier === tier);
                                        return (
                                          <div key={tier} className="bg-sage-50/60 rounded-lg p-2">
                                            <p className={`text-[10px] font-bold text-center mb-1.5 px-2 py-0.5 rounded-full ${tl.cls}`}>
                                              {tl.text} · {tierRecs.length}
                                            </p>
                                            <div className="space-y-1">
                                              {tierRecs.map(rec => (
                                                <div key={rec.id} className="bg-white rounded-lg px-2 py-1.5 text-[11px]">
                                                  <div className="flex items-center justify-between">
                                                    <span className="font-medium text-sage-700 truncate">{rec.runes?.name}</span>
                                                    <button onClick={() => deleteRec(rec.id)}
                                                      className="text-[10px] text-rose-400 hover:text-rose-600 flex-shrink-0 ml-1">×</button>
                                                  </div>
                                                  <div className="flex items-center gap-1.5 mt-1">
                                                    {/* 快速打分 */}
                                                    <button onClick={() => quickScore(rec, -5)}
                                                      className="text-[10px] w-5 h-5 rounded-full bg-sage-100 text-sage-500 hover:bg-sage-200 flex items-center justify-center font-bold leading-none">−</button>
                                                    <span className="text-[10px] text-gold-600 font-medium min-w-[2rem] text-center">{rec.priority_score}</span>
                                                    <button onClick={() => quickScore(rec, 5)}
                                                      className="text-[10px] w-5 h-5 rounded-full bg-sage-100 text-sage-500 hover:bg-sage-200 flex items-center justify-center font-bold leading-none">+</button>
                                                    {/* 详情编辑 */}
                                                    <button onClick={() => {
                                                      setEditingRec(rec);
                                                      setRecPriority(rec.priority_score);
                                                      setRecReason(rec.reason);
                                                      setRecBuildSynergy(rec.build_synergy || "");
                                                    }}
                                                      className={`text-[9px] ml-auto px-1.5 py-0.5 rounded ${editingRec?.id === rec.id ? "bg-gold-200 text-gold-700" : "bg-sage-100 text-sage-500"}`}>
                                                      详情
                                                    </button>
                                                  </div>
                                                  {rec.reason && <p className="text-[9px] text-sage-400 truncate mt-0.5">{rec.reason}</p>}
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>

                                    {/* 符文详情编辑 */}
                                    <AnimatePresence>
                                      {editingRec && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: "auto", opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          className="overflow-hidden mb-2"
                                        >
                                          <div className="bg-gold-50/80 rounded-lg p-3 border border-gold-200 space-y-2">
                                            <p className="text-[11px] font-semibold text-gold-700">编辑「{editingRec.runes?.name}」</p>
                                            <div className="flex gap-3">
                                              <div className="w-20">
                                                <label className="text-[10px] text-sage-500">优先级</label>
                                                <input type="number" min={0} max={100} value={recPriority}
                                                  onChange={e => setRecPriority(Number(e.target.value) || 50)}
                                                  className="w-full px-2 py-1 rounded border border-sage-200 text-[12px]" />
                                              </div>
                                              <div className="flex-1">
                                                <label className="text-[10px] text-sage-500">推荐理由</label>
                                                <input value={recReason} onChange={e => setRecReason(e.target.value)}
                                                  className="w-full px-2 py-1 rounded border border-sage-200 text-[12px]" />
                                              </div>
                                            </div>
                                            <div>
                                              <label className="text-[10px] text-sage-500">推荐出装路线</label>
                                              <input value={recBuildSynergy} onChange={e => setRecBuildSynergy(e.target.value)}
                                                placeholder="例如：先出狂妄，后补黑切..."
                                                className="w-full px-2 py-1 rounded border border-sage-200 text-[12px]" />
                                            </div>
                                            <div className="flex gap-2">
                                              <button onClick={updateRecDetail} className="text-[11px] px-3 py-1.5 bg-gold-300 text-gold-700 rounded-lg font-medium">保存</button>
                                              <button onClick={() => setEditingRec(null)} className="text-[11px] px-3 py-1.5 bg-sage-100 text-sage-500 rounded-lg">取消</button>
                                            </div>
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>

                                    {/* 添加符文 */}
                                    <div className="bg-sage-50/50 rounded-lg p-2.5">
                                      <p className="text-[10px] font-medium text-sage-500 mb-1.5">添加符文</p>
                                      <div className="flex gap-1 mb-2">
                                        {TIER_TABS.map(t => (
                                          <button key={t.key} onClick={() => setRuneTierFilter(t.key)}
                                            className={`text-[10px] px-2 py-0.5 rounded-full font-medium transition-all ${
                                              runeTierFilter === t.key ? t.cls + " shadow-sm" : "bg-white/60 text-sage-500"
                                            }`}>{t.label}</button>
                                        ))}
                                      </div>
                                      <input
                                        placeholder="搜索符文..."
                                        value={runeSearch}
                                        onChange={e => setRuneSearch(e.target.value)}
                                        className="w-full px-2.5 py-1.5 rounded-lg border border-sage-200 bg-white/80 text-[11px] mb-2 focus:outline-none focus:border-gold-400"
                                      />
                                      {(() => {
                                        const existingIds = new Set(psRecs.map(r => r.rune_id));
                                        const pool = allRunes.filter(r => {
                                          if (runeTierFilter !== "all" && r.tier !== runeTierFilter) return false;
                                          if (runeSearch && !r.name.includes(runeSearch)) return false;
                                          return true;
                                        });
                                        if (pool.length === 0) return <p className="text-[10px] text-sage-400 py-1">无匹配符文</p>;
                                        return (
                                          <div className="flex flex-wrap gap-1.5">
                                            {pool.map(rune => {
                                              const added = existingIds.has(rune.id);
                                              return (
                                                <button key={rune.id} onClick={() => { if (!added) addRec(rune.id, ps.id); }} disabled={added}
                                                  className={`text-[11px] px-2.5 py-1 rounded-lg font-medium transition-all ${
                                                    added ? "bg-sage-100 text-sage-400 cursor-not-allowed opacity-50"
                                                    : "bg-white border border-sage-200 text-sage-700 hover:border-gold-400 hover:bg-gold-50 active:scale-95"
                                                  }`} title={rune.description}>
                                                  {rune.name}
                                                </button>
                                              );
                                            })}
                                          </div>
                                        );
                                      })()}
                                    </div>
                                  </section>

                                  {/* ====== 四、出装推荐（流派级别） ====== */}
                                  <section>
                                    <h4 className="text-[11px] font-semibold text-sage-500 mb-2">出装推荐</h4>
                                    <div>
                                      <label className="text-[10px] text-sage-500">主出装 (6件)</label>
                                      <div className="grid grid-cols-6 gap-1 mt-1">
                                        {[0,1,2,3,4,5].map(i => (
                                          <input key={`main-${i}`} placeholder={`${i+1}`}
                                            value={buildItems[ps.id]?.[i] || ""}
                                            onChange={e => {
                                              const a = [...(buildItems[ps.id] || Array(6).fill(""))];
                                              a[i] = e.target.value;
                                              setBuildItems(prev => ({ ...prev, [ps.id]: a }));
                                            }}
                                            className="px-1.5 py-1.5 rounded-lg border border-sage-200 bg-white/80 text-[11px] text-sage-700 focus:outline-none focus:border-gold-400 text-center"
                                          />
                                        ))}
                                      </div>
                                    </div>
                                    <div className="mt-2">
                                      <label className="text-[10px] text-sage-500">替换出装 (6件)</label>
                                      <div className="grid grid-cols-6 gap-1 mt-1">
                                        {[0,1,2,3,4,5].map(i => (
                                          <input key={`alt-${i}`} placeholder={`替${i+1}`}
                                            value={buildAlts[ps.id]?.[i] || ""}
                                            onChange={e => {
                                              const a = [...(buildAlts[ps.id] || Array(6).fill(""))];
                                              a[i] = e.target.value;
                                              setBuildAlts(prev => ({ ...prev, [ps.id]: a }));
                                            }}
                                            className="px-1.5 py-1.5 rounded-lg border border-sage-200 bg-white/80 text-[11px] text-sage-700 focus:outline-none focus:border-gold-400 text-center"
                                          />
                                        ))}
                                      </div>
                                    </div>
                                  </section>

                                  {/* 统一保存 + 收起 */}
                                  <div className="flex gap-2 pt-2 border-t border-sage-100">
                                    <button
                                      onClick={async () => {
                                        await saveBuildCard(ps.id);
                                        updatePlaystyle(ps);
                                        togglePs(ps.id);
                                      }}
                                      className="flex-1 text-[12px] py-2 rounded-lg bg-gold-300 text-gold-700 font-medium hover:bg-gold-400 transition-colors active:scale-95"
                                    >
                                      保存全部
                                    </button>
                                    <button
                                      onClick={() => togglePs(ps.id)}
                                      className="flex-1 text-[12px] py-2 rounded-lg bg-sage-100 text-sage-500 hover:bg-sage-200 font-medium transition-colors"
                                    >
                                      收起 ▲
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}

                    {heroData.playstyles.length === 0 && (
                      <p className="text-[12px] text-sage-400 text-center py-3">暂无流派，请先创建一个</p>
                    )}

                    {/* 新建流派 */}
                    {!showNewPs ? (
                      <button onClick={() => { setShowNewPs(true); setPsName(""); setPsDesc(""); }}
                        className="text-[12px] px-4 py-2 rounded-xl bg-gold-100 text-gold-600 font-medium hover:bg-gold-200 transition-colors w-full">
                        + 新建流派
                      </button>
                    ) : (
                      <div className="bg-sage-50/80 rounded-xl p-3 space-y-2">
                        <input placeholder="流派名称" value={psName} onChange={e => setPsName(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-sage-200 bg-white/80 text-[13px] focus:outline-none focus:border-gold-400" />
                        <textarea placeholder="流派描述" value={psDesc} onChange={e => setPsDesc(e.target.value)} rows={2}
                          className="w-full px-3 py-2 rounded-lg border border-sage-200 bg-white/80 text-[12px] focus:outline-none focus:border-gold-400 resize-none" />
                        <div className="flex gap-2">
                          <button onClick={savePlaystyle} className="text-[12px] px-4 py-2 rounded-lg bg-gold-300 text-gold-700 font-medium">创建</button>
                          <button onClick={() => setShowNewPs(false)} className="text-[12px] px-4 py-2 rounded-lg bg-sage-100 text-sage-500">取消</button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-center py-20">
                    <p className="text-[14px] text-sage-400">暂无数据</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    , document.body)}
    </div>
  );
}
