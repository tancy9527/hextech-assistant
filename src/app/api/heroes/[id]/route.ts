import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient();
    const { data: hero, error } = await supabase
      .from("heroes")
      .select("*")
      .eq("id", params.id)
      .single();

    if (error || !hero) {
      return NextResponse.json({ error: "Hero not found" }, { status: 404 });
    }

    const { data: recommendations } = await supabase
      .from("hero_rune_recommendations")
      .select("*, runes(*)")
      .eq("hero_id", params.id)
      .order("phase")
      .order("priority_score", { ascending: false });

    return NextResponse.json({ hero, recommendations });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to fetch hero" },
      { status: 500 }
    );
  }
}
