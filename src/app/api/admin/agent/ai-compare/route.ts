// AI双源比对 — 社区 vs 数据站，三类别差异
import { validateAdmin, adminError } from "@/lib/admin-auth";
import { fetchAramMayhemData } from "@/lib/agent/arammayhem";
import { fetchHexAugments, cleanHexDesc } from "@/lib/agent/hexdata";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextRequest } from "next/server";

function keywords(desc: string): string[] {
  if (!desc) return [];
  return desc.replace(/\[.*?\]|<.*?>/g, "").split(/[^一-鿿\w]+/).filter(w => w.length >= 2);
}

function jaccard(a: string[], b: string[]): number {
  if (a.length < 2 || b.length < 2) return 0;
  let s = 0; for (const w of a) { if (b.includes(w)) s++; }
  return s / Math.max(a.length, b.length);
}

export async function GET(req: NextRequest) {
  if (!validateAdmin(req)) return adminError();

  try {
    const supabase = createAdminClient();
    const [amData, hexAugs] = await Promise.all([fetchAramMayhemData(), fetchHexAugments()]);

    // 加载反馈
    const { data: feedback } = await supabase.from("ai_comparison_feedback").select("*").eq("is_active", true);
    const fbSkip = new Set<string>();
    const fbSame = new Set<string>();
    for (const f of feedback || []) {
      const key = `${f.community_name}||${f.data_station_name}`;
      if (f.feedback_type === "different_runes") fbSkip.add(key);
      if (f.feedback_type === "same_rune") fbSame.add(key);
    }

    const community = amData.augments.map(a => ({
      name: a.name_cn, desc: a.description_cn || "", tier: a.rarity,
    }));
    const dataStation = hexAugs.map(a => ({
      name: a.name, desc: cleanHexDesc(a.description || ""),
      tier: a.rarity === "棱彩" ? "prismatic" : a.rarity === "黄金" ? "gold" : "silver",
    }));

    const comNames = new Set(community.map(c => c.name));
    const dsNames = new Set(dataStation.map(d => d.name));

    const cat1: any[] = []; // 同名异述
    const cat2: any[] = []; // 异名似述
    const cat3: any[] = []; // 独有

    // 类别1+2: 遍历社区符文
    const matchedDS = new Set<string>();
    for (const c of community) {
      const ds = dataStation.find(d => d.name === c.name);
      if (ds) {
        matchedDS.add(ds.name);
        const descDiff = c.desc !== ds.desc && c.desc.length > 5 && ds.desc.length > 5;
        const tierDiff = c.tier !== ds.tier;
        if (descDiff || tierDiff) {
          cat1.push({ community_name: c.name, data_station_name: ds.name, community_desc: c.desc.substring(0,100), data_station_desc: ds.desc.substring(0,100), community_tier: c.tier, data_station_tier: ds.tier, desc_diff: descDiff, tier_diff: tierDiff });
        }
      } else {
        // 描述相似度找匹配
        const cKw = keywords(c.desc);
        let best = 0, bestDS: any = null;
        for (const d of dataStation) {
          if (matchedDS.has(d.name)) continue;
          const key = `${c.name}||${d.name}`;
          if (fbSkip.has(key)) continue;
          const s = jaccard(cKw, keywords(d.desc));
          if (s > best && s >= 0.3) { best = s; bestDS = d; }
        }
        if (bestDS) {
          matchedDS.add(bestDS.name);
          cat2.push({ community_name: c.name, data_station_name: bestDS.name, community_desc: c.desc.substring(0,100), data_station_desc: bestDS.desc.substring(0,100), similarity: Math.round(best*100), community_tier: c.tier, data_station_tier: bestDS.tier });
        } else {
          cat3.push({ name: c.name, desc: c.desc.substring(0,100), tier: c.tier, source: "community" });
        }
      }
    }

    // 数据站独有的
    for (const d of dataStation) {
      if (!matchedDS.has(d.name) && !comNames.has(d.name)) {
        cat3.push({ name: d.name, desc: d.desc.substring(0,100), tier: d.tier, source: "data_station" });
      }
    }

    return Response.json({
      success: true,
      community_count: community.length,
      data_station_count: dataStation.length,
      cat1_count: cat1.length,
      cat2_count: cat2.length,
      cat3_count: cat3.length,
      cat1, cat2, cat3,
    });
  } catch (e: any) {
    return Response.json({ success: false, error: e.message }, { status: 500 });
  }
}

// POST: 提交反馈
export async function POST(req: NextRequest) {
  if (!validateAdmin(req)) return adminError();
  try {
    const body = await req.json();
    const supabase = createAdminClient();

    const { data, error } = await supabase.from("ai_comparison_feedback").upsert({
      community_name: body.community_name,
      data_station_name: body.data_station_name,
      feedback_type: body.feedback_type,
      admin_note: body.admin_note || "",
      rune_pair_key: `${body.community_name}||${body.data_station_name}`,
    }, { onConflict: "community_name,data_station_name" });

    if (error) return Response.json({ success: false, error: error.message }, { status: 500 });
    return Response.json({ success: true });
  } catch (e: any) {
    return Response.json({ success: false, error: e.message }, { status: 500 });
  }
}
