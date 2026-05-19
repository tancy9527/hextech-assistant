export type AttackType = "AP" | "AD" | "Tank" | "Support";
export type RuneQuality = "silver" | "gold" | "prismatic";
export type RuneTier = "chromatic" | "gold" | "silver";
export type GamePhase = "3" | "7" | "11" | "15";
export type EffectType = "damage" | "defense" | "mobility" | "utility" | "sustain";

export interface Hero {
  id: string;
  name: string;
  title: string;
  role: string;
  attack_type: AttackType;
  description: string;
  image_url?: string;
  nicknames?: string;
  created_at?: string;
}

export interface Rune {
  id: string;
  name: string;
  description: string;
  quality: RuneQuality;
  tier: RuneTier;
  effect_type: EffectType;
  pros?: string;
  cons?: string;
  scenarios?: string;
  icon_url?: string;
  special_label?: string;
  is_active?: boolean;
  created_at?: string;
}

export interface Playstyle {
  id: string;
  hero_id: string;
  name: string;
  description: string;
  created_at?: string;
}

export interface RuneSynergy {
  id: string;
  rune_id: string;
  synergizes_with: string;
  synergy_score: number;
  reason: string;
}

export interface HeroRuneRecommendation {
  id: string;
  hero_id: string;
  rune_id: string;
  playstyle_id?: string;
  phase: GamePhase;
  priority_score: number;
  reason: string;
  build_synergy: string;
  adjustment_tags: string[];
  fetter_boost?: string[];
  created_at?: string;
}

export interface Fetter {
  id: string;
  name: string;
  description: string;
  effect_2?: string;
  effect_3?: string;
  effect_4?: string;
  icon_url?: string;
  created_at?: string;
}

export interface RuneFetter {
  id: string;
  rune_id: string;
  fetter_id: string;
  runes?: Rune;
  created_at?: string;
}

export interface BuildCard {
  id: string;
  hero_id: string;
  playstyle_id?: string;
  image_url: string;
  title?: string;
  description?: string;
  created_at?: string;
  heroes?: { name: string };
  hero_playstyles?: { name: string };
}

export interface RecommendationResult {
  rune: Rune;
  priority_score: number;
  adjusted_score: number;
  reason: string;
  build_synergy: string;
  boost_reasons: string[];
  is_top: boolean;
  is_selected: boolean;
  is_excluded?: boolean;
  exclude_reason?: "selected" | "seen";
}

export interface GameSession {
  id: string;
  hero_id: string | null;
  started_at: string;
  is_active: boolean;
  selected_tags: string[];
  created_at?: string;
}

export interface SelectedRuneEntry {
  runeId: string;
  phase: GamePhase;
}

export interface ExcludedRunes {
  selected: SelectedRuneEntry[];
  seen: string[];
}

export interface TeamTag {
  key: string;
  label: string;
  icon: string;
}

export interface TierFilter {
  key: RuneTier | "all";
  label: string;
  color: string;
}

export const PHASE_LABELS: Record<GamePhase, string> = {
  "3": "Lv.3 开局",
  "7": "Lv.7",
  "11": "Lv.11",
  "15": "Lv.15",
};

export const PHASE_ORDER: GamePhase[] = ["3", "7", "11", "15"];

export const PHASE_THRESHOLDS: Record<
  GamePhase,
  { timeSec: number; label: string }
> = {
  "3": { timeSec: 0, label: "选择第一个海克斯符文" },
  "7": { timeSec: 360, label: "选择第二个海克斯符文" },
  "11": { timeSec: 780, label: "选择第三个海克斯符文" },
  "15": { timeSec: 1440, label: "选择终极海克斯符文" },
};

export const TEAM_TAGS: TeamTag[] = [
  { key: "anti_ad", label: "敌方AD多", icon: "⚔️" },
  { key: "anti_ap", label: "敌方AP多", icon: "🔮" },
  { key: "anti_cc", label: "控制多", icon: "⛓️" },
  { key: "anti_tank", label: "坦克多", icon: "🛡️" },
];

export const TIER_FILTERS: TierFilter[] = [
  { key: "all", label: "全部", color: "bg-cream-300 text-sage-700" },
  { key: "chromatic", label: "彩色", color: "bg-gradient-to-r from-purple-400 via-pink-400 to-gold-300 text-white" },
  { key: "gold", label: "金色", color: "bg-gold-300 text-gold-700" },
  { key: "silver", label: "银色", color: "bg-slate-300 text-slate-700" },
];

export const QUALITY_COLORS: Record<RuneQuality, string> = {
  silver: "bg-slate-300 text-slate-700",
  gold: "bg-gold-300 text-gold-700",
  prismatic:
    "bg-gradient-to-r from-purple-400 via-pink-400 to-gold-300 text-white",
};
