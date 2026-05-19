import { NextRequest } from "next/server";

const AUTH_HEADER = "X-Admin-Key";

export function validateAdmin(req: NextRequest): boolean {
  const adminKey = process.env.ADMIN_SECRET_KEY;

  // If no ADMIN_SECRET_KEY configured, allow all requests (dev mode)
  if (!adminKey || adminKey.trim() === "") return true;

  const provided = req.headers.get(AUTH_HEADER);
  return provided === adminKey;
}

export function adminError(): Response {
  return Response.json({ error: "未授权：需要有效的管理员密钥" }, { status: 401 });
}
