// arammayhem.com 数据获取和解析
// 该网站提供 209 个符文（含官方中文名）、666 个英雄-符文组合、9 个羁绊套装
// 每版本更新，是主要数据来源

const ARAMMAYHEM_SEARCH_URL = "https://arammayhem.com/search-index.json";

// 清理描述中的格式化标签，保留完整文本
function cleanDesc(desc: string): string {
  return desc
    .replace(/\[stat:[^\]]*\]|\[\/stat\]/g, "")  // [stat:cc]...[/stat]
    .replace(/\[b\]|\[\/b\]/g, "")                 // [b]...[/b]
    .replace(/\[br\/\]/g, "")                       // [br/]
    .replace(/<[^>]+>/g, "")                        // <keywordMajor>
    .replace(/@[^@]*@/g, "")                        // @variable@
    .replace(/%\w[^%]{0,20}%/g, "")                  // %i:cooldown% (短变量，避免误删百分号)
    .replace(/\s{2,}/g, " ")                        // 多余空格
    .trim();
}

export interface AramAugment {
  id: string;
  name_cn: string;
  rarity: string;
  description_cn: string;
  icon: string;
}

export interface AramSynergySet {
  id: string;
  slug: string;
  name_cn: string;
  description_cn: string;
  augments: string[];
  icon: string;
}

export interface AramCombo {
  slug: string;
  championId: string;
  augmentIds: string[];
  tier: string;
  desc_cn: string;
}

export interface AramChampion {
  id: string;
  name: { en?: string; "zh-CN"?: string };
  title?: { en?: string; "zh-CN"?: string };
  tier: string;
  winRate: string;
  icon: string;
}

export interface AramData {
  patch: string;
  augments: AramAugment[];
  synergySets: AramSynergySet[];
  combos: AramCombo[];
  champions: AramChampion[];
}

/**
 * 从 arammayhem.com 获取完整数据集
 */
export async function fetchAramMayhemData(): Promise<AramData> {
  const res = await fetch(ARAMMAYHEM_SEARCH_URL);
  if (!res.ok) throw new Error(`arammayhem.com 请求失败: HTTP ${res.status}`);

  const raw = await res.json();

  // 解析符文
  const augments: AramAugment[] = (raw.augments || []).map((a: any) => ({
    id: a.id,
    name_cn: a.name_cn || a.name?.["zh-CN"] || a.name?.en || a.id,
    rarity: a.rarity || "silver",
    description_cn: cleanDesc(a.description?.["zh-CN"] || a.description?.en || ""),
    icon: a.icon ? `https://arammayhem.com${a.icon}` : "",
  }));

  // 解析羁绊套装
  const synergySets: AramSynergySet[] = (raw.synergySets || []).map((s: any) => ({
    id: s.id,
    slug: s.slug,
    name_cn: s.name?.["zh-CN"] || s.name?.en || s.id,
    description_cn: (s.description?.["zh-CN"] || s.description?.en || "").replace(/\[stat:[^\]]*\]|\[b\]|\[\/b\]|\[br\/\]/g, ""),
    augments: s.augments || [],
    icon: s.icon ? `https://arammayhem.com${s.icon}` : "",
  }));

  // 解析英雄-符文组合
  const combos: AramCombo[] = (raw.combos || []).map((c: any) => ({
    slug: c.slug,
    championId: c.championId,
    augmentIds: c.augmentIds || [],
    tier: c.tier || "B",
    desc_cn: c.desc?.["zh-CN"] || c.desc?.en || "",
  }));

  // 解析英雄胜率
  const champions: AramChampion[] = (raw.champions || []).map((c: any) => ({
    id: c.id || c.championId || "",
    name: c.name || {},
    title: c.title || {},
    tier: c.tier || "",
    winRate: c.winRate || "",
    icon: c.icon || "",
  }));

  // 过滤掉网站已下架的符文（search-index.json含有但网页不展示的）
  const REMOVED_IDS = new Set([
    "chain_reaction", "echo_cast", "endless_decimation", "from_downtown",
    "hellbent", "multishot", "poro_stampede", "pressure_cooker",
    "shark_tempest", "siphon", "spell_split", "support_main",
    "tooth_fairy", "tripleshot",
  ]);
  const activeAugments = augments.filter(a => !REMOVED_IDS.has(a.id));

  return {
    patch: raw.patch || "unknown",
    augments: activeAugments,
    synergySets,
    combos,
    champions,
  };
}
