import { NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { validateAdmin, adminError } from "@/lib/admin-auth";

export const maxDuration = 30; // 手机端上传大图需要更多时间

const BUCKET = "build-cards";

export async function POST(req: NextRequest) {
  if (!validateAdmin(req)) return adminError();

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return Response.json({ error: "请选择图片文件" }, { status: 400 });
    }

    // Validate file type
    const validTypes = ["image/png", "image/jpeg", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      return Response.json({ error: "仅支持 PNG/JPG/WebP/GIF 格式" }, { status: 400 });
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return Response.json({ error: "图片大小不能超过 5MB" }, { status: 400 });
    }

    const supabase = createAdminClient();
    const ext = file.name.split(".").pop() || "png";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(filename, file, {
        upsert: true,
        contentType: file.type,
      });

    if (error) {
      // If bucket doesn't exist, return a helpful message
      if (error.message.includes("not found") || error.message.includes("exist")) {
        return Response.json(
          { error: `Storage bucket "${BUCKET}" 不存在。请在 Supabase 后台创建名为 "${BUCKET}" 的公开 Storage bucket` },
          { status: 500 }
        );
      }
      return Response.json({ error: `上传失败: ${error.message}` }, { status: 500 });
    }

    const { data: urlData } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(filename);

    return Response.json({ url: urlData.publicUrl, filename });
  } catch (e: any) {
    return Response.json({ error: `上传失败: ${e.message}` }, { status: 500 });
  }
}
