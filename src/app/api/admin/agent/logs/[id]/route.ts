// 单条更新日志 API
import { validateAdmin, adminError } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!validateAdmin(req)) return adminError();

  const supabase = createAdminClient();
  const { data, error } = await supabase.from("update_logs").select("*").eq("id", params.id).single();
  if (error) return Response.json({ error: error.message }, { status: 404 });

  return Response.json(data);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!validateAdmin(req)) return adminError();

  const supabase = createAdminClient();
  const body = await req.json();

  const { data, error } = await supabase
    .from("update_logs")
    .update(body)
    .eq("id", params.id)
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!validateAdmin(req)) return adminError();

  const supabase = createAdminClient();
  const { error } = await supabase.from("update_logs").delete().eq("id", params.id);
  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json({ success: true });
}
