import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("runes")
      .select("*")
      .eq("is_active", true)
      .order("quality")
      .order("name");

    if (error) throw error;
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to fetch runes" },
      { status: 500 }
    );
  }
}
