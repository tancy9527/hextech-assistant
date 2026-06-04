// hexdata.com.cn 数据站数据获取模块
// 提供：符文胜率统计、英雄详细数据、装备推荐、版本趋势

const HEXDATA_BASE = "https://hexdata.com.cn/data";

// 清理描述中的变量占位符 %i:variable%
export function cleanHexDesc(desc: string): string {
  if (!desc) return "";
  return desc
    .replace(/%i:[^%]*%/g, "[数值]")
    .replace(/%\w[^%]{0,20}%/g, "")
    .replace(/\?\s*/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export interface HexAugment {
  id: string;
  name: string;
  tier: number;
  wins: number;
  games: number;
  rarity: string;
  iconUrl: string;
  winRate: number;
  pickRate: number;
  description: string;
  avgDeltaWinRate: number;
  coverageHeroCount: number;
}

export interface HexHero {
  id: string;
  name: string;
  tier: number;
  wins: number;
  games: number;
  patch: string;
  roles: string[];
  roleTags: string[];
  winRate: number;
  pickRate: number;
  kda: number;
  avgKills: number;
  avgDeaths: number;
  avgAssists: number;
  avgDamage: number;
  avgGold: number;
  avgCs: number;
  imageUrl: string;
  searchTerms: string[];
  topAugments: { id: string; name: string; rarity: string; iconUrl: string; description: string }[];
  winRateChange?: number;
  previousWinRate?: number;
  previousPickRate?: number;
  previousGames?: number;
  previousPatch?: string;
}

export interface HexHeroItems {
  heroId: string;
  heroName: string;
  label: string;
  starterItems: { name: string; id: string }[];
  coreItems: { name: string; id: string }[];
}

export interface HexFunData {
  patch: string;
  generatedAt: string;
  augmentedSets: any[];
  versionWinners: any[];
  versionLosers: any[];
  hiddenGems: any[];
}

async function fetchJSON<T>(path: string): Promise<T> {
  const res = await fetch(`${HEXDATA_BASE}/${path}`);
  if (!res.ok) throw new Error(`hexdata ${path}: HTTP ${res.status}`);
  return res.json();
}

export async function fetchHexAugments(): Promise<HexAugment[]> {
  const data = await fetchJSON<Record<string, HexAugment>>("augments.json");
  return Object.values(data);
}

export async function fetchHexHeroes(): Promise<HexHero[]> {
  return fetchJSON<HexHero[]>("heroes.json");
}

export async function fetchHexHeroItems(): Promise<{
  items: HexHeroItems[];
  byHeroId: Record<string, HexHeroItems>;
  byHeroName: Record<string, HexHeroItems>;
}> {
  const data = await fetchJSON<any>("hero_formula_items.json");
  return {
    items: data.items || Object.values(data).filter((v: any) => v && v.heroId),
    byHeroId: data.byHeroId || {},
    byHeroName: data.byHeroName || {},
  };
}

export async function fetchHexFunData(): Promise<HexFunData> {
  return fetchJSON<HexFunData>("fun_data.json");
}
