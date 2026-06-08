import { validateAdmin, adminError } from "@/lib/admin-auth";
import { syncEquipmentRecs } from "@/lib/agent/sync-equipment";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  if (!validateAdmin(req)) return adminError();
  try {
    const body = await req.json().catch(() => ({}));
    const dryRun = body.dryRun === true;
    const result = await syncEquipmentRecs({ dryRun });
    return Response.json({ success: true, dryRun, ...result });
  } catch (e: any) {
    return Response.json({ success: false, error: e.message }, { status: 500 });
  }
}
