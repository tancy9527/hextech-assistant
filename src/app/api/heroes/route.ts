import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("heroes")
      .select("id, name, title, role, attack_type, description, image_url, nicknames, win_rate, meta_tier, pick_rate")
      .order("name");

    if (error) throw error;
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to fetch heroes" },
      { status: 500 }
    );
  }
}
