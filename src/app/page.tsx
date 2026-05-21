"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { flushSync } from "react-dom";
import type { Hero, RuneTier, RecommendationResult, Playstyle, Rune } from "@/types";
import { TIER_FILTERS } from "@/types";
import HeroSelector from "@/app/components/HeroSelector";
import HeroInfo from "@/app/components/HeroInfo";
import PlaystyleSelector from "@/app/components/PlaystyleSelector";
import RuneCard from "@/app/components/RuneCard";
import RuneQuickSearch from "@/app/components/RuneQuickSearch";
import ExclusionBar from "@/app/components/ExclusionBar";
import BuildCard from "@/app/components/BuildCard";
import {
  loadExcludedRunes,
  clearExcludedRunes,
  markRuneSelected,
  markRuneSeen,
  unmarkRune,
  getAllExcludedIds,
  getExcludedCount,
  getSelectedEntries,
} from "@/lib/exclusions";

export default function HomePage() {
  // Hero state
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [heroesLoading, setHeroesLoading] = useState(true);
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);

  // Playstyle state
  const [playstyles, setPlaystyles] = useState<Playstyle[]>([]);
  const [playstylesLoading, setPlaystylesLoading] = useState(false);
  const [selectedPlaystyle, setSelectedPlaystyle] = useState<Playstyle | null>(null);

  // Tier filter
  const [tierFilter, setTierFilter] = useState<RuneTier | "all">("all");

  // Pagination: show 15 initially, "show more" to load all
  const [displayLimit, setDisplayLimit] = useState(15);

  // Recommendations
  const [recs, setRecs] = useState<RecommendationResult[]>([]);
  const [recsLoading, setRecsLoading] = useState(false);

  // All runes (fetched once when hero selected)
  const [allRunes, setAllRunes] = useState<Rune[]>([]);

  // Fetter data (runeId → fetter names)
  const [runeFetterMap, setRuneFetterMap] = useState<Map<string, string[]>>(new Map());

  // 全量卡牌预加载（heroId → playstyleId → 卡牌+出装数据）
  const [buildCardsMap, setBuildCardsMap] = useState<Map<string, Map<string, {
    image_url: string; title?: string; description?: string;
    items: string[]; alts: string[];
  }>>>(new Map());

  // Card modal state
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [triggerPos, setTriggerPos] = useState<{ x: number; y: number } | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Excluded runes
  const [excluded, setExcluded] = useState(loadExcludedRunes());

  // 启动时拉取英雄列表
  useEffect(() => {
    fetch("/api/heroes")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setHeroes(data);
      })
      .catch(() => {})
      .finally(() => setHeroesLoading(false));
  }, []);

  // 选英雄后按需拉取该英雄的卡牌（与流派并行加载，不阻塞首屏）
  useEffect(() => {
    if (!selectedHero) return;
    fetch(`/api/build-cards?heroId=${selectedHero.id}`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBuildCardsMap((prev) => {
            const next = new Map(prev);
            const heroMap = new Map<string, { image_url: string; title?: string; description?: string; items: string[]; alts: string[] }>();
            for (const c of data) {
              let desc = c.description || "";
              let items: string[] = Array(6).fill("");
              let alts: string[] = Array(6).fill("");
              try {
                const parsed = JSON.parse(c.description);
                desc = parsed.text || "";
                items = parsed.items || Array(6).fill("");
                alts = parsed.alts || Array(6).fill("");
              } catch {}
              heroMap.set(c.playstyle_id, {
                image_url: c.image_url,
                title: c.title,
                description: desc,
                items,
                alts,
              });
            }
            next.set(selectedHero.id, heroMap);
            return next;
          });
        }
      })
      .catch(() => {});
  }, [selectedHero]);

  // Fetch playstyles when hero changes
  useEffect(() => {
    if (!selectedHero) {
      setPlaystyles([]);
      setSelectedPlaystyle(null);
      return;
    }
    setPlaystylesLoading(true);
    fetch(`/api/playstyles?heroId=${selectedHero.id}`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPlaystyles(data);
        }
      })
      .catch(() => {})
      .finally(() => setPlaystylesLoading(false));
  }, [selectedHero]);

  // Fetch all runes and fetters when hero is selected
  useEffect(() => {
    if (!selectedHero) {
      setAllRunes([]);
      setRuneFetterMap(new Map());
      return;
    }
    Promise.all([
      fetch("/api/runes").then(r => r.json()),
      fetch("/api/fetters").then(r => r.json()),
    ]).then(([runeData, fetterData]) => {
      if (Array.isArray(runeData)) setAllRunes(runeData);
      if (Array.isArray(fetterData)) {
        const map = new Map<string, string[]>();
        for (const f of fetterData) {
          if (f.rune_fetters) {
            for (const rf of f.rune_fetters) {
              const existing = map.get(rf.rune_id) || [];
              existing.push(f.name);
              map.set(rf.rune_id, existing);
            }
          }
        }
        setRuneFetterMap(map);
      }
    }).catch(() => {});
  }, [selectedHero]);

  // Fetch recommendations when hero/playstyle/tags change
  useEffect(() => {
    if (!selectedHero) {
      setRecs([]);
      return;
    }
    if (playstylesLoading) return;

    setRecsLoading(true);
    const params = new URLSearchParams({
      heroId: selectedHero.id,
    });
    if (selectedPlaystyle) {
      params.set("playstyleId", selectedPlaystyle.id);
    }

    const excludedIds = getAllExcludedIds();
    if (excludedIds.length > 0)
      params.set("selected", excludedIds.join(","));

    fetch(`/api/recommendations?${params}`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setRecs(data);
        setDisplayLimit(15); // reset pagination
      })
      .catch(() => {})
      .finally(() => setRecsLoading(false));
  }, [selectedHero, selectedPlaystyle, playstylesLoading]);

  // 流派变化时自动打开卡牌弹窗
  useEffect(() => {
    if (!selectedHero || !selectedPlaystyle) {
      setCardModalOpen(false);
      return;
    }
    const card = buildCardsMap.get(selectedHero.id)?.get(selectedPlaystyle.id);
    if (card) {
      setCardModalOpen(true);
    } else {
      setCardModalOpen(false);
    }
  }, [selectedPlaystyle?.id, selectedHero?.id, buildCardsMap]);

  // Merge recommendations with all runes
  const displayRunes = useMemo(() => {
    const excludedIds = new Set(getAllExcludedIds());
    const scored = [...recs];
    const scoredIds = new Set(scored.map((r) => r.rune.id));

    // Mark excluded runes
    const selectedIds = new Set(excluded.selected.map((s) => s.runeId));
    for (const r of scored) {
      if (excludedIds.has(r.rune.id) && !r.is_selected) {
        r.is_excluded = true;
        r.exclude_reason = selectedIds.has(r.rune.id)
          ? "selected"
          : "seen";
      }
    }

    // Append non-recommended runes (not in recs, not excluded)
    for (const rune of allRunes) {
      if (!scoredIds.has(rune.id) && !excludedIds.has(rune.id)) {
        scored.push({
          rune,
          priority_score: 0,
          adjusted_score: -1,
          reason: "",
          build_synergy: "",
          boost_reasons: [],
          is_top: false,
          is_selected: false,
        });
      }
    }

    // Sort: recommended first (by adjusted_score desc), then by name
    scored.sort((a, b) => {
      const aRec = a.priority_score > 0;
      const bRec = b.priority_score > 0;
      if (aRec && !bRec) return -1;
      if (!aRec && bRec) return 1;
      if (aRec && bRec) return b.adjusted_score - a.adjusted_score;
      return a.rune.name.localeCompare(b.rune.name, "zh-CN");
    });

    // Move excluded/selected to bottom
    const active = scored.filter((r) => !r.is_excluded && !r.is_selected);
    const disabled = scored.filter((r) => r.is_excluded || r.is_selected);

    return [...active, ...disabled];
  }, [recs, allRunes, excluded]);

  // Filter by tier
  const filteredRecs = useMemo(() => {
    if (tierFilter === "all") return displayRunes;
    return displayRunes.filter((r) => r.rune.tier === tierFilter);
  }, [displayRunes, tierFilter]);

  // Count remaining preferred runes (recommended, not excluded)
  const remainingCount = useMemo(() => {
    return filteredRecs.filter(
      (r) => r.priority_score > 0 && !r.is_excluded && !r.is_selected
    ).length;
  }, [filteredRecs]);

  // Handlers
  const handleHeroSelect = useCallback((hero: Hero) => {
    setSelectedHero(hero);
    clearExcludedRunes();
    setExcluded({ selected: [], seen: [] });
    setSelectedPlaystyle(null);
    setCardModalOpen(false);
  }, []);

  const handlePlaystyleSelect = useCallback((p: Playstyle) => {
    setSelectedPlaystyle(p);
  }, []);

  const handleCardClose = useCallback(() => {
    const el = triggerRef.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      flushSync(() => {
        setTriggerPos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      });
    }
    setCardModalOpen(false);
  }, []);

  const handleCardOpen = useCallback(() => {
    setTriggerPos(null);
    setCardModalOpen(true);
  }, []);

  const handleRuneSelect = useCallback((runeId: string) => {
    markRuneSelected(runeId, "3");
    setExcluded(loadExcludedRunes());
  }, []);

  const handleRuneSeen = useCallback((runeId: string) => {
    markRuneSeen(runeId);
    setExcluded(loadExcludedRunes());
  }, []);

  const handleRuneRemove = useCallback((runeId: string) => {
    unmarkRune(runeId);
    setExcluded(loadExcludedRunes());
  }, []);

  const handleReset = useCallback(() => {
    clearExcludedRunes();
    setExcluded({ selected: [], seen: [] });
    setTierFilter("all");
    setDisplayLimit(15);
  }, []);

  const excludedCount = getExcludedCount();
  const excludedIds = getAllExcludedIds();

  return (
    <main className="max-w-md mx-auto px-4 py-4 safe-bottom">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-[20px] font-bold text-sage-700">
          海克斯助手
        </h1>
        <p className="text-[12px] text-sage-500">
          大乱斗符文搭配推荐
        </p>
      </div>

      {/* Hero selector */}
      <HeroSelector
        heroes={heroes}
        selectedHero={selectedHero}
        onSelect={handleHeroSelect}
        loading={heroesLoading}
      />

      {/* Hero info */}
      {selectedHero && <HeroInfo hero={selectedHero} />}

      {/* Playstyle selector */}
      {selectedHero && (
        <PlaystyleSelector
          playstyles={playstyles}
          selected={selectedPlaystyle}
          onSelect={handlePlaystyleSelect}
          loading={playstylesLoading}
          recsLoading={recsLoading}
        />
      )}

      {/* 玩法说明 */}
      {selectedHero && selectedPlaystyle?.description && (
        <div className="glass-card p-3.5 mb-4 border-l-[3px] border-l-sage-400 rounded-2xl relative">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[13px] font-semibold text-sage-600 flex items-center gap-1.5">
              <span className="text-[14px]">📖</span>
              玩法说明
            </h3>
            {buildCardsMap.get(selectedHero.id)?.get(selectedPlaystyle.id) && (
              <button
                ref={triggerRef}
                onClick={handleCardOpen}
                className="text-[11px] px-2.5 py-1 rounded-full bg-sage-100 text-sage-600 font-medium hover:bg-sage-200 active:scale-95 transition-all flex items-center gap-1 flex-shrink-0"
              >
                <span className="text-[12px]">🎴</span>
                查看攻略卡
              </button>
            )}
          </div>
          <p className="text-[12px] text-sage-600/80 leading-relaxed whitespace-pre-wrap">
            {selectedPlaystyle.description}
          </p>
        </div>
      )}

      {/* Build card (image guide with flip animation) */}
      {selectedHero && (
        <BuildCard
          heroId={selectedHero.id}
          playstyleId={selectedPlaystyle?.id}
          heroName={selectedHero.name}
          cardsMap={buildCardsMap}
          modalOpen={cardModalOpen}
          onClose={handleCardClose}
          triggerPos={triggerPos}
        />
      )}

      {/* 出装推荐（流派级别） */}
      {selectedHero && selectedPlaystyle && (() => {
        const card = buildCardsMap.get(selectedHero.id)?.get(selectedPlaystyle.id);
        if (!card) return null;
        const hasItems = card.items.some(Boolean);
        const hasAlts = card.alts.some(Boolean);
        if (!hasItems && !hasAlts) return null;
        return (
          <div className="glass-card p-3 mb-4">
            <h3 className="text-[12px] font-semibold text-sage-600 mb-2">🛡️ 推荐出装</h3>
            {hasItems && (
              <div className="mb-2">
                <p className="text-[10px] text-sage-500 mb-1.5">核心出装</p>
                <div className="grid grid-cols-6 gap-1.5">
                  {card.items.map((item, i) => (
                    <div key={i} className={`rounded-lg px-1 py-2 text-center text-[10px] font-medium ${
                      item ? "bg-sage-100 text-sage-700 border border-sage-200" : "bg-sage-50/50 text-sage-300 border border-dashed border-sage-200"
                    }`}>
                      {item || i + 1}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {hasAlts && (
              <div>
                <p className="text-[10px] text-sage-500 mb-1.5">替换选择</p>
                <div className="grid grid-cols-6 gap-1.5">
                  {card.alts.map((item, i) => (
                    <div key={i} className={`rounded-lg px-1 py-2 text-center text-[10px] font-medium ${
                      item ? "bg-rose-50 text-rose-600 border border-rose-200" : "bg-sage-50/50 text-sage-300 border border-dashed border-sage-200"
                    }`}>
                      {item || i + 1}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* Rune quick search */}
      {selectedHero && allRunes.length > 0 && (() => {
        const recScores = new Map<string, { score: number; isTop: boolean }>();
        for (const r of recs) {
          recScores.set(r.rune.id, { score: r.adjusted_score, isTop: r.is_top });
        }
        return (
          <RuneQuickSearch
            allRunes={allRunes}
            excludedIds={excludedIds}
            recScores={recScores}
            onMarkSeen={handleRuneSeen}
            onMarkSelected={handleRuneSelect}
          />
        );
      })()}

      {/* Recommendations section */}
      {selectedHero && (
        <>
          {/* Selected runes summary */}
          {(() => {
            const entries = getSelectedEntries();
            if (entries.length === 0) return null;
            const runeMap = new Map(allRunes.map((r) => [r.id, r]));
            return (
              <div className="glass-card p-3 mb-4">
                <h3 className="text-[12px] font-semibold text-sage-600 mb-2">已选符文</h3>
                <div className="flex flex-col gap-2">
                  {entries.map((entry) => {
                    const rune = runeMap.get(entry.runeId);
                    if (!rune) return null;
                    const fetterNames = runeFetterMap.get(entry.runeId) || [];
                    const tierBadgeCls = rune.tier === "chromatic"
                      ? "bg-gradient-to-r from-purple-400 via-pink-400 to-gold-300 text-white"
                      : rune.tier === "gold"
                      ? "bg-gold-300 text-gold-700"
                      : "bg-slate-300 text-slate-700";
                    const tierLabel = rune.tier === "chromatic" ? "彩色" : rune.tier === "gold" ? "金色" : "银色";
                    return (
                      <div key={entry.runeId} className="flex items-start gap-2 p-2 rounded-lg bg-sage-50/70 border border-sage-200/50">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <p className="text-[13px] font-medium text-sage-700">{rune.name}</p>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${tierBadgeCls}`}>
                              {tierLabel}
                            </span>
                          </div>
                          <p className="text-[11px] text-sage-500 line-clamp-2">{rune.description}</p>
                          {fetterNames.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {fetterNames.map((fn) => (
                                <span key={fn} className="text-[9px] px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-600 font-medium">
                                  🧩 {fn}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => handleRuneRemove(entry.runeId)}
                          className="text-[18px] text-rose-400 leading-none flex-shrink-0 active:scale-90 transition-transform"
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {/* Tier filter + reset */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {excludedCount > 0 && (
              <button
                onClick={handleReset}
                className="text-[11px] px-2.5 py-1.5 rounded-full bg-rose-100 text-rose-500 font-medium active:scale-95 transition-all"
              >
                重置对局
              </button>
            )}

            <div className="flex gap-1.5 ml-auto">
              {TIER_FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => { setTierFilter(f.key); setDisplayLimit(15); }}
                  className={`text-[11px] px-2.5 py-1 rounded-full font-medium transition-all ${
                    tierFilter === f.key
                      ? `${f.color} shadow-sm`
                      : "bg-white/40 text-sage-500"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Rune cards */}
          {recsLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="glass-card p-4 h-28 animate-pulse"
                />
              ))}
            </div>
          ) : filteredRecs.length === 0 ? (
            <div className="glass-card p-8 text-center">
              <p className="text-[14px] text-sage-500">
                该阶段暂无推荐符文
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-1">
                {filteredRecs.slice(0, displayLimit).map((rec, i) => (
                  <RuneCard
                    key={`${rec.rune.id}-${i}`}
                    rec={rec}
                    onSelect={handleRuneSelect}
                    onSeen={handleRuneSeen}
                    onRemove={handleRuneRemove}
                  />
                ))}
              </div>
              {displayLimit < filteredRecs.length && (
                <button
                  onClick={() => setDisplayLimit((prev) => prev + 30)}
                  className="w-full mt-3 py-2.5 rounded-xl bg-white/50 text-sage-600 text-[13px] font-medium hover:bg-white/80 active:scale-[0.98] transition-all"
                >
                  显示更多（剩余 {filteredRecs.length - displayLimit} 个）
                </button>
              )}
            </>
          )}

          {/* Exclusion bar */}
          {(filteredRecs.length > 0 || excludedCount > 0) && (
            <ExclusionBar
              excludedCount={excludedCount}
              remainingCount={remainingCount}
              onReset={handleReset}
            />
          )}
        </>
      )}

      {/* Empty state: no hero selected */}
      {!selectedHero && !heroesLoading && (
        <div className="glass-card p-8 text-center mt-4">
          <p className="text-[32px] mb-3">📱</p>
          <p className="text-[15px] font-semibold text-sage-600 mb-1">
            选择英雄开始推荐
          </p>
          <p className="text-[13px] text-sage-500">
            在上方搜索或选择你的英雄，获取海克斯符文推荐
          </p>
        </div>
      )}
    </main>
  );
}
