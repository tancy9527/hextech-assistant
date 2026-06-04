// 英雄胜率同步 — 从 hexdata.com.cn 获取英雄统计数据并更新 Supabase

import { createAdminClient } from "@/lib/supabase/admin";
import { fetchHexHeroes } from "./hexdata";
import type { UpdateLog } from "./types";

export interface HeroStatChange {
  heroName: string;
  attackType: string;
  oldTier?: string;
  newTier: string;
  oldWinRate?: string;
  newWinRate: string;
}

export interface HeroStatsResult {
  updated: number;
  skipped: number;
  changes: HeroStatChange[];
}

function hexTierToLabel(t: number): string {
  if (t === 1) return "T1";
  if (t === 2) return "T2";
  if (t === 3) return "T3";
  if (t === 4) return "T4";
  return "T5";
}

export async function syncHeroStats(options: {
  dryRun?: boolean;
  heroNames?: string[];
}): Promise<{ result: HeroStatsResult; log: Partial<UpdateLog> }> {
  const { dryRun = false, heroNames } = options;
  const changes: HeroStatChange[] = [];
  let updated = 0;
  let skipped = 0;

  const hexHeroes = await fetchHexHeroes();
  const supabase = createAdminClient();

  const { data: rawHeroes } = await supabase.from("heroes").select("id, name, title, attack_type, meta_tier, win_rate");
  const heroesList = rawHeroes || [];

  // 用中文名建立索引
  const byName = new Map<string, any>();
  for (const h of heroesList) {
    byName.set(h.name, h);
    // 也按 title 中的英文名索引（如 "MissFortune — 赏金猎人" → "MissFortune"）
    const enMatch = h.title?.match(/^([\w']+)\s*—/);
    if (enMatch) byName.set(enMatch[1].toLowerCase(), h);
  }

  for (const hex of hexHeroes) {
    // 优先按searchTerms别名匹配，其次按名称
    let local = byName.get(hex.name);
    if (!local && hex.searchTerms) {
      for (const alias of hex.searchTerms) {
        local = byName.get(alias);
        if (local) break;
      }
    }
    // 用英文id匹配
    if (!local) local = byName.get(hex.id.toLowerCase());
    if (!local) continue;
    if (heroNames && heroNames.length > 0 && !heroNames.includes(local.name) && !heroNames.includes(hex.name)) continue;

    const newTier = hexTierToLabel(hex.tier);
    const newWinRate = `${(hex.winRate * 100).toFixed(2)}%`;
    const oldTier = local.meta_tier || "";
    const oldWinRate = local.win_rate || "";

    const tierChanged = oldTier !== newTier;
    const wrChanged = oldWinRate !== newWinRate;

    if (!tierChanged && !wrChanged) { skipped++; continue; }

    changes.push({
      heroName: hex.name,
      attackType: local.attack_type || "",
      oldTier, newTier,
      oldWinRate, newWinRate,
    });

    if (!dryRun) {
      const updates: any = { meta_tier: newTier, win_rate: newWinRate };
      if (hex.pickRate !== undefined) updates.pick_rate = hex.pickRate;
      if (hex.kda !== undefined) updates.hex_kda = hex.kda;
      if (hex.games !== undefined) updates.hex_games = hex.games;
      if (hex.winRateChange !== undefined) updates.win_rate_change = hex.winRateChange;
      if (hex.patch) updates.hex_patch = hex.patch;

      await supabase.from("heroes").update(updates).eq("id", local.id);
      updated++;
    } else {
      updated++;
    }
  }

  const log: Partial<UpdateLog> = {
    log_type: "sync-runes",
    title: `英雄胜率同步 — ${dryRun ? "预览" : "执行"}`,
    summary: `hexdata ${hexHeroes.length}英雄 | 本地 ${heroesList.length}\n更新 ${updated} | 跳过 ${skipped}`,
    details: { remoteCount: hexHeroes.length, localCount: heroesList.length, updated, skipped, changes },
    stats: { remoteCount: hexHeroes.length, localCount: heroesList.length, updated, skipped },
    run_mode: "manual",
    status: "completed",
  };

  return { result: { updated, skipped, changes }, log };
}
