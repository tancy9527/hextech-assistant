// 装备同步 — 从CDragon获取装备基础数据 + 从hexdata获取英雄装备推荐

import { createAdminClient } from "@/lib/supabase/admin";
import { fetchHexHeroItems } from "./hexdata";
import type { UpdateLog } from "./types";

interface CdragonItem {
  id: string; name: string; description: string;
  price?: number; iconPath?: string;
  from?: string[]; to?: string[];
}

// 清理HTML描述标签
function cleanDesc(d: string): string {
  return d.replace(/<[^>]+>/g, "").replace(/\s{2,}/g, " ").trim();
}

// ====== 装备池同步 ======
export async function syncEquipment(options: { dryRun?: boolean }) {
  const { dryRun = false } = options;
  const supabase = createAdminClient();

  // 获取CDragon装备数据
  const res = await fetch("https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/items.json");
  const items: CdragonItem[] = await res.json();

  // 过滤：只要可购买的装备（有价格且>0，排除消耗品和小件）
  const validItems = items.filter(i => i.price && i.price >= 300 && i.name && !i.name.includes("Boots") === false);

  const { data: existing } = await supabase.from("equipment").select("game_id");
  const existingIds = new Set((existing || []).map((e: any) => e.game_id));

  let created = 0, updated = 0;

  for (const item of validItems) {
    const icon = item.iconPath ? `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default${item.iconPath.replace("/lol-game-data/assets/", "/")}` : "";

    if (existingIds.has(item.id)) {
      if (!dryRun) {
        await supabase.from("equipment").update({
          name: item.name, description: cleanDesc(item.description || ""),
          price: item.price || 0, icon_url: icon,
        }).eq("game_id", item.id);
      }
      updated++;
    } else {
      if (!dryRun) {
        await supabase.from("equipment").insert({
          game_id: item.id, name: item.name,
          description: cleanDesc(item.description || ""),
          price: item.price || 0, icon_url: icon,
        });
      }
      created++;
    }
  }

  return { created, updated, total: validItems.length };
}

// ====== 装备推荐同步 ======
export async function syncEquipmentRecs(options: { dryRun?: boolean }) {
  const { dryRun = false } = options;
  const supabase = createAdminClient();

  const { byHeroName } = await fetchHexHeroItems();

  // 获取本地英雄
  const { data: heroes } = await supabase.from("heroes").select("id, name");
  const heroMap = new Map<string, string>();
  for (const h of heroes || []) heroMap.set(h.name, h.id);

  // 获取装备映射(game_id → equipment.id)
  const { data: equipList } = await supabase.from("equipment").select("id, game_id");
  const equipMap = new Map<string, string>();
  for (const e of equipList || []) equipMap.set(e.game_id, e.id);

  let synced = 0;
  const errors: string[] = [];

  for (const [name, data] of Object.entries(byHeroName)) {
    const heroId = heroMap.get(name);
    if (!heroId) continue;

    const starterItems = (data.starterItems || []).map((s: any) => ({
      name: s.name, id: s.id, equip_id: equipMap.get(s.id) || "",
    }));
    const coreItems = (data.coreItems || []).map((c: any) => ({
      name: c.name, id: c.id, equip_id: equipMap.get(c.id) || "",
    }));

    if (!dryRun) {
      const { data: exist } = await supabase.from("hero_equipment_recs").select("id").eq("hero_id", heroId).is("playstyle_id", null).limit(1);
      // 找到或创建通用流派
      const { data: ps } = await supabase.from("hero_playstyles").select("id").eq("hero_id", heroId).eq("name", "通用流派").limit(1);
      const psId = ps?.[0]?.id || null;

      if (exist?.[0]) {
        await supabase.from("hero_equipment_recs").update({ starter_items: starterItems, core_items: coreItems }).eq("id", exist[0].id);
      } else {
        const { error } = await supabase.from("hero_equipment_recs").insert({
          hero_id: heroId, playstyle_id: psId,
          starter_items: starterItems, core_items: coreItems, source: "hexdata",
        });
        if (error) errors.push(`${name}: ${error.message}`);
      }
    }
    synced++;
  }

  return { synced, errors: errors.length };
}
