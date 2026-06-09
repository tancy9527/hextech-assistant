// 装备同步 — 从DataDragon中文版获取装备 + 从hexdata获取英雄装备推荐

import { createAdminClient } from "@/lib/supabase/admin";
import { fetchHexHeroItems, fetchHexHeroes } from "./hexdata";

interface DDragonItem {
  name: string;
  description: string;
  plaintext: string;
  gold: { total: number; base: number; sell: number; purchasable: boolean };
  image: { full: string };
  from?: string[];
  into?: string[];
  tags: string[];
  maps: Record<string, boolean>;
}

interface EquipDiff {
  game_id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  action: "created" | "updated" | "deactivated" | "unchanged";
  name_diff: boolean;
  desc_diff: boolean;
  price_diff: boolean;
  change_desc: string;
}

function cleanDesc(d: string): string {
  return d.replace(/<[^>]+>/g, "").replace(/\s{2,}/g, " ").trim();
}

// 基于DataDragon tags分类
function classifyByTags(tags: string[]): string {
  const t = new Set(tags);
  // 辅助装
  if (t.has("GoldPer")) return "辅助";
  // 刺客：穿甲
  if (t.has("ArmorPenetration")) return "刺客";
  // 法师
  if (t.has("SpellDamage")) {
    if (t.has("Mana") || t.has("MagicPenetration")) return "法师";
    if (t.has("Health") && t.has("Armor")) return "坦克";
    return "法师";
  }
  // 射手
  if (t.has("CriticalStrike")) {
    if (t.has("AttackSpeed")) return "射手";
    return "战士";
  }
  // 战士
  if (t.has("Damage")) {
    if (t.has("Health") || t.has("LifeSteal")) return "战士";
    if (t.has("AttackSpeed")) return "射手";
    return "战士";
  }
  // 坦克
  const defCount = [t.has("Health"), t.has("Armor"), t.has("SpellBlock")].filter(Boolean).length;
  if (defCount >= 2) return "坦克";
  if (t.has("Health") && !t.has("SpellDamage") && !t.has("Mana")) return "坦克";
  // 辅助
  if (t.has("Aura") || t.has("Active")) return "辅助";
  if (t.has("CooldownReduction") && t.has("Mana")) return "法师";
  // 鞋类
  if (t.has("Boots")) return "通用";
  // 攻击速度 → 射手
  if (t.has("AttackSpeed")) return "射手";

  return "通用";
}

function isCompletedItem(item: DDragonItem): boolean {
  if (!item.gold?.purchasable) return false;
  if (!item.gold?.total || item.gold.total < 1000) return false;
  if (!item.name) return false;
  if (item.tags?.includes("Consumable")) return false;
  if (item.tags?.includes("Trinket")) return false;
  // 成装：不再合成其他装备（into 为空）
  if (item.into && item.into.length > 0) return false;
  if (item.tags?.includes("Jungle")) return false;
  return true;
}

function isStarterItem(item: DDragonItem): boolean {
  if (!item.gold?.purchasable) return false;
  const p = item.gold?.total || 0;
  if (p < 300 || p >= 1000) return false;
  if (!item.name) return false;
  if (item.tags?.includes("Consumable")) return false;
  if (item.tags?.includes("Trinket")) return false;
  if (item.tags?.includes("Jungle")) return false;
  return true;
}

async function getDDragonVersion(): Promise<string> {
  const res = await fetch("https://ddragon.leagueoflegends.com/api/versions.json");
  const versions: string[] = await res.json();
  return versions[0];
}

// ====== 装备池同步（DataDragon中文版，仅成装） ======
export async function syncEquipment(options: { dryRun?: boolean; equipIds?: string[] }) {
  const { dryRun = false, equipIds } = options;
  const equipSet = equipIds ? new Set(equipIds) : null;
  const supabase = createAdminClient();

  const version = await getDDragonVersion();
  const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/zh_CN/item.json`);
  const raw = await res.json();
  const allItems: [string, DDragonItem][] = Object.entries(raw.data);

  // ARAM可用的成装 + 小件（出门装）
  const allValidItems: [string, DDragonItem, string][] = []; // [id, item, type]
  for (const [id, item] of allItems) {
    if (item.maps && !item.maps["12"]) continue;
    if (isCompletedItem(item)) {
      allValidItems.push([id, item, "成装"]);
    } else if (isStarterItem(item)) {
      allValidItems.push([id, item, "小件"]);
    }
  }

  const { data: existing } = await supabase.from("equipment").select("*");
  const existingMap = new Map<string, any>();
  for (const e of existing || []) existingMap.set(e.game_id, e);

  const remoteIds = new Set(allValidItems.map(([id]) => id));
  const diffs: EquipDiff[] = [];

  for (const [id, item, itemType] of allValidItems) {
    if (!dryRun && equipSet && !equipSet.has(id)) continue;

    const name = item.name;
    const desc = cleanDesc(item.description || "");
    const price = item.gold?.total || 0;
    const category = itemType === "小件" ? "小件" : classifyByTags(item.tags || []);
    const icon = `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.image?.full || ""}`;

    const local = existingMap.get(id);

    if (local) {
      const nameDiff = local.name !== name;
      const descDiff = local.description !== desc;
      const priceDiff = local.price !== price;
      const cd: string[] = [];
      if (nameDiff) cd.push(`名称变更: "${local.name}" → "${name}"`);
      if (descDiff) cd.push("描述更新");
      if (priceDiff) cd.push(`价格${local.price}→${price}`);

      if (nameDiff || descDiff || priceDiff) {
        diffs.push({
          game_id: id, name, description: desc,
          price, category, action: "updated",
          name_diff: nameDiff, desc_diff: descDiff, price_diff: priceDiff,
          change_desc: cd.join("；"),
        });
      }

      if (!dryRun && (nameDiff || descDiff || priceDiff)) {
        await supabase.from("equipment").update({
          name, description: desc, price, icon_url: icon, category,
        }).eq("game_id", id);
      }
    } else {
      diffs.push({
        game_id: id, name, description: desc,
        price, category, action: "created",
        name_diff: false, desc_diff: false, price_diff: false,
        change_desc: "新增成装",
      });

      if (!dryRun) {
        await supabase.from("equipment").insert({
          game_id: id, name, description: desc,
          price, icon_url: icon, category,
        });
      }
    }
  }

  // 本地有但远程没有的 → 标记停用
  for (const gameId of Array.from(existingMap.keys())) {
    const local = existingMap.get(gameId);
    if (!remoteIds.has(gameId) && local && local.is_active !== false) {
      if (!dryRun && equipSet && !equipSet.has(gameId)) continue;
      diffs.push({
        game_id: gameId, name: local.name,
        description: local.description || "",
        price: local.price || 0,
        category: local.category || "通用",
        action: "deactivated",
        name_diff: false, desc_diff: false, price_diff: false,
        change_desc: "当前版本已移除或非ARAM装备",
      });
      if (!dryRun) {
        await supabase.from("equipment").update({ is_active: false }).eq("game_id", gameId);
      }
    }
  }

  const created = diffs.filter(d => d.action === "created").length;
  const updated = diffs.filter(d => d.action === "updated").length;
  const deactivated = diffs.filter(d => d.action === "deactivated").length;

  return {
    diffs, created, updated, deactivated,
    total: allValidItems.length,
    localCount: existingMap.size,
    version,
  };
}

// ====== 装备推荐同步 ======
export async function syncEquipmentRecs(options: { dryRun?: boolean; heroIds?: string[] }) {
  const { dryRun = false, heroIds } = options;
  const heroSet = heroIds ? new Set(heroIds) : null;
  const supabase = createAdminClient();

  const { byHeroName } = await fetchHexHeroItems();

  // 获取hexdata英雄列表用于名称匹配（searchTerms）
  const hexHeroes = await fetchHexHeroes().catch(() => []);
  const hexHeroByName = new Map<string, any>();
  for (const hh of hexHeroes) {
    hexHeroByName.set(hh.name, hh);
    if (hh.searchTerms) {
      for (const alias of hh.searchTerms) hexHeroByName.set(alias, hh);
    }
    hexHeroByName.set(hh.id.toLowerCase(), hh);
  }

  const { data: heroes } = await supabase.from("heroes").select("id, name, nicknames, title");
  const heroByName = new Map<string, string>();
  const heroByTitle = new Map<string, string>();
  for (const h of heroes || []) {
    heroByName.set(h.name, h.id);
    // 从title提取英文名
    const enMatch = h.title?.match(/^(\w+)\s*—/) || h.title?.match(/^([\w']+)\s*—/);
    if (enMatch) heroByTitle.set(enMatch[1].toLowerCase(), h.id);
    // 从nicknames匹配
    if (h.nicknames) {
      for (const nn of h.nicknames.split(/[,，、]/)) {
        heroByName.set(nn.trim(), h.id);
      }
    }
  }

  // 建立 hexdata名称 → local hero_id 映射
  const heroMap = new Map<string, string>();
  for (const [hexName] of Object.entries(byHeroName)) {
    // 1. 直接名称匹配
    let hid = heroByName.get(hexName);
    // 2. 通过hexdata heroes searchTerms匹配
    if (!hid) {
      const hx = hexHeroByName.get(hexName);
      if (hx) {
        hid = heroByName.get(hx.name);
        if (!hid && hx.searchTerms) {
          for (const alias of hx.searchTerms) {
            hid = heroByName.get(alias);
            if (hid) break;
          }
        }
        // 通过英文ID查title
        if (!hid) hid = heroByTitle.get(hx.id.toLowerCase());
        // 直接查DB name
        if (!hid) hid = heroByName.get(hx.id);
      }
    }
    // 3. 通过title英文名匹配
    if (!hid) hid = heroByTitle.get(hexName.toLowerCase());
    if (hid) heroMap.set(hexName, hid);
  }

  const { data: equipList } = await supabase.from("equipment").select("id, game_id, name");
  const equipGameMap = new Map<string, string>();
  for (const e of equipList || []) equipGameMap.set(e.game_id, e.id);

  // 查询已有装备推荐（用于diff，不限流派）
  const { data: existingRecs } = await supabase.from("hero_equipment_recs").select("hero_id, playstyle_id, starter_items, core_items, alt_items");
  const existingByHero = new Map<string, any>();
  for (const er of existingRecs || []) {
    // 按英雄去重，优先保留有 playstyle_id 的记录
    if (!existingByHero.has(er.hero_id) || er.playstyle_id) {
      existingByHero.set(er.hero_id, er);
    }
  }

  // 预加载通用流派 playstyle
  const { data: allPlaystyles } = await supabase.from("hero_playstyles").select("id, hero_id, name").eq("name", "通用流派");
  const playstyleByHero = new Map<string, string>();
  for (const ps of allPlaystyles || []) playstyleByHero.set(ps.hero_id, ps.id);

  // 为缺少通用流派的英雄自动创建
  const heroesNeedPs: string[] = []; // hexName → heroId
  for (const [hexName] of Object.entries(byHeroName)) {
    const heroId = heroMap.get(hexName);
    if (heroId && !playstyleByHero.has(heroId)) heroesNeedPs.push(heroId);
  }
  if (!dryRun && heroesNeedPs.length > 0) {
    // 去重后批量创建
    const uniqueHeroes = Array.from(new Set(heroesNeedPs));
    const inserts = uniqueHeroes.map(hid => ({ hero_id: hid, name: "通用流派", description: "hexdata装备推荐" }));
    for (let i = 0; i < inserts.length; i += 30) {
      const batch = inserts.slice(i, i + 30);
      const { data: created } = await supabase.from("hero_playstyles").insert(batch).select("id, hero_id");
      for (const ps of created || []) playstyleByHero.set(ps.hero_id, ps.id);
    }
  }

  let synced = 0;
  const errors: string[] = [];
  const diffs: any[] = [];
  const upsertPayloads: any[] = [];

  for (const [hexName, data] of Object.entries(byHeroName)) {
    const heroId = heroMap.get(hexName);
    if (!heroId) continue;
    if (!dryRun && heroSet && !heroSet.has(heroId)) continue;

    const starterItems = (data.starterItems || []).map((s: any) => ({
      name: s.name, id: s.id, equip_id: equipGameMap.get(s.id) || "",
    }));
    const coreItems = (data.coreItems || []).map((c: any) => ({
      name: c.name, id: c.id, equip_id: equipGameMap.get(c.id) || "",
    }));

    const existing = existingByHero.get(heroId);
    const oldStarters = (existing?.starter_items || []).map((s: any) => s.name).join("、") || "无";
    const oldCores = (existing?.core_items || []).map((c: any) => c.name).join("、") || "无";
    const newStarters = starterItems.map((s: any) => s.name).join("、") || "无";
    const newCores = coreItems.map((c: any) => c.name).join("、") || "无";
    const hasChange = oldStarters !== newStarters || oldCores !== newCores;

    // 跳过无变化的英雄
    if (existing && !hasChange) { synced++; continue; }

    const action = existing ? "updated" : "created";
    const change = existing
      ? `出门:${oldStarters}→${newStarters} | 核心:${oldCores}→${newCores}`
      : `新增: 出门${newStarters} 核心${newCores}`;

    diffs.push({ hero_id: heroId, heroName: hexName, starterItems, coreItems, action, change, oldStarters, newStarters, oldCores, newCores });

    if (!dryRun) {
      const psId = playstyleByHero.get(heroId) || null;
      upsertPayloads.push({
        hero_id: heroId,
        playstyle_id: psId,
        starter_items: starterItems,
        core_items: coreItems,
        source: "hexdata",
      });
    }
    synced++;
  }

  // 批量写入（大幅提速）
  if (!dryRun && upsertPayloads.length > 0) {
    // 分批 upsert，每批 30 个
    for (let i = 0; i < upsertPayloads.length; i += 30) {
      const batch = upsertPayloads.slice(i, i + 30);
      const { error } = await supabase.from("hero_equipment_recs").upsert(batch, {
        onConflict: "hero_id, playstyle_id",
      });
      if (error) errors.push(`批量写入失败: ${error.message}`);
    }
  }

  return { synced, errors: errors.length, diffs };
}
