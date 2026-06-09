"use client";

import { useMemo } from "react";
import type { Hero } from "@/types";

export default function HeroRankingPanel({
  open,
  onClose,
  onSelect,
  heroes,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (hero: Hero) => void;
  heroes: Hero[];
}) {
  const ranked = useMemo(() => {
    return heroes
      .filter((h) => h.win_rate)
      .map((h) => ({
        ...h,
        wr: parseFloat(h.win_rate || "0"),
        pr: parseFloat((h as any).pick_rate || "0"),
      }))
      .sort((a, b) => b.wr - a.wr)
      .slice(0, 50);
  }, [heroes]);

  if (!open) return null;

  const tierBadge = (tier: string | null) => {
    if (!tier) return null;
    const colors: Record<string, string> = {
      T1: "bg-rose-100 text-rose-600",
      T2: "bg-gold-100 text-gold-700",
      T3: "bg-green-100 text-green-600",
      T4: "bg-slate-100 text-slate-500",
      T5: "bg-slate-50 text-slate-400",
    };
    return (
      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${colors[tier] || "bg-slate-100 text-slate-500"}`}>
        {tier}
      </span>
    );
  };

  const winRateBar = (rate: number) => {
    const color = rate >= 55 ? "bg-rose-400" : rate >= 52 ? "bg-gold-400" : rate >= 48 ? "bg-green-400" : "bg-slate-400";
    return (
      <div className="flex items-center gap-1.5 min-w-[80px]">
        <div className="flex-1 h-1.5 bg-sage-100 rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${color}`} style={{ width: `${Math.max(rate, 30)}%` }} />
        </div>
        <span className={`text-[11px] font-medium ${rate >= 52 ? "text-rose-500" : rate >= 48 ? "text-gold-600" : "text-sage-500"}`}>
          {rate}%
        </span>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-[400px] h-full bg-white shadow-2xl flex flex-col animate-slide-in dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 pt-4 pb-3 border-b border-sage-200/50 flex items-center justify-between flex-shrink-0 dark:border-white/10">
          <div>
            <h2 className="text-[16px] font-bold text-sage-700 dark:text-sage-100">🏆 英雄胜率排行</h2>
            <p className="text-[10px] text-sage-400 mt-0.5 dark:text-sage-500">数据来源：hexdata.com.cn · {ranked.length}个英雄</p>
          </div>
          <button onClick={onClose} className="size-8 rounded-full bg-sage-100 text-sage-500 text-[18px] font-bold hover:bg-sage-200 dark:bg-white/10 dark:text-sage-300">
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-2">
            {ranked.map((h, i) => (
              <button
                key={h.id}
                onClick={() => {
                  onSelect(h);
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-sage-50/70 active:scale-[0.98] transition-all text-left dark:hover:bg-white/5"
              >
                <span className={`w-6 text-center text-[12px] font-bold flex-shrink-0 ${
                  i < 3 ? (i === 0 ? "text-gold-500" : i === 1 ? "text-slate-400" : "text-amber-500") : "text-sage-400"
                }`}>
                  {i < 3 ? ["🥇","🥈","🥉"][i] : i + 1}
                </span>

                {h.image_url ? (
                  <img src={h.image_url} alt={h.name} className="size-9 rounded-full object-cover bg-sage-100 flex-shrink-0" />
                ) : (
                  <div className="size-9 rounded-full bg-sage-100 flex items-center justify-center text-[12px] text-sage-400 flex-shrink-0">
                    {h.name[0]}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-[13px] font-medium text-sage-700 truncate dark:text-sage-200">{h.name}</p>
                    {tierBadge(h.meta_tier || null)}
                  </div>
                  <div className="flex items-center gap-2">
                    {winRateBar(h.wr)}
                    {h.pr > 0 && (
                      <span className="text-[9px] text-sage-400 flex-shrink-0 dark:text-sage-500">
                        登场{h.pr}%
                      </span>
                    )}
                  </div>
                </div>

                <span className="text-[11px] text-sage-400 flex-shrink-0">›</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slideIn 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}
