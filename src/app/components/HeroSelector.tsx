"use client";

import { useState, useMemo } from "react";
import type { Hero } from "@/types";

interface HeroSelectorProps {
  heroes: Hero[];
  selectedHero: Hero | null;
  onSelect: (hero: Hero) => void;
  loading: boolean;
  onRankingClick?: () => void;
}

export default function HeroSelector({
  heroes,
  selectedHero,
  onSelect,
  loading,
  onRankingClick,
}: HeroSelectorProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return heroes;
    const q = search.toLowerCase();
    return heroes.filter(
      (h) =>
        h.name.toLowerCase().includes(q) ||
        h.title.toLowerCase().includes(q) ||
        h.role.toLowerCase().includes(q) ||
        (h.nicknames || "").toLowerCase().includes(q)
    );
  }, [heroes, search]);

  const visible = filtered.slice(0, 12);
  const hasMore = filtered.length > 12;

  return (
    <div className="glass-card p-3 mb-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-semibold text-sage-600 dark:text-sage-300">选择英雄</h2>
        {onRankingClick && (
          <button
            onClick={onRankingClick}
            className="text-[14px] px-2 py-1 rounded-lg bg-white/40 border border-sage-200/30 shadow-sm hover:bg-white/70 hover:shadow-md hover:border-gold-300/40 active:scale-95 transition-all dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/15"
            title="英雄胜率排行"
          >
            🏆
          </button>
        )}
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="搜索英雄名称或外号..."
        className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-sage-200 text-[14px] text-sage-700 placeholder-sage-400 caret-sage-700 mb-2 focus:outline-none focus:border-gold-400 transition-colors dark:bg-white/5 dark:border-white/10 dark:text-sage-200 dark:placeholder-sage-500"
        autoComplete="off"
      />

      {loading ? (
        <div className="grid grid-cols-4 gap-1.5">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-14 rounded-xl bg-white/30 animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-[13px] text-sage-400 text-center py-4 dark:text-sage-300">
          没有找到匹配的英雄
        </p>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-1.5">
            {visible.map((hero) => (
              <button
                key={hero.id}
                onClick={() => onSelect(hero)}
                className={`hero-option flex flex-col items-center text-center p-2 rounded-xl transition-all active:scale-95 ${
                  selectedHero?.id === hero.id
                    ? "bg-gold-100 border-2 border-gold-300 shadow-sm dark:bg-gold-500/20 dark:border-gold-400/30"
                    : "bg-white/40 border-2 border-transparent hover:bg-white/70 dark:bg-white/5 dark:hover:bg-white/10"
                }`}
              >
                <span className="text-[12px] font-semibold text-sage-700 leading-tight line-clamp-1 dark:text-sage-200">
                  {hero.name}
                </span>
                {hero.nicknames ? (
                  <span className="text-[9px] text-sage-400 leading-tight line-clamp-1 dark:text-sage-300">
                    {hero.nicknames}
                  </span>
                ) : (
                  <span className="text-[9px] text-sage-300 leading-tight dark:text-sage-400">
                    —
                  </span>
                )}
                <span
                  className={`text-[9px] px-1 py-0 rounded-full font-medium mt-0.5 ${
                    hero.attack_type === "AP"
                      ? "bg-purple-100 text-purple-600"
                      : hero.attack_type === "AD"
                      ? "bg-red-100 text-red-600"
                      : hero.attack_type === "Tank"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {hero.attack_type}
                </span>
              </button>
            ))}
          </div>
          {hasMore && (
            <p className="text-[11px] text-sage-400 text-center mt-2 dark:text-sage-300">
              还有 {filtered.length - 12} 个英雄，请使用搜索筛选
            </p>
          )}
        </>
      )}
    </div>
  );
}
