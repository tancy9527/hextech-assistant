"use client";

import type { Hero } from "@/types";

interface HeroInfoProps {
  hero: Hero;
}

export default function HeroInfo({ hero }: HeroInfoProps) {
  return (
    <div className="glass-card p-4 mb-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-sage-200 flex items-center justify-center text-lg dark:bg-sage-500/30 dark:text-sage-200">
          {hero.name[0]}
        </div>
        <div>
          <h2 className="text-[16px] font-bold text-sage-700 dark:text-sage-200">{hero.name}</h2>
          <p className="text-[12px] text-sage-500 dark:text-sage-300">{hero.title}</p>
          {hero.nicknames && (
            <p className="text-[11px] text-sage-400 dark:text-sage-300">别名: {hero.nicknames}</p>
          )}
        </div>
        <div className="ml-auto flex flex-col items-end gap-0.5">
          <span
            className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
              hero.attack_type === "AP"
                ? "bg-purple-100 text-purple-600"
                : hero.attack_type === "AD"
                ? "bg-red-100 text-red-600"
                : hero.attack_type === "Tank"
                ? "bg-blue-100 text-blue-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {hero.attack_type} · {hero.role}
          </span>
          {hero.win_rate && (
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
              parseFloat(hero.win_rate) >= 52 ? "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400" :
              parseFloat(hero.win_rate) >= 49 ? "bg-gold-50 text-gold-600 dark:bg-gold-500/10 dark:text-gold-400" :
              "bg-rose-50 text-rose-500 dark:bg-rose-500/10 dark:text-rose-400"
            }`}>
              {hero.meta_tier && `${hero.meta_tier} · `}{hero.win_rate}
            </span>
          )}
        </div>
      </div>
      <p className="text-[13px] text-sage-600 leading-relaxed dark:text-sage-300">
        {hero.description}
      </p>
    </div>
  );
}
