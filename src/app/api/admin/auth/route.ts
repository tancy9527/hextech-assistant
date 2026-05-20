import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const adminKey = process.env.ADMIN_SECRET_KEY;
  if (!adminKey) {
    return NextResponse.json({ success: true, dev: true });
  }

  const { key } = await req.json();
  if (!key || key !== adminKey) {
    return NextResponse.json({ error: "密钥不正确" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_session", adminKey, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  return response;
}
