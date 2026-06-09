import { validateAdmin, adminError } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!validateAdmin(req)) return adminError();
  const supabase = createAdminClient();
  try {
    const body = await req.json();
    const update: any = {};
    if (body.name !== undefined) update.name = body.name;
    if (body.description !== undefined) update.description = body.description;
    if (body.price !== undefined) update.price = body.price;
    if (body.is_active !== undefined) update.is_active = body.is_active;
    if (body.category !== undefined) update.category = body.category;

    const { data, error } = await supabase
      .from("equipment")
      .update(update)
      .eq("id", params.id)
      .select()
      .single();

    if (error) return Response.json({ error: error.message }, { status: 500 });
    return Response.json(data);
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!validateAdmin(req)) return adminError();
  const supabase = createAdminClient();
  try {
    const { error } = await supabase.from("equipment").delete().eq("id", params.id);
    if (error) return Response.json({ error: error.message }, { status: 500 });
    return Response.json({ success: true });
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
