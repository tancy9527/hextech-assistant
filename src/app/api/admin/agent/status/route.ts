// 智能体状态检查
import { NextRequest } from "next/server";

export async function GET(_req: NextRequest) {
  return Response.json({
    deepseek: !!process.env.DEEPSEEK_API_KEY,
    supabase: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
  });
}
