// 更新日志管理 API
// GET — 列出所有日志，支持筛选
// POST — 手动创建/编辑日志条目

import { validateAdmin, adminError } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  if (!validateAdmin(req)) return adminError();

  const { searchParams } = new URL(req.url);
  const logType = searchParams.get("type"); // 'sync-runes' | 'generate-recs'
  const status = searchParams.get("status");
  const limit = parseInt(searchParams.get("limit") || "50");

  const supabase = createAdminClient();
  let query = supabase.from("update_logs").select("*").order("created_at", { ascending: false }).limit(limit);

  if (logType) query = query.eq("log_type", logType);
  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json(data);
}

export async function POST(req: NextRequest) {
  if (!validateAdmin(req)) return adminError();

  const supabase = createAdminClient();
  const body = await req.json();
  const { id, ...rest } = body;

  if (id) {
    // 更新已有日志
    const { data, error } = await supabase
      .from("update_logs")
      .update(rest)
      .eq("id", id)
      .select()
      .single();

    if (error) return Response.json({ error: error.message }, { status: 500 });
    return Response.json(data);
  } else {
    // 创建新日志
    const { data, error } = await supabase
      .from("update_logs")
      .insert(rest)
      .select()
      .single();

    if (error) return Response.json({ error: error.message }, { status: 500 });
    return Response.json(data);
  }
}
