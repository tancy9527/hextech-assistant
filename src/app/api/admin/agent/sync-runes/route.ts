// POST /api/admin/agent/sync-runes — 触发符文池同步
import { validateAdmin, adminError } from "@/lib/admin-auth";
import { syncRunes, previewSync } from "@/lib/agent/sync-runes-core";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  if (!validateAdmin(req)) return adminError();

  try {
    const body = await req.json().catch(() => ({}));
    const dryRun = body.dryRun === true;
    const forceUpdateDesc = body.forceUpdateDesc === true;
    const runeIds = body.runeIds; // 仅处理指定符文

    const { result, comparison, log } = dryRun
      ? await previewSync()
      : await syncRunes({ dryRun: false, forceUpdateDesc, runeIds });

    // 仅实际执行时写入日志
    let logId: string | undefined;
    if (!dryRun) {
      const supabase = createAdminClient();
      const { data: entry } = await supabase.from("update_logs").insert({
        log_type: log.log_type, title: log.title, summary: log.summary,
        details: log.details, stats: log.stats, run_mode: log.run_mode,
        status: "completed", started_at: new Date().toISOString(), completed_at: new Date().toISOString(),
      }).select("id").single();
      logId = entry?.id;
    }

    return Response.json({ success: true, dryRun, result, comparison, log, logId });
  } catch (e: any) {
    return Response.json({ success: false, error: e.message }, { status: 500 });
  }
}
