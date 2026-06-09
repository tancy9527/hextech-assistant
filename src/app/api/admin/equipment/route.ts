import { validateAdmin, adminError } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  if (!validateAdmin(req)) return adminError();
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("equipment")
    .select("id, game_id, name, description, price, icon_url, category, is_active")
    .order("is_active", { ascending: false })
    .order("price", { ascending: false });
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data || []);
}

// DELETE: 批量删除已禁用装备
export async function DELETE(req: NextRequest) {
  if (!validateAdmin(req)) return adminError();
  const supabase = createAdminClient();
  const { error } = await supabase.from("equipment").delete().eq("is_active", false);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ success: true });
}
