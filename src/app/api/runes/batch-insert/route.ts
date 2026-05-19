import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { hero, runes } = body as {
      hero: string | null;
      runes: { name: string; tier: string; reason?: string }[];
    };

    if (!hero || !runes || !Array.isArray(runes) || runes.length === 0) {
      return NextResponse.json(
        { error: "hero 和 runes 字段为必填" },
        { status: 400 }
      );
    }

    const supabase = createClient();
    const results: { name: string; status: string; id?: string }[] = [];

    // Upsert hero
    let heroId: string | null = null;
    const { data: existingHero } = await supabase
      .from("heroes")
      .select("id")
      .eq("name", hero)
      .single();

    if (existingHero) {
      heroId = existingHero.id;
    } else {
      const { data: newHero, error: heroErr } = await supabase
        .from("heroes")
        .insert({
          name: hero,
          title: hero,
          role: "未知",
          attack_type: "AP",
          description: `通过截图识别导入 — ${hero}`,
        })
        .select()
        .single();

      if (heroErr) {
        return NextResponse.json(
          { error: `创建英雄失败: ${heroErr.message}` },
          { status: 500 }
        );
      }
      heroId = newHero.id;
    }

    // Upsert runes (dedup by name + tier)
    for (const rune of runes) {
      const { data: existingRune } = await supabase
        .from("runes")
        .select("id")
        .eq("name", rune.name)
        .eq("tier", rune.tier)
        .single();

      if (existingRune) {
        results.push({ name: rune.name, status: "skipped", id: existingRune.id });
        continue;
      }

      const qualityMap: Record<string, string> = {
        chromatic: "prismatic",
        gold: "gold",
        silver: "silver",
      };

      const { data: newRune, error: runeErr } = await supabase
        .from("runes")
        .insert({
          name: rune.name,
          description: rune.reason || `通过截图识别导入 — ${rune.tier}品质`,
          quality: qualityMap[rune.tier] || "silver",
          tier: rune.tier,
          effect_type: "utility",
        })
        .select()
        .single();

      if (runeErr) {
        results.push({
          name: rune.name,
          status: `error: ${runeErr.message}`,
        });
      } else {
        results.push({
          name: rune.name,
          status: "inserted",
          id: newRune.id,
        });
      }
    }

    return NextResponse.json({ heroId, results });
  } catch (e: any) {
    return NextResponse.json(
      { error: `服务器错误: ${e.message}` },
      { status: 500 }
    );
  }
}
