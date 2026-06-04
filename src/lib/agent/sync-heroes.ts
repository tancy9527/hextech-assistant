// 英雄数据同步 — 从 arammayhem.com 获取英雄列表并更新 Supabase
// 新增缺少的英雄，更新现有英雄的名称/称号

import { createAdminClient } from "@/lib/supabase/admin";
import { fetchAramMayhemData } from "./arammayhem";
import type { UpdateLog } from "./types";

export interface HeroChange {
  name: string;
  action: "created" | "updated" | "skipped";
  fields?: string[];
}

export async function syncHeroes(options: {
  dryRun?: boolean;
}): Promise<{ result: { created: number; updated: number; skipped: number; changes: HeroChange[] }; log: Partial<UpdateLog> }> {
  const { dryRun = false } = options;
  const changes: HeroChange[] = [];
  let created = 0, updated = 0, skipped = 0;

  const amData = await fetchAramMayhemData();
  const supabase = createAdminClient();

  // 获取现有英雄
  const { data: existingHeroes } = await supabase.from("heroes").select("id, name, title, role, attack_type, description");
  const existingMap = new Map<string, any>();

  // 建立索引：英文名小写 → hero
  for (const h of existingHeroes || []) {
    const enMatch = h.title?.match(/^([\w']+)\s*—/);
    if (enMatch) existingMap.set(enMatch[1].toLowerCase(), h);
    existingMap.set(h.name, h); // 也按中文名索引
  }

  // attack_type 映射
  function detectAttackType(title: string, nameEn: string): string {
    const t = (title || "").toLowerCase() + " " + nameEn.toLowerCase();
    if (t.includes("adc") || t.includes("marksman") || t.includes("射手") || t.includes("ad")) return "AD";
    if (t.includes("tank") || t.includes("坦克")) return "Tank";
    if (t.includes("support") || t.includes("辅助")) return "Support";
    return "AP"; // default
  }

  for (const champ of amData.champions) {
    const enId = champ.id.toLowerCase();
    const zhName = champ.name?.["zh-CN"] || champ.name?.en || enId;
    const zhTitle = ` — ${champ.title?.["zh-CN"] || champ.title?.en || ""}`;
    // 用 arammayhem 的英文 id + 中文名构建 title
    const title = `${champ.id}${zhTitle}`;

    let existing = existingMap.get(enId);
    if (!existing) existing = existingMap.get(zhName);

    if (existing) {
      // 更新 title（如果格式不对）
      const needUpdate = !existing.title?.includes(champ.id) || !existing.title?.includes("—");
      if (needUpdate) {
        if (!dryRun) {
          await supabase.from("heroes").update({ title }).eq("id", existing.id);
        }
        changes.push({ name: zhName, action: "updated", fields: ["title"] });
        updated++;
      } else {
        skipped++;
      }
    } else {
      // 新增英雄
      if (!dryRun) {
        const attackType = detectAttackType(champ.title?.["zh-CN"] || "", champ.id);
        const role = champ.tier ? `Meta ${champ.tier}` : "未知";
        const desc = `${zhName}（${champ.title?.["zh-CN"] || ""}）在大乱斗中的表现评级为${champ.tier}，胜率${champ.winRate}。数据来源：arammayhem.com。`;
        await supabase.from("heroes").insert({
          name: zhName,
          title,
          role,
          attack_type: attackType,
          description: desc,
          win_rate: champ.winRate || "",
          meta_tier: champ.tier || "",
        });
      }
      changes.push({ name: zhName, action: "created" });
      created++;
    }
  }

  // 更新英雄胜率
  if (!dryRun) {
    for (const champ of amData.champions) {
      const enId = champ.id.toLowerCase();
      const existing = existingMap.get(enId);
      if (existing && (existing.win_rate !== champ.winRate || existing.meta_tier !== champ.tier)) {
        await supabase.from("heroes").update({
          win_rate: champ.winRate || "",
          meta_tier: champ.tier || "",
        }).eq("id", existing.id);
      }
    }
  }

  const log: Partial<UpdateLog> = {
    log_type: "sync-runes",
    title: `英雄数据同步 — ${dryRun ? "预览" : "执行"}`,
    summary: `arammayhem ${amData.champions.length} 英雄 | 本地 ${existingHeroes?.length || 0}\n新增 ${created} | 更新 ${updated} | 跳过 ${skipped}`,
    details: { remoteCount: amData.champions.length, localCount: existingHeroes?.length || 0, created, updated, skipped, changes },
    stats: { remoteCount: amData.champions.length, localCount: existingHeroes?.length || 0, created, updated, skipped },
    run_mode: "manual",
    status: "completed",
  };

  return { result: { created, updated, skipped, changes }, log };
}
