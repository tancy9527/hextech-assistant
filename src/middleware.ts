import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) return NextResponse.next();

  // API routes handle their own auth via X-Admin-Key header
  if (pathname.startsWith("/api/admin")) return NextResponse.next();

  const adminKey = process.env.ADMIN_SECRET_KEY;
  if (!adminKey) return NextResponse.next();

  const session = request.cookies.get("admin_session")?.value;
  if (session === adminKey) return NextResponse.next();

  // 未授权，重定向到独立登录页
  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/admin-login";
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
