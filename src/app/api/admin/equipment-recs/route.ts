import { validateAdmin, adminError } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextRequest } from "next/server";

// GET: 获取英雄装备推荐
export async function GET(req: NextRequest) {
  if (!validateAdmin(req)) return adminError();
  const supabase = createAdminClient();
  const { searchParams } = new URL(req.url);
  const heroId = searchParams.get("heroId");

  if (!heroId) return Response.json({ error: "heroId is required" }, { status: 400 });

  const { data, error } = await supabase
    .from("hero_equipment_recs")
    .select("*")
    .eq("hero_id", heroId);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data || []);
}

// POST: 保存英雄装备推荐 (upsert by hero_id + playstyle_id)
export async function POST(req: NextRequest) {
  if (!validateAdmin(req)) return adminError();
  const supabase = createAdminClient();
  try {
    const body = await req.json();
    const { hero_id, playstyle_id, starter_items, core_items, alt_items } = body;

    if (!hero_id) return Response.json({ error: "hero_id is required" }, { status: 400 });

    // 查找已有记录
    let query = supabase.from("hero_equipment_recs").select("id").eq("hero_id", hero_id);
    if (playstyle_id) {
      query = query.eq("playstyle_id", playstyle_id);
    } else {
      query = query.is("playstyle_id", null);
    }
    const { data: existing } = await query.limit(1);

    const payload = {
      hero_id,
      playstyle_id: playstyle_id || null,
      starter_items: starter_items || [],
      core_items: core_items || [],
      alt_items: alt_items || [],
      source: "manual",
    };

    let result;
    if (existing?.[0]) {
      result = await supabase.from("hero_equipment_recs").update(payload).eq("id", existing[0].id).select().single();
    } else {
      result = await supabase.from("hero_equipment_recs").insert(payload).select().single();
    }

    if (result.error) return Response.json({ error: result.error.message }, { status: 500 });
    return Response.json(result.data);
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
