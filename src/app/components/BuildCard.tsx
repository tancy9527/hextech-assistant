"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BuildCardData {
  image_url: string;
  title?: string;
  description?: string;
  items?: string[];
  alts?: string[];
}

interface BuildCardProps {
  heroId: string;
  playstyleId?: string;
  heroName: string;
  cardsMap: Map<string, Map<string, BuildCardData>>;
  modalOpen: boolean;
  onClose: () => void;
  triggerPos?: { x: number; y: number } | null;
}

const FAST_EASE = { duration: 0.2, ease: [0.4, 0, 0.2, 1] as const };

const cardVariants = {
  initial: { scale: 0.85, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] } },
  exit: (pos: { x: number; y: number } | null) => ({
    scale: pos ? 0.1 : 0.85,
    opacity: 0,
    x: pos ? pos.x - (typeof window !== "undefined" ? window.innerWidth / 2 : 0) : 0,
    y: pos ? pos.y - (typeof window !== "undefined" ? window.innerHeight / 2 : 0) : 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function BuildCard({ heroId, playstyleId, heroName, cardsMap, modalOpen, onClose, triggerPos }: BuildCardProps) {
  const [card, setCard] = useState<BuildCardData | null>(null);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (!playstyleId) {
      setCard(null);
      return;
    }
    const found = cardsMap.get(heroId)?.get(playstyleId) ?? null;
    if (found) {
      setCard(found);
      setFlipped(false);
    } else {
      setCard(null);
    }
  }, [heroId, playstyleId, cardsMap]);

  if (!card) return null;

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          key={`${heroId}-${playstyleId}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          transition={FAST_EASE}
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-[60] w-10 h-10 rounded-full bg-black/40 text-white/80 flex items-center justify-center text-[20px] hover:bg-black/60 active:scale-90 transition-all"
          >
            ✕
          </button>

          <motion.div
            className="relative preserve-3d cursor-pointer"
            style={{ width: "min(95vw, 95vh * 0.75)", maxWidth: "500px", aspectRatio: "3/4" }}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={triggerPos}
            onClick={(e) => { e.stopPropagation(); setFlipped(!flipped); }}
          >
            <motion.div
              className="w-full h-full relative preserve-3d"
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
            >
              {/* ======== 背面 ======== */}
              <div
                className="absolute inset-0 backface-hidden rounded-2xl flex flex-col items-center justify-center p-5"
                style={{
                  background: "linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 30%, #4a2066 60%, #6b3a8b 80%, #1a0a2e 100%)",
                  border: "3px solid rgba(201,168,76,0.55)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 80px rgba(180,150,80,0.15), inset 0 1px 0 rgba(255,255,255,0.04)",
                }}
              >
                <div className="absolute inset-3 rounded-xl border border-gold-300/15" />
                <div className="absolute inset-5 rounded-lg border border-gold-300/8" />

                {["tl","tr","bl","br"].map((pos) => {
                  const cls = pos === "tl" ? "top-4 left-4 border-t-2 border-l-2 rounded-tl-lg" :
                    pos === "tr" ? "top-4 right-4 border-t-2 border-r-2 rounded-tr-lg" :
                    pos === "bl" ? "bottom-4 left-4 border-b-2 border-l-2 rounded-bl-lg" :
                    "bottom-4 right-4 border-b-2 border-r-2 rounded-br-lg";
                  return <div key={pos} className={`absolute w-12 h-12 ${cls} border-gold-300/50`} />;
                })}

                <span className="text-[64px] mb-6 drop-shadow-lg">🃏</span>
                <p className="text-[20px] font-bold text-gold-300 text-center drop-shadow-md px-4">
                  {card.title || `${heroName} 攻略`}
                </p>
                {card.description && (
                  <p className="text-[13px] text-purple-300/70 text-center mt-3 px-6 leading-relaxed">{card.description}</p>
                )}
                {(card.items?.some(Boolean) || card.alts?.some(Boolean)) && (
                  <div className="mt-4 w-full px-4">
                    {card.items?.some(Boolean) && (
                      <div className="mb-2">
                        <p className="text-[10px] text-gold-300/70 text-center mb-1">推荐出装</p>
                        <div className="grid grid-cols-6 gap-1">
                          {card.items!.map((item, i) => (
                            <div key={i} className={`rounded-md px-1 py-1.5 text-center text-[9px] font-medium ${
                              item ? "bg-gold-300/15 text-gold-300/90 border border-gold-300/30" : "bg-white/5 text-purple-300/40 border border-dashed border-white/10"
                            }`}>
                              {item || i + 1}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {card.alts?.some(Boolean) && (
                      <div>
                        <p className="text-[10px] text-purple-300/70 text-center mb-1">替换选择</p>
                        <div className="grid grid-cols-6 gap-1">
                          {card.alts!.map((item, i) => (
                            <div key={i} className={`rounded-md px-1 py-1.5 text-center text-[9px] font-medium ${
                              item ? "bg-purple-300/10 text-purple-300/80 border border-purple-300/25" : "bg-white/5 text-purple-300/40 border border-dashed border-white/10"
                            }`}>
                              {item || i + 1}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <p className="text-[14px] text-purple-300/50 mt-4">点击翻转查看</p>

                <div className="absolute bottom-10 flex gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-gold-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-gold-400/40" />
                  <span className="w-2.5 h-2.5 rounded-full bg-gold-400/15" />
                </div>
              </div>

              {/* ======== 正面 ======== */}
              <div
                className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden"
                style={{
                  transform: "rotateY(180deg)",
                  border: "3px solid rgba(201,168,76,0.55)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 80px rgba(180,150,80,0.15)",
                }}
              >
                <img
                  src={card.image_url}
                  alt={card.title || heroName}
                  className="w-full h-full object-cover bg-[#0d0d1a]"
                />

                <div className="absolute inset-0 rounded-2xl border-2 border-gold-300/25 pointer-events-none" />
                {["tl","tr","bl","br"].map((pos) => {
                  const cls = pos === "tl" ? "top-4 left-4 border-t-2 border-l-2 rounded-tl-lg" :
                    pos === "tr" ? "top-4 right-4 border-t-2 border-r-2 rounded-tr-lg" :
                    pos === "bl" ? "bottom-4 left-4 border-b-2 border-l-2 rounded-bl-lg" :
                    "bottom-4 right-4 border-b-2 border-r-2 rounded-br-lg";
                  return <div key={pos} className={`absolute w-10 h-10 ${cls} border-gold-300/60`} />;
                })}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
