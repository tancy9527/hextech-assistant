import { createClient } from "@/lib/supabase/server";
import { NextRequest } from "next/server";

// 英雄胜率排行 — 返回所有有胜率数据的英雄，按胜率降序
export async function GET(req: NextRequest) {
  const supabase = createClient();
  const { searchParams } = new URL(req.url);
  const role = searchParams.get("role") || "";
  const limit = parseInt(searchParams.get("limit") || "50");

  let query = supabase
    .from("heroes")
    .select("id, name, title, role, attack_type, win_rate, meta_tier, pick_rate, image_url")
    .not("win_rate", "is", null)
    .order("win_rate", { ascending: false });

  if (role) {
    query = query.eq("role", role);
  }

  if (limit > 0) {
    query = query.limit(limit);
  }

  const { data, error } = await query;
  if (error) return Response.json({ error: error.message }, { status: 500 });

  const heroes = (data || []).map((h: any) => ({
    ...h,
    win_rate: h.win_rate ? parseFloat(h.win_rate) : null,
    pick_rate: h.pick_rate ? parseFloat(h.pick_rate) : null,
  }));

  return Response.json({ heroes });
}
