"use client";

import { useState, useEffect } from "react";

interface EquipmentItem {
  name: string;
  game_id: string;
  icon_url: string;
  price: number;
  description: string;
}

interface EquipmentRecData {
  starter_items: EquipmentItem[];
  core_items: EquipmentItem[];
  alt_items: EquipmentItem[];
}

export default function EquipmentTab({
  heroId,
  playstyleId,
  highlightedIds,
  onDataLoaded,
  onItemHover,
  onItemLeave,
}: {
  heroId: string;
  playstyleId?: string;
  highlightedIds: Set<string>;
  onDataLoaded?: (data: EquipmentRecData) => void;
  onItemHover?: (item: EquipmentItem) => void;
  onItemLeave?: () => void;
}) {
  const [data, setData] = useState<EquipmentRecData | null>(null);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    if (!heroId) return;
    setLoading(true);
    const params = new URLSearchParams({ heroId });
    if (playstyleId) params.set("playstyleId", playstyleId);
    fetch(`/api/equipment-recs?${params}`)
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        onDataLoaded?.(d);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [heroId, playstyleId]);

  if (loading) {
    return (
      <div className="glass-card p-3 mb-4 animate-pulse">
        <div className="h-4 w-24 bg-sage-200/50 rounded mb-2" />
        <div className="flex gap-2">
          {[1,2,3].map(i => <div key={i} className="size-14 rounded-lg bg-sage-200/30" />)}
        </div>
      </div>
    );
  }

  if (!data) return null;
  const hasStarter = data.starter_items.length > 0;
  const hasCore = data.core_items.length > 0;
  if (!hasStarter && !hasCore) return null;

  // 替换出装按位置对应核心出装
  const alts = data.alt_items || [];

  return (
    <div className="glass-card p-3 mb-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1.5 w-full text-left"
      >
        <h3 className="text-[12px] font-semibold text-sage-600 dark:text-sage-300">
          🛡️ 推荐出装
        </h3>
        <span className="text-[10px] text-sage-400 ml-auto">
          {expanded ? "收起 ▲" : "展开 ▼"}
        </span>
      </button>

      {expanded && (
        <div className="mt-2 space-y-2">
          {hasStarter && (
            <div>
              <p className="text-[10px] text-sage-500 mb-1.5 dark:text-sage-400">出门装</p>
              <div className="grid grid-cols-6 gap-1">
                {data.starter_items.slice(0, 6).map((item, i) => {
                  if (!item) return <div key={`s-${i}`} />;
                  return (
                    <EquipmentSlot
                      key={`s-${i}`}
                      item={item}
                      highlighted={highlightedIds.has(item.game_id)}
                      onHover={() => onItemHover?.(item)}
                      onLeave={() => onItemLeave?.()}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {hasCore && (
            <div>
              <p className="text-[10px] text-sage-500 mb-1.5 dark:text-sage-400">核心出装</p>
              <div className="grid grid-cols-6 gap-1">
                {data.core_items.slice(0, 6).map((item, i) => {
                  if (!item) return <div key={`c-${i}`} />;
                  return (
                    <EquipmentSlot
                      key={`c-${i}`}
                      item={item}
                      altItem={alts[i] || undefined}
                      highlighted={highlightedIds.has(item.game_id)}
                      onHover={() => onItemHover?.(item)}
                      onLeave={() => onItemLeave?.()}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function EquipmentSlot({
  item,
  altItem,
  highlighted,
  onHover,
  onLeave,
}: {
  item: EquipmentItem;
  altItem?: EquipmentItem;
  highlighted: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const [imgErr, setImgErr] = useState(false);
  const [altErr, setAltErr] = useState(false);

  return (
    <div
      className={`relative group flex flex-col items-center rounded-lg px-1 py-1.5 border transition-all cursor-pointer ${
        highlighted
          ? "bg-gold-100/80 border-gold-400 shadow-sm dark:bg-gold-500/20 dark:border-gold-500/50"
          : "bg-sage-50/70 border-sage-200/50 dark:bg-white/5 dark:border-white/10"
      }`}
      title={item.description || item.name}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onTouchStart={onHover}
    >
      {/* 替换出装小图标（卡片右上角，只遮住卡片10px以内） */}
      {altItem && altItem.icon_url && !altErr && (
        <img
          src={altItem.icon_url}
          alt={altItem.name}
          title={`替换: ${altItem.name}`}
          className="absolute -top-0.5 right-0 size-[22px] rounded-full object-contain bg-white border border-gold-300/60 shadow z-10"
          onError={() => setAltErr(true)}
        />
      )}

      {/* 核心装备图标 */}
      {item.icon_url && !imgErr ? (
        <img
          src={item.icon_url}
          alt={item.name}
          className="size-9 rounded object-contain bg-sage-100/50 flex-shrink-0"
          onError={() => setImgErr(true)}
        />
      ) : (
        <div className="size-9 rounded bg-sage-100/50 flex items-center justify-center text-[10px] text-sage-400 flex-shrink-0">
          ?
        </div>
      )}

      <p className="text-[10px] font-medium text-sage-700 truncate w-full text-center mt-1 dark:text-sage-200">
        {item.name}
      </p>
      <p className="text-[9px] text-gold-500 tabular-nums">
        {item.price > 0 ? `💰${item.price}` : " "}
      </p>
    </div>
  );
}
