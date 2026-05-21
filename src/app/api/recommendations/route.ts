import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { computeRecommendations } from "@/lib/recommendations";
import type { HeroRuneRecommendation } from "@/types";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const heroId = searchParams.get("heroId");
    const playstyleId = searchParams.get("playstyleId") || undefined;
    const selectedParam = searchParams.get("selected") || "";
    const selectedRuneIds = selectedParam ? selectedParam.split(",").filter(Boolean) : [];

    if (!heroId) {
      return NextResponse.json({ error: "heroId is required" }, { status: 400 });
    }

    const supabase = createClient();

    // 1. Get ALL active runes
    const { data: allRunes } = await supabase
      .from("runes")
      .select("*")
      .eq("is_active", true)
      .order("quality")
      .order("name");

    const runes = allRunes || [];

    // 2. Get ALL DB recommendations for hero (all phases, client filters by phase)
    const { data: dbRecs } = await supabase
      .from("hero_rune_recommendations")
      .select("*, runes(*)")
      .eq("hero_id", heroId);

    const dbRecsList = dbRecs || [];

    // 3. Filter by playstyle (if selected, only show that playstyle's recs)
    const filteredDbRecs = playstyleId
      ? dbRecsList.filter((r: any) => r.playstyle_id === playstyleId)
      : dbRecsList;

    // 4. Build recommendation list: only include DB recs (no archetype fallback)
    //    Non-recommended runes are handled client-side with score -1
    const dbRecMap = new Map(filteredDbRecs.map((r: any) => [r.rune_id, r]));

    const allRecs: HeroRuneRecommendation[] = filteredDbRecs.map((dbRec: any) => ({
      id: dbRec.id,
      hero_id: dbRec.hero_id,
      rune_id: dbRec.rune_id,
      playstyle_id: dbRec.playstyle_id,
      phase: dbRec.phase,
      priority_score: dbRec.priority_score,
      reason: dbRec.reason,
      build_synergy: dbRec.build_synergy || "",
      adjustment_tags: dbRec.adjustment_tags || [],
      fetter_boost: dbRec.fetter_boost || [],
    }));

    // 5. Fetch synergies and fetter data
    const { data: synergies } = await supabase.from("rune_synergies").select("*");

    const { data: fetterLinks } = await supabase.from("rune_fetters").select("rune_id, fetter_id, fetters(id, name)");

    // Build fetter data structures
    const runeFetters = new Map<string, string[]>();
    const fetterNames = new Map<string, string>();

    if (fetterLinks) {
      for (const link of fetterLinks as any[]) {
        if (!runeFetters.has(link.rune_id)) runeFetters.set(link.rune_id, []);
        runeFetters.get(link.rune_id)!.push(link.fetter_id);

        if (link.fetters?.name && !fetterNames.has(link.fetter_id)) {
          fetterNames.set(link.fetter_id, link.fetters.name);
        }
      }
    }

    // 6. Compute final recommendations
    const results = computeRecommendations(
      allRecs,
      runes,
      selectedRuneIds,
      synergies || [],
      { runeFetters, fetterNames }
    );

    return NextResponse.json(results);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to fetch recommendations" },
      { status: 500 }
    );
  }
}
