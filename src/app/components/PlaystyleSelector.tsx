"use client";

import type { Playstyle } from "@/types";

interface PlaystyleSelectorProps {
  playstyles: Playstyle[];
  selected: Playstyle | null;
  onSelect: (p: Playstyle) => void;
  loading: boolean;
  recsLoading?: boolean;
}

export default function PlaystyleSelector({
  playstyles,
  selected,
  onSelect,
  loading,
  recsLoading = false,
}: PlaystyleSelectorProps) {
  if (loading) {
    return (
      <div className="mb-4 flex gap-2 overflow-x-auto hide-scrollbar">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-9 w-24 rounded-full bg-white/30 animate-pulse flex-shrink-0" />
        ))}
      </div>
    );
  }

  if (playstyles.length === 0) return null;

  return (
    <div className="mb-4">
      <p className="text-[11px] text-sage-500 mb-2.5 flex items-center gap-1.5">
        <span className="text-[12px]">🎯</span>
        选择玩法流派
      </p>
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-0.5">
        {playstyles.map((p) => {
          const isActive = selected?.id === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onSelect(p)}
              disabled={recsLoading}
              className={`flex-shrink-0 text-[13px] px-5 py-2.5 rounded-full font-medium transition-all duration-200 active:scale-95 ${
                isActive
                  ? "bg-sage-600 text-white shadow-lg shadow-sage-600/25"
                  : "bg-white/60 text-sage-600 border border-sage-200/60 hover:bg-white/90 hover:border-sage-300/80 hover:shadow-sm disabled:opacity-50"
              }`}
            >
              {p.name}
              {isActive && recsLoading && (
                <span className="inline-block w-3 h-3 ml-1.5 border-2 border-white/30 border-t-white rounded-full animate-spin align-[-1px]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
