import { createAdminClient } from "@/lib/supabase/admin";
import { validateAdmin, adminError } from "@/lib/admin-auth";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!validateAdmin(req)) return adminError();
  const supabase = createAdminClient();
  const { error } = await supabase.from("hero_build_cards").delete().eq("id", params.id);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ success: true });
}
