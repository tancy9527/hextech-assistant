import { createAdminClient } from "@/lib/supabase/admin";
import { validateAdmin, adminError } from "@/lib/admin-auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  if (!validateAdmin(req)) return adminError();
  const supabase = createAdminClient();
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";

  let query = supabase.from("heroes").select("*").order("name");
  if (q) query = query.or(`name.ilike.%${q}%,title.ilike.%${q}%,nicknames.ilike.%${q}%`);

  const { data, error } = await query;
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}
