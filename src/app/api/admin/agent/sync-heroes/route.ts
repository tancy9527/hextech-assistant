import { validateAdmin, adminError } from "@/lib/admin-auth";
import { syncHeroes } from "@/lib/agent/sync-heroes";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  if (!validateAdmin(req)) return adminError();

  try {
    const body = await req.json().catch(() => ({}));
    const dryRun = body.dryRun === true;

    const { result, log } = await syncHeroes({ dryRun });

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

    return Response.json({ success: true, dryRun, result, logId });
  } catch (e: any) {
    return Response.json({ success: false, error: e.message }, { status: 500 });
  }
}
