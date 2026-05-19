"use client";

import { type RecommendationResult } from "@/types";

interface RuneCardProps {
  rec: RecommendationResult;
  onSelect: (runeId: string) => void;
  onSeen: (runeId: string) => void;
  onRemove: (runeId: string) => void;
}

export default function RuneCard({ rec, onSelect, onSeen, onRemove }: RuneCardProps) {
  const { rune, is_top, is_selected, is_excluded, adjusted_score, reason, build_synergy, boost_reasons } = rec;

  const tierBadge = {
    chromatic: "bg-gradient-to-r from-purple-400 via-pink-400 to-gold-300 text-white",
    gold: "bg-gold-300 text-gold-700",
    silver: "bg-slate-300 text-slate-700",
  }[rune.tier] || "bg-slate-200 text-slate-600";

  const tierLabel = {
    chromatic: "彩色",
    gold: "金色",
    silver: "银色",
  }[rune.tier] || rune.tier;

  const isDisabled = is_selected || is_excluded;

  return (
    <div
      className={`animate-slide-up ${
        is_selected
          ? "glass-card-selected"
          : is_excluded
          ? "glass-card opacity-50"
          : is_top
          ? "glass-card-highlight animate-pulse-gold"
          : "glass-card"
      } p-3 mb-2`}
    >
      <div className="flex items-start gap-2.5">
        {/* Icon */}
        <div className="w-10 h-10 rounded-xl bg-cream-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
          {rune.icon_url ? (
            <img
              src={rune.icon_url}
              alt={rune.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <span className="text-lg">
              {rune.effect_type === "damage" ? "⚔️" :
               rune.effect_type === "defense" ? "🛡️" :
               rune.effect_type === "mobility" ? "💨" :
               rune.effect_type === "sustain" ? "💚" : "✨"}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          {/* Name + badges */}
          <div className="flex items-center gap-1.5 flex-wrap mb-1">
            <span className="font-semibold text-[14px] text-sage-700">
              {rune.name}
            </span>
            <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${tierBadge}`}>
              {tierLabel}
            </span>
            {is_top && !isDisabled && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-gold-200 text-gold-700 font-medium">
                推荐
              </span>
            )}
            {rune.special_label && !isDisabled && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-rose-200 text-rose-600 font-medium animate-pulse">
                {rune.special_label}
              </span>
            )}
            {is_selected && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-green-100 text-green-600 font-medium">
                本局已选
              </span>
            )}
            {is_excluded && !is_selected && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-sage-200 text-sage-500 font-medium">
                本局已见过
              </span>
            )}
            {!isDisabled && adjusted_score > 0 && (
              <span className="text-[10px] text-sage-500 ml-auto tabular-nums">
                {adjusted_score}分
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-[12px] text-sage-600 leading-relaxed mb-1">
            {rune.description}
          </p>

          {/* Pros / Cons / Scenarios */}
          <div className="flex flex-wrap gap-1 mb-1">
            {rune.pros && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-green-50 text-green-600 border border-green-200">
                优: {rune.pros}
              </span>
            )}
            {rune.cons && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-rose-50 text-rose-500 border border-rose-200">
                劣: {rune.cons}
              </span>
            )}
            {rune.scenarios && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
                {rune.scenarios}
              </span>
            )}
          </div>

          {/* Reason */}
          {reason && (
            <p className="text-[11px] text-gold-600 leading-relaxed">
              {reason}
            </p>
          )}

          {/* Boost reasons */}
          {boost_reasons.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1">
              {boost_reasons.map((r, i) => (
                <span
                  key={i}
                  className="text-[9px] px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-600"
                >
                  {r}
                </span>
              ))}
            </div>
          )}

          {/* Build synergy */}
          {build_synergy && !isDisabled && (
            <div className="mt-2 p-2 rounded-lg bg-sage-100/60 border border-sage-200/50">
              <p className="text-[10px] text-sage-500 font-medium mb-0.5">推荐出装路线</p>
              <p className="text-[11px] text-sage-600 leading-relaxed">
                {build_synergy}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      {!isDisabled && (
        <div className="mt-3 flex justify-end gap-2">
          <button
            onClick={() => onSeen(rune.id)}
            className="text-[12px] px-3 py-1.5 rounded-lg bg-sage-100 text-sage-500 font-medium active:scale-95 transition-all hover:bg-sage-200"
          >
            🔘 已见过
          </button>
          <button
            onClick={() => onSelect(rune.id)}
            className="text-[12px] px-3 py-1.5 rounded-lg bg-sage-600 text-white font-medium active:scale-95 transition-all hover:bg-sage-700"
          >
            ✅ 本局已选
          </button>
        </div>
      )}

      {is_selected && (
        <div className="mt-3 flex justify-end">
          <button
            onClick={() => onRemove(rune.id)}
            className="text-[12px] px-4 py-1.5 rounded-lg bg-rose-100 text-rose-500 font-medium active:scale-95 transition-all"
          >
            取消选择
          </button>
        </div>
      )}

      {is_excluded && !is_selected && (
        <div className="mt-3 flex justify-end">
          <button
            onClick={() => onRemove(rune.id)}
            className="text-[12px] px-4 py-1.5 rounded-lg bg-sage-100 text-sage-500 font-medium active:scale-95 transition-all"
          >
            取消标记
          </button>
        </div>
      )}
    </div>
  );
}
