// POST /api/admin/agent/generate-recs — 生成/预览英雄-符文推荐
// GET /api/admin/agent/generate-recs — 查询日志

import { validateAdmin, adminError } from "@/lib/admin-auth";
import { generateRecsFromCombos, generateRecsWithAI } from "@/lib/agent/generate-recs-core";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  if (!validateAdmin(req)) return adminError();

  try {
    const body = await req.json().catch(() => ({}));
    let { heroIds, mode = "incremental", dryRun = false, useAI = false } = body;

    // 支持通过 heroNames（中文名）传入，自动转为 heroIds（UUID）
    if (body.heroNames && Array.isArray(body.heroNames)) {
      const supabase = createAdminClient();
      const { data: heroes } = await supabase.from("heroes").select("id, name");
      const nameToId = new Map((heroes || []).map((h: any) => [h.name, h.id]));
      heroIds = body.heroNames.map((n: string) => nameToId.get(n)).filter(Boolean);
    }

    let result: any;

    if (useAI) {
      // AI 深度分析模式
      const { preview, log } = await generateRecsWithAI({ heroIds, dryRun });
      result = { preview, log };
    } else {
      // arammayhem combo 模式
      const { preview, results, log } = await generateRecsFromCombos({ heroIds, mode, dryRun });
      result = { preview, results, log };
    }

    // 仅实际执行时写入日志
    let logId: string | undefined;
    if (!dryRun) {
      const supabase = createAdminClient();
      const { data: entry } = await supabase.from("update_logs").insert({
        log_type: result.log.log_type, title: result.log.title, summary: result.log.summary,
        details: { ...result.log.details, preview: result.preview },
        stats: result.log.stats, run_mode: result.log.run_mode, status: "completed",
        started_at: new Date().toISOString(), completed_at: new Date().toISOString(),
      }).select("id").single();
      logId = entry?.id;
    }

    return Response.json({
      success: true,
      dryRun,
      mode,
      useAI,
      preview: result.preview,
      results: result.results,
      stats: { ...result.log.stats, firstErrors: (result.log.details?.errors || []).slice(0, 5) },
      logId,
    });
  } catch (e: any) {
    const supabase = createAdminClient();
    await supabase.from("update_logs").insert({
      log_type: "generate-recs",
      title: `推荐生成失败 (${new Date().toLocaleString("zh-CN")})`,
      summary: e.message,
      details: { error: e.message },
      stats: {},
      run_mode: "manual",
      status: "failed",
      error_message: e.message,
      started_at: new Date().toISOString(),
      completed_at: new Date().toISOString(),
    });

    return Response.json({ success: false, error: e.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  if (!validateAdmin(req)) return adminError();

  const { searchParams } = new URL(req.url);
  const logId = searchParams.get("logId");

  const supabase = createAdminClient();

  if (logId) {
    const { data } = await supabase.from("update_logs").select("*").eq("id", logId).single();
    return Response.json(data);
  }

  const { data } = await supabase
    .from("update_logs")
    .select("*")
    .eq("log_type", "generate-recs")
    .order("created_at", { ascending: false })
    .limit(20);

  return Response.json(data || []);
}
