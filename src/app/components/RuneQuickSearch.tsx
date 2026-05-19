"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import type { Rune } from "@/types";

interface RuneMatch {
  rune: Rune;
  score: number;
  isRecommended: boolean;
  isTop: boolean;
}

interface RuneQuickSearchProps {
  allRunes: Rune[];
  excludedIds: string[];
  recScores: Map<string, { score: number; isTop: boolean }>;
  onMarkSeen: (runeId: string) => void;
  onMarkSelected: (runeId: string) => void;
}

export default function RuneQuickSearch({
  allRunes,
  excludedIds,
  recScores,
  onMarkSeen,
  onMarkSelected,
}: RuneQuickSearchProps) {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const results: RuneMatch[] = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allRunes
      .filter(
        (r) => r.name.toLowerCase().includes(q)
      )
      .map((rune) => {
        const rec = recScores.get(rune.id);
        return {
          rune,
          score: rec?.score ?? 0,
          isRecommended: !!rec,
          isTop: rec?.isTop ?? false,
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }, [allRunes, recScores, query]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleMark = (runeId: string, type: "seen" | "selected") => {
    if (type === "seen") onMarkSeen(runeId);
    else onMarkSelected(runeId);
    setQuery("");
    setShowResults(false);
    setFeedback(type === "seen" ? "已标记「本局已见过」" : "已标记「本局已选」");
    setTimeout(() => setFeedback(null), 2000);
  };

  const excludedSet = new Set(excludedIds);
  const tierBadge = (tier: string) => {
    switch (tier) {
      case "chromatic": return "bg-gradient-to-r from-purple-400 via-pink-400 to-gold-300 text-white";
      case "gold": return "bg-gold-300 text-gold-700";
      case "silver": return "bg-slate-300 text-slate-700";
      default: return "bg-slate-200 text-slate-600";
    }
  };

  return (
    <div ref={containerRef} className="relative mb-4">
      <p className="text-[11px] text-sage-500 mb-1.5">
        搜索符文并查看适配度，然后标记
      </p>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowResults(true);
        }}
        onFocus={() => setShowResults(true)}
        placeholder="输入符文名称搜索..."
        className="w-full px-3 py-2 rounded-xl bg-white/50 border border-sage-200 text-[13px] text-sage-700 placeholder-sage-400 caret-sage-700 focus:outline-none focus:border-gold-400 transition-colors"
        autoComplete="off"
      />

      {showResults && query.trim() && (
        <div className="absolute z-20 left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-sage-200 overflow-hidden max-h-80 overflow-y-auto">
          {results.length === 0 ? (
            <p className="text-[12px] text-sage-400 text-center py-3">
              没有匹配的符文
            </p>
          ) : (
            results.map(({ rune, score, isTop, isRecommended }) => {
              const excluded = excludedSet.has(rune.id);
              return (
                <div
                  key={rune.id}
                  className={`px-3 py-2.5 border-b border-sage-100 last:border-b-0 ${
                    excluded ? "bg-sage-50/50" : ""
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[13px] font-medium text-sage-700">{rune.name}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${tierBadge(rune.tier)}`}>
                      {rune.tier === "chromatic" ? "彩色" : rune.tier === "gold" ? "金色" : "银色"}
                    </span>
                    {isTop && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-gold-200 text-gold-700 font-medium">
                        推荐
                      </span>
                    )}
                    {excluded && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-sage-200 text-sage-500">
                        已屏蔽
                      </span>
                    )}
                  </div>

                  {/* Suitability info */}
                  {isRecommended ? (
                    <p className="text-[11px] text-green-600 mb-1.5">
                      ✅ 适合当前英雄（评分: {score}分{isTop ? "，强烈推荐" : ""}）
                    </p>
                  ) : (
                    <p className="text-[11px] text-sage-400 mb-1.5">
                      ⚪ 未在推荐列表中，可能不太适合当前英雄
                    </p>
                  )}

                  {/* Action buttons */}
                  {!excluded && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleMark(rune.id, "seen")}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-sage-100 text-sage-500 font-medium active:scale-95"
                      >
                        🔘 已见过（屏蔽）
                      </button>
                      <button
                        onClick={() => handleMark(rune.id, "selected")}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-sage-600 text-white font-medium active:scale-95"
                      >
                        ✅ 本局已选
                      </button>
                    </div>
                  )}
                  {excluded && (
                    <p className="text-[11px] text-sage-400">该符文已被本局屏蔽</p>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {feedback && (
        <p className="text-[11px] text-green-500 mt-1">{feedback}</p>
      )}
    </div>
  );
}
