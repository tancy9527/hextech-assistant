// 羁绊套装同步 — 从 arammayhem.com synergySets 数据同步到 fetters + rune_fetters 表

import { createAdminClient } from "@/lib/supabase/admin";
import { fetchAramMayhemData } from "./arammayhem";
import type { UpdateLog } from "./types";

export async function syncFetters(options: {
  dryRun?: boolean;
}): Promise<{ created: number; updated: number; log: Partial<UpdateLog> }> {
  const { dryRun = false } = options;
  const amData = await fetchAramMayhemData();
  const supabase = dryRun ? null : createAdminClient();

  let created = 0;
  let updated = 0;

  if (!dryRun && supabase) {
    const { data: runes } = await supabase.from("runes").select("id, name").eq("is_active", true);
    const amAugmentNames = new Map(amData.augments.map((a) => [a.id, a.name_cn]));
    const runeMap = new Map<string, string>();
    if (runes) {
      const amEntries = Array.from(amAugmentNames.entries());
      for (const r of runes) {
        for (let k = 0; k < amEntries.length; k++) {
          const [augId, augNameCn] = amEntries[k];
          if (augNameCn === r.name) { runeMap.set(augId, r.id); break; }
        }
      }
    }

    for (const set of amData.synergySets) {
      const { data: existingFetter } = await supabase
        .from("fetters").select("id").eq("name", set.name_cn).limit(1);

      let fetterId: string;

      if (existingFetter && existingFetter.length > 0) {
        fetterId = existingFetter[0].id;
        await supabase.from("fetters").update({
          description: set.description_cn,
          icon_url: set.icon,
        }).eq("id", fetterId);
        updated++;
      } else {
        const { data: newFetter } = await supabase.from("fetters").insert({
          name: set.name_cn,
          description: set.description_cn,
          icon_url: set.icon,
        }).select("id").single();
        if (newFetter) { fetterId = newFetter.id; created++; }
        else continue;
      }

      for (const augId of set.augments) {
        const runeId = runeMap.get(augId);
        if (!runeId) continue;

        const { data: existingLink } = await supabase
          .from("rune_fetters").select("id").eq("rune_id", runeId).eq("fetter_id", fetterId).limit(1);

        if (!existingLink || existingLink.length === 0) {
          await supabase.from("rune_fetters").insert({ rune_id: runeId, fetter_id: fetterId });
        }
      }
    }
  }

  const log: Partial<UpdateLog> = {
    log_type: "sync-runes",
    title: `羁绊套装同步 (P${amData.patch})`,
    summary: `创建 ${created} 个羁绊，更新 ${updated} 个羁绊`,
    details: { patch: amData.patch, created, updated, sets: amData.synergySets.map((s) => s.name_cn) },
    stats: { created, updated, totalSets: amData.synergySets.length },
    run_mode: "manual",
    status: "completed",
  };

  return { created, updated, log };
}
