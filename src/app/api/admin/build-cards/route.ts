import { createAdminClient } from "@/lib/supabase/admin";
import { validateAdmin, adminError } from "@/lib/admin-auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  if (!validateAdmin(req)) return adminError();
  const supabase = createAdminClient();
  const { searchParams } = new URL(req.url);
  const heroId = searchParams.get("heroId");
  const missingOnly = searchParams.get("missingOnly") === "true";

  if (missingOnly) {
    // 找出没有图文推荐卡的英雄
    const { data: allHeroes, error: heroErr } = await supabase.from("heroes").select("id,name,attack_type").order("name");
    if (heroErr) return Response.json({ error: heroErr.message }, { status: 500 });

    const { data: buildCards, error: bcErr } = await supabase.from("hero_build_cards").select("hero_id");
    if (bcErr) return Response.json({ error: bcErr.message }, { status: 500 });

    const heroIdsWithCards = new Set((buildCards ?? []).map((bc: { hero_id: string }) => bc.hero_id));
    const missing = (allHeroes ?? []).filter((h: { id: string }) => !heroIdsWithCards.has(h.id));
    return Response.json(missing);
  }

  let query = supabase
    .from("hero_build_cards")
    .select("*, heroes!inner(name), hero_playstyles(name)")
    .order("created_at", { ascending: false });

  if (heroId) query = query.eq("hero_id", heroId);

  const { data, error } = await query;
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}

export async function POST(req: NextRequest) {
  if (!validateAdmin(req)) return adminError();
  const supabase = createAdminClient();
  const body = await req.json();

  const { data: existing } = await supabase
    .from("hero_build_cards")
    .select("id")
    .eq("hero_id", body.hero_id)
    .eq("playstyle_id", body.playstyle_id)
    .maybeSingle();

  let result;
  if (existing) {
    result = await supabase.from("hero_build_cards").update(body).eq("id", existing.id).select().single();
  } else {
    result = await supabase.from("hero_build_cards").insert(body).select().single();
  }

  const { data, error } = result;
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}
