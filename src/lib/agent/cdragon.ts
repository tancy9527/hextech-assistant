// CommunityDragon 官方数据源（游戏文件提取，始终最新版本）
// 动态尝试最新版本 → 逐级回退

function buildSources(): { url: string; version: string }[] {
  const sources: { url: string; version: string }[] = [];
  // 尝试 16.x → 15.x 版本
  for (let major = 16; major >= 15; major--) {
    for (let minor = 9; minor >= 1; minor--) {
      const ver = `${major}.${minor}`;
      sources.push({ url: `https://raw.communitydragon.org/${ver}/game/maps/modespecificdata/kiwi.bin.json`, version: ver });
    }
    // 也尝试 augments.bin.json (旧路径)
    for (let minor = 5; minor >= 1; minor--) {
      const ver = `${major}.${minor}`;
      sources.push({ url: `https://raw.communitydragon.org/${ver}/game/maps/modespecificdata/augments.bin.json`, version: ver });
    }
  }
  return sources;
}

export interface CdragonResult {
  augments: CdragonAugment[];
  version: string;
}

export interface CdragonAugment {
  id: string;
  rarity: number; // 0=silver, 1=gold, 2=prismatic
}

function rarityToTier(r: number): string {
  if (r === 2) return "chromatic";
  if (r === 1) return "gold";
  return "silver";
}

export async function fetchCdragonData(): Promise<CdragonResult> {
  const sources = buildSources();
  for (const src of sources) {
    try {
      const res = await fetch(src.url);
      if (!res.ok) continue;
      const text = await res.text();
      const augs = parseCdragon(text);
      if (augs.length > 50) return { augments: augs, version: src.version };
    } catch { continue; }
  }
  return { augments: [], version: "unknown" };
}

function parseCdragon(text: string): CdragonAugment[] {
  const results: CdragonAugment[] = [];
  const nameRe = /"AugmentNameId"\s*:\s*"([^"]+)"/g;
  const rarityRe = /"rarity"\s*:\s*(\d+)/g;

  const names: { name: string; pos: number }[] = [];
  let m: RegExpExecArray | null;
  while ((m = nameRe.exec(text)) !== null) names.push({ name: m[1], pos: m.index });

  const rarities: { rarity: number; pos: number }[] = [];
  while ((m = rarityRe.exec(text)) !== null) rarities.push({ rarity: parseInt(m[1]), pos: m.index });

  for (const n of names) {
    let rarity = 0, minDist = Infinity;
    for (const r of rarities) {
      const dist = Math.abs(r.pos - n.pos);
      if (dist < 500 && dist < minDist) { minDist = dist; rarity = r.rarity; }
    }
    results.push({ id: n.name, rarity });
  }
  return results;
}

export { rarityToTier };
