// 装备池同步
import { validateAdmin, adminError } from "@/lib/admin-auth";
import { syncEquipment } from "@/lib/agent/sync-equipment";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  if (!validateAdmin(req)) return adminError();
  try {
    const body = await req.json().catch(() => ({}));
    const dryRun = body.dryRun === true;
    const equipIds = body.equipIds || undefined;
    const result = await syncEquipment({ dryRun, equipIds });
    return Response.json({ success: true, dryRun, ...result });
  } catch (e: any) {
    return Response.json({ success: false, error: e.message }, { status: 500 });
  }
}
