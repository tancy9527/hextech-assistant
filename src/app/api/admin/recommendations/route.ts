import { createAdminClient } from "@/lib/supabase/admin";
import { validateAdmin, adminError } from "@/lib/admin-auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  if (!validateAdmin(req)) return adminError();
  const supabase = createAdminClient();
  const { searchParams } = new URL(req.url);
  const heroId = searchParams.get("heroId");
  const phase = searchParams.get("phase");
  const playstyleId = searchParams.get("playstyleId");

  let query = supabase
    .from("hero_rune_recommendations")
    .select("*, runes(name, tier, quality)")
    .order("priority_score", { ascending: false });

  if (heroId) query = query.eq("hero_id", heroId);
  if (phase && phase !== "all") query = query.eq("phase", phase);
  if (playstyleId) query = query.eq("playstyle_id", playstyleId);

  const { data, error } = await query;
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}

export async function POST(req: NextRequest) {
  if (!validateAdmin(req)) return adminError();
  const supabase = createAdminClient();
  const body = await req.json();
  const { data, error } = await supabase.from("hero_rune_recommendations").insert(body).select().single();
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}
