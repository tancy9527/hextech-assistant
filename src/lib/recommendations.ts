import {
  type HeroRuneRecommendation,
  type Rune,
  type RuneSynergy,
  type RecommendationResult,
} from "@/types";

const TAG_BOOST_MAP: Record<string, { boost: number; label: string }> = {
  anti_ad: { boost: 5, label: "敌方AD较多，防御装可酌情考虑" },
  anti_cc: { boost: 5, label: "敌方控制多，韧性可酌情考虑" },
  anti_tank: { boost: 5, label: "敌方坦克多，百分比伤害可酌情考虑" },
  anti_ap: { boost: 5, label: "敌方AP较多，魔抗可酌情考虑" },
};

const QUALITY_MULTIPLIER: Record<Rune["quality"], number> = {
  prismatic: 1.1,
  gold: 1.0,
  silver: 0.9,
};

interface FetterSynergyInput {
  /** rune_id → array of fetter_ids that this rune belongs to */
  runeFetters: Map<string, string[]>;
  /** fetter_id → fetter name */
  fetterNames: Map<string, string>;
}

function getSynergyBoost(
  runeId: string,
  selectedRuneIds: string[],
  allSynergies: RuneSynergy[]
): { boost: number; reasons: string[] } {
  let boost = 0;
  const reasons: string[] = [];

  for (const selectedId of selectedRuneIds) {
    const synergy = allSynergies.find(
      (s) =>
        (s.rune_id === selectedId && s.synergizes_with === runeId) ||
        (s.rune_id === runeId && s.synergizes_with === selectedId)
    );
    if (synergy && synergy.synergy_score > 0) {
      boost += synergy.synergy_score;
      if (synergy.reason) reasons.push(synergy.reason);
    }
  }

  return { boost, reasons };
}

/**
 * Calculate fetter-based synergy boost:
 * If a selected rune shares a fetter with the candidate rune,
 * grant bonus points to encourage completing fetter sets.
 */
function getFetterBoost(
  runeId: string,
  selectedRuneIds: string[],
  fetterData: FetterSynergyInput
): { boost: number; reasons: string[] } {
  let boost = 0;
  const reasons: string[] = [];
  const candidateFetters = fetterData.runeFetters.get(runeId);
  if (!candidateFetters || candidateFetters.length === 0) return { boost, reasons };

  for (const selectedId of selectedRuneIds) {
    const selectedFetters = fetterData.runeFetters.get(selectedId);
    if (!selectedFetters) continue;

    const shared = candidateFetters.filter((f) => selectedFetters.includes(f));
    for (const fetterId of shared) {
      const fetterName = fetterData.fetterNames.get(fetterId);
      boost += 15; // Significant boost for fetter synergy
      if (fetterName) reasons.push(`羁绊「${fetterName}」套装配齐`);
    }
  }

  return { boost, reasons };
}

export function computeRecommendations(
  recs: HeroRuneRecommendation[],
  runes: Rune[],
  activeTags: string[] = [],
  selectedRuneIds: string[] = [],
  synergies: RuneSynergy[] = [],
  fetterData?: FetterSynergyInput
): RecommendationResult[] {
  const runeMap = new Map(runes.map((r) => [r.id, r]));

  const scored = recs
    .filter((rec) => !selectedRuneIds.includes(rec.rune_id))
    .map((rec) => {
      let boost = 0;
      const boostReasons: string[] = [];

      for (const tag of activeTags) {
        if (rec.adjustment_tags?.includes(tag)) {
          const config = TAG_BOOST_MAP[tag];
          if (config) {
            boost += config.boost;
            boostReasons.push(config.label);
          }
        }
      }

      const { boost: synergyBoost, reasons: synergyReasons } =
        getSynergyBoost(rec.rune_id, selectedRuneIds, synergies);
      boost += synergyBoost;
      boostReasons.push(...synergyReasons);

      if (fetterData) {
        const { boost: fetterBoost, reasons: fetterReasons } =
          getFetterBoost(rec.rune_id, selectedRuneIds, fetterData);
        boost += fetterBoost;
        boostReasons.push(...fetterReasons);
      }

      const rune = runeMap.get(rec.rune_id);
      const qualityMultiplier = rune ? QUALITY_MULTIPLIER[rune.quality] : 1.0;
      const adjusted_score = Math.round(
        (rec.priority_score + boost) * qualityMultiplier
      );

      return {
        rune: rune!,
        priority_score: rec.priority_score,
        adjusted_score,
        reason: rec.reason,
        build_synergy: rec.build_synergy,
        boost_reasons: boostReasons,
        is_top: false,
        is_selected: false,
      };
    });

  scored.sort((a, b) => b.adjusted_score - a.adjusted_score);

  // Mark all DB-recommended runes as recommended
  for (const s of scored) {
    s.is_top = true;
  }

  const selectedResults: RecommendationResult[] = selectedRuneIds
    .map((id) => {
      const rune = runeMap.get(id);
      if (!rune) return null;
      const originalRec = recs.find((r) => r.rune_id === id);
      return {
        rune,
        priority_score: originalRec?.priority_score ?? 0,
        adjusted_score: 0,
        reason: originalRec?.reason ?? "",
        build_synergy: originalRec?.build_synergy ?? "",
        boost_reasons: [],
        is_top: false,
        is_selected: true,
      };
    })
    .filter(Boolean) as RecommendationResult[];

  return [...scored, ...selectedResults];
}

export { TAG_BOOST_MAP, QUALITY_MULTIPLIER, getSynergyBoost, getFetterBoost };
