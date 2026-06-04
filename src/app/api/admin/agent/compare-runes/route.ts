// 符文对比 — 指定来源 vs 数据库
// ?source=community (arammayhem) | data_station (hexdata)
// &page=1&size=30

import { validateAdmin, adminError } from "@/lib/admin-auth";
import { fetchAramMayhemData } from "@/lib/agent/arammayhem";
import { fetchHexAugments, cleanHexDesc } from "@/lib/agent/hexdata";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  if (!validateAdmin(req)) return adminError();

  const { searchParams } = new URL(req.url);
  const source = searchParams.get("source") || "community";
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("size") || "30");

  try {
    const supabase = createAdminClient();

    // 获取远程数据
    let remoteRunes: { name: string; description: string; tier: string; quality: string; iconUrl?: string; winRate?: number; pickRate?: number }[] = [];

    if (source === "data_station") {
      const hexAugs = await fetchHexAugments();
      remoteRunes = hexAugs.map(a => ({
        name: a.name,
        description: cleanHexDesc(a.description || ""),
        tier: a.rarity === "棱彩" ? "chromatic" : a.rarity === "黄金" ? "gold" : "silver",
        quality: a.rarity === "棱彩" ? "prismatic" : a.rarity === "黄金" ? "gold" : "silver",
        iconUrl: a.iconUrl ? `https://hexdata.com.cn${a.iconUrl}` : "",
        winRate: a.winRate,
        pickRate: a.pickRate,
      }));
    } else {
      const amData = await fetchAramMayhemData();
      remoteRunes = amData.augments.map(a => ({
        name: a.name_cn,
        description: a.description_cn || "",
        tier: a.rarity === "prismatic" ? "chromatic" : a.rarity === "gold" ? "gold" : "silver",
        quality: a.rarity,
        iconUrl: a.icon || "",
      }));
    }

    // 获取数据库符文
    const { data: dbRunes } = await supabase
      .from("runes")
      .select("id, name, description, tier, quality, source_id, is_active")
      .eq("is_active", true);

    const dbList = dbRunes || [];
    const byName = new Map<string, any>();
    const bySourceId = new Map<string, any>();
    for (const r of dbList) {
      byName.set(r.name, r);
      if (r.source_id) bySourceId.set(r.source_id, r);
    }

    // 逐条对比
    const diffs: any[] = [];
    const matchedDBIds = new Set<string>();

    for (const remote of remoteRunes) {
      let db = byName.get(remote.name);

      // 描述相似度匹配
      if (!db) {
        let best = 0, bestMatch: any = null;
        const rKw = keywords(remote.description);
        for (const r of dbList) {
          if (matchedDBIds.has(r.id)) continue;
          const s = jaccardSimilarity(rKw, keywords(r.description || ""));
          if (s > best && s >= 0.35) { best = s; bestMatch = r; }
        }
        if (bestMatch) db = bestMatch;
      }

      if (db) {
        matchedDBIds.add(db.id);
        const nameDiff = db.name !== remote.name;
        const tierDiff = db.tier !== remote.tier;
        const descDiff = db.description !== remote.description && remote.description.length > 5 && (db.description || "").length > 5;
        const needSourceId = !db.source_id;
        if (nameDiff || tierDiff || descDiff || needSourceId) {
          diffs.push({
            name: remote.name,
            db_name: db.name,
            action: "updated",
            name_diff: nameDiff,
            tier_diff: tierDiff,
            desc_diff: descDiff,
            need_source_id: needSourceId,
            db_tier: db.tier,
            remote_tier: remote.tier,
            db_desc: (db.description || "").substring(0, 80),
            remote_desc: remote.description.substring(0, 80),
            winRate: remote.winRate,
            pickRate: remote.pickRate,
            iconUrl: remote.iconUrl,
          });
        }
      } else {
        diffs.push({
          name: remote.name,
          db_name: "",
          action: "created",
          remote_tier: remote.tier,
          remote_desc: remote.description.substring(0, 80),
          winRate: remote.winRate,
          pickRate: remote.pickRate,
          iconUrl: remote.iconUrl,
        });
      }
    }

    // DB有但远程没有的 → 停用
    const remoteNames = new Set(remoteRunes.map(r => r.name));
    for (const r of dbList) {
      if (!matchedDBIds.has(r.id) && r.is_active !== false) {
        if (!remoteNames.has(r.name)) {
          diffs.push({
            name: r.name,
            db_name: r.name,
            action: "deactivated",
            db_tier: r.tier,
            db_desc: (r.description || "").substring(0, 80),
          });
        }
      }
    }

    // 分页
    const total = diffs.length;
    const totalPages = Math.ceil(total / pageSize);
    const paged = diffs.slice((page - 1) * pageSize, page * pageSize);

    return Response.json({
      success: true,
      source,
      total,
      totalPages,
      page,
      pageSize,
      remoteCount: remoteRunes.length,
      localCount: dbList.length,
      diffs: paged,
    });
  } catch (e: any) {
    return Response.json({ success: false, error: e.message }, { status: 500 });
  }
}

function keywords(desc: string): string[] {
  if (!desc) return [];
  return desc.replace(/\[.*?\]|<.*?>/g, "").split(/[^一-鿿\w]+/).filter(w => w.length >= 2);
}

function jaccardSimilarity(ka: string[], kb: string[]): number {
  if (ka.length < 2 || kb.length < 2) return 0;
  let shared = 0;
  for (const w of ka) { if (kb.includes(w)) shared++; }
  return shared / Math.max(ka.length, kb.length);
}
