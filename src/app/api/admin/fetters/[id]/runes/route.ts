import { createAdminClient } from "@/lib/supabase/admin";
import { validateAdmin, adminError } from "@/lib/admin-auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!validateAdmin(req)) return adminError();
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("rune_fetters")
    .select("*, runes!inner(name, tier, quality)")
    .eq("fetter_id", params.id);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  if (!validateAdmin(req)) return adminError();
  const supabase = createAdminClient();
  const body = await req.json();
  const { data, error } = await supabase
    .from("rune_fetters")
    .insert({ fetter_id: params.id, rune_id: body.rune_id })
    .select().single();
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!validateAdmin(req)) return adminError();
  const supabase = createAdminClient();
  const { searchParams } = new URL(req.url);
  const runeId = searchParams.get("runeId");
  if (!runeId) return Response.json({ error: "缺少 runeId 参数" }, { status: 400 });
  const { error } = await supabase
    .from("rune_fetters")
    .delete()
    .eq("fetter_id", params.id)
    .eq("rune_id", runeId);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ success: true });
}
