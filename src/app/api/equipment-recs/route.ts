import { createClient } from "@/lib/supabase/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = createClient();
  const { searchParams } = new URL(req.url);
  const heroId = searchParams.get("heroId");
  const playstyleId = searchParams.get("playstyleId");

  if (!heroId) return Response.json({ error: "heroId is required" }, { status: 400 });

  // 查指定流派装备（指定了流派就不 fallback 到通用装备）
  let query = supabase.from("hero_equipment_recs").select("*").eq("hero_id", heroId);
  if (playstyleId) {
    query = query.eq("playstyle_id", playstyleId);
  } else {
    query = query.is("playstyle_id", null);
  }
  const { data: recs } = await query.limit(1);
  let rec = recs?.[0] || null;

  // 没选流派时，null 找不到 → 回退到"通用流派"playstyle
  if (!rec && !playstyleId) {
    const { data: psData } = await supabase
      .from("hero_playstyles").select("id")
      .eq("hero_id", heroId).eq("name", "通用流派").limit(1);
    if (psData?.[0]) {
      const { data: generalRec } = await supabase
        .from("hero_equipment_recs").select("*")
        .eq("hero_id", heroId).eq("playstyle_id", psData[0].id).limit(1);
      rec = generalRec?.[0] || null;
    }
  }

  if (!rec) {
    return Response.json({ starter_items: [], core_items: [], alt_items: [] });
  }

  const allGameIds = new Set<string>();
  for (const key of ["starter_items", "core_items", "alt_items"]) {
    for (const item of (rec[key] || []) as any[]) {
      if (item && item.id) allGameIds.add(item.id);
    }
  }

  let equipMap = new Map<string, any>();
  if (allGameIds.size > 0) {
    const { data: equipList } = await supabase
      .from("equipment").select("*")
      .in("game_id", Array.from(allGameIds));
    for (const e of equipList || []) equipMap.set(e.game_id, e);
  }

  const enrich = (items: any[]) =>
    items.map((item: any) => {
      if (!item || !item.id) return null;
      const eq = equipMap.get(item.id);
      return {
        name: item.name || eq?.name || "",
        game_id: item.id || "",
        icon_url: eq?.icon_url || "",
        price: eq?.price || 0,
        description: eq?.description || "",
      };
    });

  return Response.json({
    starter_items: enrich(rec.starter_items || []),
    core_items: enrich(rec.core_items || []),
    alt_items: enrich(rec.alt_items || []),
  });
}
