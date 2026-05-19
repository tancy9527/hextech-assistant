import { createClient } from "@/lib/supabase/client";

const BUCKET_NAME = "rune-icons";

export async function uploadRuneIcon(
  file: File,
  runeId: string
): Promise<string | null> {
  const supabase = createClient();

  const ext = file.name.split(".").pop() || "png";
  const path = `${runeId}.${ext}`;

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(path, file, { upsert: true, contentType: file.type });

  if (error) {
    console.error("Upload failed:", error.message);
    return null;
  }

  const { data: urlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(path);

  const publicUrl = urlData.publicUrl;

  // Update runes table
  await supabase.from("runes").update({ icon_url: publicUrl }).eq("id", runeId);

  return publicUrl;
}

export function getRuneIconUrl(path: string | null): string | null {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  const supabase = createClient();
  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path);
  return data.publicUrl;
}
