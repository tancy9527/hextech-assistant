"use client";

import type { Hero } from "@/types";

interface HeroInfoProps {
  hero: Hero;
}

export default function HeroInfo({ hero }: HeroInfoProps) {
  return (
    <div className="glass-card p-4 mb-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-sage-200 flex items-center justify-center text-lg">
          {hero.name[0]}
        </div>
        <div>
          <h2 className="text-[16px] font-bold text-sage-700">{hero.name}</h2>
          <p className="text-[12px] text-sage-500">{hero.title}</p>
          {hero.nicknames && (
            <p className="text-[11px] text-sage-400">别名: {hero.nicknames}</p>
          )}
        </div>
        <span
          className={`ml-auto text-[11px] px-2 py-0.5 rounded-full font-medium ${
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
      </div>
      <p className="text-[13px] text-sage-600 leading-relaxed">
        {hero.description}
      </p>
    </div>
  );
}
