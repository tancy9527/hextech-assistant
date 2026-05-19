/**
 * 海克斯符文数据同步脚本
 * 从 CommunityDragon 获取最新符文数据，对比本地 rune-overrides.json 和 seed.sql，
 * 检测差异并输出中文提示。
 *
 * 用法: npm run sync-runes
 *
 * 数据源:
 *   CDragon 16.3+: kiwi.bin.json (ARAM Mayhem 内部代号 "Kiwi")
 *   CDragon 15.23-16.1: augments.bin.json (旧路径)
 */

import * as fs from "node:fs";
import * as path from "node:path";

const REPO_ROOT = path.resolve(__dirname, "..");

// CDragon URLs (tried in order)
const CDRAGON_SOURCES = [
  "https://raw.communitydragon.org/16.3/game/maps/modespecificdata/kiwi.bin.json",
  "https://raw.communitydragon.org/16.1/game/maps/modespecificdata/augments.bin.json",
  "https://raw.communitydragon.org/15.23/game/maps/modespecificdata/augments.bin.json",
];

interface RemoteAugment {
  id: string;       // AugmentNameId, e.g. "ARAM_LegDay"
  rarity: number;   // 0=silver, 1=gold, 2=prismatic
  tags: number[];   // AugmentDisplayTags
}

interface LocalOverride {
  nameEn: string;
  name: string;
  tier?: string;
  quality?: string;
  special_label?: string;
}

interface DiffReport {
  newRunes: string[];
  missingOverrides: string[];
  removedOverrides: string[];
  tierChanges: { nameEn: string; from: string; to: string }[];
}

// ============================================================
// Main
// ============================================================
async function main() {
  console.log("🔍 海克斯符文同步脚本\n");
  console.log("=".repeat(50));

  // 1. Fetch CDragon data
  console.log("📥 尝试下载 CommunityDragon 数据...");
  let remote: RemoteAugment[] = [];

  for (const url of CDRAGON_SOURCES) {
    try {
      console.log(`   尝试: ${url.split("/").slice(-2).join("/")}`);
      const res = await fetch(url);
      if (!res.ok) { console.log(`   ❌ HTTP ${res.status}`); continue; }
      const text = await res.text();
      remote = parseAugments(text);
      if (remote.length > 0) {
        console.log(`   ✅ 解析到 ${remote.length} 个符文`);
        break;
      }
    } catch (err) {
      console.log(`   ❌ ${(err as Error).message}`);
    }
  }

  if (remote.length === 0) {
    console.log("❌ 无法从任何源获取数据。请检查网络连接。");
    process.exit(1);
  }

  // 2. Load local overrides
  console.log("\n📄 加载本地 overrides...");
  const overrides = loadOverrides();
  console.log(`   ✅ ${overrides.length} 条覆盖记录`);

  // 3. Compare
  console.log("\n🔍 对比差异...");
  const diff = computeDiff(remote, overrides);
  printReport(diff, remote, overrides);

  console.log("\n" + "=".repeat(50));
  console.log("✅ 同步检查完成");
  console.log("💡 如需添加翻译: 编辑 scripts/rune-overrides.json");
  console.log("💡 如需更新数据库: 编辑 supabase/seed.sql，然后在 Supabase 后台执行");
}

// ============================================================
// Parse CDragon JSON
// ============================================================
function parseAugments(text: string): RemoteAugment[] {
  const results: RemoteAugment[] = [];
  // Extract AugmentNameId, rarity, and AugmentDisplayTags from JSON
  const nameRe = /"AugmentNameId"\s*:\s*"([^"]+)"/g;
  const rarityRe = /"rarity"\s*:\s*(\d+)/g;
  const tagsRe = /"AugmentDisplayTags"\s*:\s*\[([^\]]*)\]/g;

  // Build a map from position to augment entry
  // Strategy: find all AugmentNameId entries, then look for nearby rarity and tags
  const entries: { name: string; pos: number }[] = [];
  let m: RegExpExecArray | null;
  while ((m = nameRe.exec(text)) !== null) {
    entries.push({ name: m[1], pos: m.index });
  }

  const rarities: { rarity: number; pos: number }[] = [];
  while ((m = rarityRe.exec(text)) !== null) {
    rarities.push({ rarity: parseInt(m[1]), pos: m.index });
  }

  const tagLists: { tags: number[]; pos: number }[] = [];
  while ((m = tagsRe.exec(text)) !== null) {
    const tags = m[1] ? m[1].split(",").map((s: string) => parseInt(s.trim())) : [];
    tagLists.push({ tags, pos: m.index });
  }

  // Match augment names with nearest rarity and tags
  // Rarity and tags appear before or after the augment name in a small window
  for (const entry of entries) {
    // Skip non-augment entries (StatAnvil, Upgrade without ARAM_ prefix, etc)
    // We include all for completeness but will flag missing overrides

    // Find nearest rarity (within 500 chars before or after)
    let rarity = 0; // default silver
    let minDist = Infinity;
    for (const r of rarities) {
      const dist = Math.abs(r.pos - entry.pos);
      if (dist < 500 && dist < minDist) {
        minDist = dist;
        rarity = r.rarity;
      }
    }

    // Find nearest tags
    let tags: number[] = [];
    minDist = Infinity;
    for (const t of tagLists) {
      const dist = Math.abs(t.pos - entry.pos);
      if (dist < 500 && dist < minDist) {
        minDist = dist;
        tags = t.tags;
      }
    }

    results.push({ id: entry.name, rarity, tags });
  }

  return results;
}

// ============================================================
// Local data
// ============================================================
function loadOverrides(): LocalOverride[] {
  const p = path.join(REPO_ROOT, "scripts", "rune-overrides.json");
  try {
    return JSON.parse(fs.readFileSync(p, "utf-8"));
  } catch {
    console.log("   ⚠️ rune-overrides.json 不存在或格式错误");
    return [];
  }
}

// ============================================================
// Diff
// ============================================================
function computeDiff(remote: RemoteAugment[], overrides: LocalOverride[]): DiffReport {
  const overrideMap = new Map(overrides.map((o) => [o.nameEn, o]));
  const overrideNames = new Set(overrides.map((o) => o.nameEn));

  const report: DiffReport = {
    newRunes: [],
    missingOverrides: [],
    removedOverrides: [],
    tierChanges: [],
  };

  // Check for new runes (in remote but not in overrides)
  for (const aug of remote) {
    if (!overrideNames.has(aug.id)) {
      report.newRunes.push(aug.id);
    } else {
      // Check tier consistency
      const ov = overrideMap.get(aug.id)!;
      const remoteTier = rarityToTier(aug.rarity);
      const localTier = ov.tier || ov.quality || "silver";
      if (remoteTier !== localTier && ov.tier) {
        report.tierChanges.push({
          nameEn: aug.id,
          from: localTier,
          to: remoteTier,
        });
      }
    }
  }

  // Check for overrides not in remote
  for (const ov of overrides) {
    if (!remote.some((r) => r.id === ov.nameEn)) {
      report.removedOverrides.push(ov.nameEn);
    }
  }

  // Missing overrides are new runes that need translation
  report.missingOverrides = report.newRunes;

  return report;
}

function rarityToTier(rarity: number): string {
  switch (rarity) {
    case 2: return "chromatic";
    case 1: return "gold";
    default: return "silver";
  }
}

function tierLabel(t: string): string {
  switch (t) {
    case "chromatic": return "彩色(棱彩)";
    case "gold": return "金色";
    case "silver": return "银色";
    default: return t;
  }
}

// ============================================================
// Report
// ============================================================
function printReport(diff: DiffReport, remote: RemoteAugment[], overrides: LocalOverride[]) {
  // Stats
  const remotePrismatic = remote.filter((r) => r.rarity === 2).length;
  const remoteGold = remote.filter((r) => r.rarity === 1).length;
  const remoteSilver = remote.filter((r) => r.rarity === 0).length;

  console.log(`\n📊 远程数据: ${remote.length} 个符文 (彩色:${remotePrismatic} 金色:${remoteGold} 银色:${remoteSilver})`);
  console.log(`📊 本地覆盖: ${overrides.length} 个已有翻译`);

  if (diff.newRunes.length === 0 && diff.removedOverrides.length === 0 && diff.tierChanges.length === 0) {
    console.log("\n✅ 数据与远程一致，无需更新");
    return;
  }

  if (diff.newRunes.length > 0) {
    console.log(`\n⚠️ 发现 ${diff.newRunes.length} 个新符文（远程有但本地无翻译）：`);
    for (const name of diff.newRunes.slice(0, 30)) {
      const aug = remote.find((r) => r.id === name);
      const tier = aug ? rarityToTier(aug.rarity) : "?";
      console.log(`   + ${name} [${tierLabel(tier)}]`);
    }
    if (diff.newRunes.length > 30) {
      console.log(`   ... 还有 ${diff.newRunes.length - 30} 个`);
    }
    console.log("   👉 请在 scripts/rune-overrides.json 中添加中文翻译");
  }

  if (diff.removedOverrides.length > 0) {
    console.log(`\n⚠️ 以下 ${diff.removedOverrides.length} 个符文在远程数据中不存在：`);
    for (const name of diff.removedOverrides) {
      console.log(`   - ${name}`);
    }
    console.log("   👉 可能已被移除或改名，建议在 seed.sql 中设置 is_active=false");
  }

  if (diff.tierChanges.length > 0) {
    console.log(`\n⚠️ 以下符文品质发生变化：`);
    for (const tc of diff.tierChanges) {
      console.log(`   ~ ${tc.nameEn}: 「${tierLabel(tc.from)}」→「${tierLabel(tc.to)}」`);
    }
  }
}

// Run
main().catch((err) => {
  console.error("❌ 同步脚本出错:", err);
  process.exit(1);
});
