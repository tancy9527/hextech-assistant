import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const heroId = searchParams.get("heroId");

    const supabase = createClient();
    let query = supabase.from("hero_playstyles").select("*");

    if (heroId) {
      query = query.eq("hero_id", heroId);
    }

    const { data, error } = await query.order("name");
    if (error) throw error;

    return NextResponse.json(data || []);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch playstyles" },
      { status: 500 }
    );
  }
}
