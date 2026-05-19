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
          <div key={i} className="h-8 w-24 rounded-full bg-white/30 animate-pulse flex-shrink-0" />
        ))}
      </div>
    );
  }

  if (playstyles.length === 0) return null;

  return (
    <div className="mb-4">
      <p className="text-[11px] text-sage-500 mb-2">选择玩法流派</p>
      <div className="flex gap-2 overflow-x-auto hide-scrollbar">
        {playstyles.map((p) => {
          const isActive = selected?.id === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onSelect(p)}
              disabled={recsLoading}
              className={`flex-shrink-0 text-[13px] px-4 py-2 rounded-full font-medium transition-all active:scale-95 flex items-center gap-1.5 ${
                isActive
                  ? "bg-sage-600 text-white shadow-md"
                  : "bg-white/50 text-sage-600 hover:bg-white/80 disabled:opacity-50"
              }`}
            >
              {p.name}
              {isActive && recsLoading && (
                <span className="inline-block w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
