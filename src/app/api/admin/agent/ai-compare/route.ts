// POST /api/admin/agent/ai-compare — AI 比对官方和社区符文数据
import { validateAdmin, adminError } from "@/lib/admin-auth";
import { aiCompareRunes, AiCompareInput } from "@/lib/agent/ai-compare";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  if (!validateAdmin(req)) return adminError();

  try {
    const body = await req.json();
    const items: AiCompareInput[] = body.items || [];

    if (items.length === 0) {
      return Response.json({ success: false, error: "请提供需要比对的符文列表" }, { status: 400 });
    }

    const results = await aiCompareRunes(items);

    return Response.json({ success: true, results });
  } catch (e: any) {
    return Response.json({ success: false, error: e.message }, { status: 500 });
  }
}
