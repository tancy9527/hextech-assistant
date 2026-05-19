import { createAdminClient } from "@/lib/supabase/admin";
import { validateAdmin, adminError } from "@/lib/admin-auth";
import { NextRequest } from "next/server";

export async function GET(_req: NextRequest) {
  if (!validateAdmin(_req)) return adminError();
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("fetters").select("*").order("name");
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}

export async function POST(req: NextRequest) {
  if (!validateAdmin(req)) return adminError();
  const supabase = createAdminClient();
  const body = await req.json();
  const { data, error } = await supabase.from("fetters").insert(body).select().single();
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}
