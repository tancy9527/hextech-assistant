import { createClient } from "@/lib/supabase/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = createClient();
  const { searchParams } = new URL(req.url);
  const heroId = searchParams.get("heroId");
  const playstyleId = searchParams.get("playstyleId");

  let query = supabase.from("hero_build_cards").select("*");
  if (heroId) query = query.eq("hero_id", heroId);
  if (playstyleId) query = query.eq("playstyle_id", playstyleId);

  // 指定英雄+流派：返回单条
  if (heroId && playstyleId) {
    const { data, error } = await query.limit(1).single();
    if (error && error.code !== "PGRST116") return Response.json({ error: error.message }, { status: 500 });
    return Response.json(data ?? null);
  }

  // 不指定或仅指定英雄：返回全部匹配卡牌
  const { data, error } = await query;
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data ?? []);
}
