// 符文同步 — 双源对比（CDragon官方 + arammayhem社区）
// 安全保证：绝不修改 rune.name，绝不新增重复符文，不影响 hero_rune_recommendations

import { createAdminClient } from "@/lib/supabase/admin";
import { fetchAramMayhemData } from "./arammayhem";
import { fetchCdragonData, rarityToTier } from "./cdragon";
import type { SyncResult, SyncDetail, UpdateLog } from "./types";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

function rarityToQuality(rarity: string): string {
  switch (rarity) { case "prismatic": return "prismatic"; case "gold": return "gold"; default: return "silver"; }
}

function keywords(desc: string): string[] {
  if (!desc) return [];
  return desc.replace(/\[.*?\]|\[b\]|\[\/b\]|\[br\/\]|<.*?>/g, "")
    .split(/[^一-鿿\w]+/).filter(w => w.length >= 2);
}

function descSimilarity(a: string, b: string): number {
  const ka = keywords(a), kb = keywords(b);
  if (ka.length === 0 || kb.length === 0) return 0;
  let shared = 0;
  for (const w of ka) { if (kb.includes(w)) shared++; }
  return shared / Math.max(ka.length, kb.length);
}

export async function syncRunes(options: { dryRun?: boolean; forceUpdateDesc?: boolean; runeIds?: string[] }): Promise<{ result: SyncResult; comparison: any; log: Partial<UpdateLog> }> {
  const { dryRun = false, forceUpdateDesc = false, runeIds } = options;
  const details: SyncDetail[] = [];
  const supabase = createAdminClient();

  const [amData, cdResult] = await Promise.all([fetchAramMayhemData(), fetchCdragonData()]);
  const cdData = cdResult.augments;
  const cdVersion = cdResult.version;
  const amPatch = amData.patch;

  // CDragon ID → 中文名（通过 rune-overrides.json）
  let cdNameMap = new Map<string, string>();
  try {
    const p = resolve(process.cwd(), "scripts", "rune-overrides.json");
    if (existsSync(p)) {
      for (const o of JSON.parse(readFileSync(p, "utf-8"))) {
        if (o.nameEn && o.name) cdNameMap.set(o.nameEn, o.name);
      }
    }
  } catch {}

  // arammayhem 符文
  const amAugs = amData.augments.map(a => ({
    id: a.id, name: a.name_cn, description: a.description_cn,
    tier: a.rarity === "prismatic" ? "chromatic" : a.rarity === "gold" ? "gold" : "silver",
    rarityStr: a.rarity,
  }));

  // 数据库现有符文
  const { data: runesList } = await supabase
    .from("runes").select("id, name, description, tier, quality, is_active, source_id, special_label");
  const existingRunes = runesList || [];

  const bySourceId = new Map<string, any>();
  const byName = new Map<string, any>();
  for (const r of existingRunes) {
    if (r.source_id) bySourceId.set(r.source_id, r);
    byName.set(r.name, r);
  }

  const comparison: any[] = [];
  const matchedDBIds = new Set<string>();

  // ======== 处理 arammayhem 符文 ========
  for (const am of amAugs) {
    const tier = am.tier, quality = rarityToQuality(am.rarityStr);

    let existing = bySourceId.get(am.id);
    if (!existing) existing = byName.get(am.name);

    // 描述匹配
    if (!existing) {
      let best = 0, bestMatch: any = null;
      for (const r of existingRunes) {
        if (matchedDBIds.has(r.id)) continue;
        const s = descSimilarity(am.description, r.description || "");
        if (s > best && s >= 0.35) { best = s; bestMatch = r; }
      }
      if (bestMatch) existing = bestMatch;
    }

    const hasCD = cdData.some((c: any) => {
      const cn = cdNameMap.get(c.id);
      return cn === am.name || cn === (existing?.name || "");
    });
    const sources = ["arammayhem"];
    if (hasCD) sources.unshift("CDragon官方");

    if (existing) {
      // 如果指定了 runeIds 且当前符文不在其中，跳过处理
      if (runeIds && !runeIds.includes(am.id) && !runeIds.includes(existing.name)) {
        matchedDBIds.add(existing.id);
        continue;
      }
      matchedDBIds.add(existing.id);

      // 找官方名（CDragon）
      let officialName = "";
      cdData.forEach((c: any) => {
        const cn = cdNameMap.get(c.id) || "";
        if (cn === existing.name || cn === am.name) officialName = cn;
      });

      const needSourceId = !existing.source_id;
      const needDesc = forceUpdateDesc || !existing.description || existing.description.trim().length < 2;

      if (needSourceId || needDesc) {
        if (!dryRun) {
          await supabase.from("runes").update({
            source_id: am.id,
            description: needDesc ? am.description : existing.description,
            tier, quality,
            is_active: true,
          }).eq("id", existing.id);
        }

        const parts: string[] = [];
        if (needSourceId) parts.push("补充source_id关联");
        if (needDesc) parts.push("补充描述");
        const desc = parts.join("、") + "（不影响已有推荐）";

        details.push({ nameEn: am.id, name: existing.name, action: "updated",
          changes: {
            desc,
            sources,
            snippet: am.description,
            official_name: officialName || "—",
            community_name: am.name,
            use_name: "社区名优先：" + am.name,
          } });
      }

      comparison.push({ name_cn: am.name, db_name: existing.name, matched: true, hasCD, hasAM: true });
    } else {
      // 真·新符文
      comparison.push({ name_cn: am.name, db_name: "", matched: false, hasCD, hasAM: true, action: "new" });

      if (!dryRun) {
        await supabase.from("runes").upsert({
          name: am.name, description: am.description, quality, tier,
          effect_type: "utility", source_id: am.id, is_active: true,
        }, { onConflict: "name" });
      }
      details.push({ nameEn: am.id, name: am.name, action: "created",
        changes: { desc: `原数据库不存在，现增加（来源：${sources.join("、")}）`, sources, snippet: am.description || "" } });
    }
  }

  // ======== 处理 CDragon 符文（去重） ========
  // 当指定了 runeIds 时，跳过 CDragon 处理（只处理用户选中的社区符文）
  if (runeIds) {
    // 仅检查 CDragon 数据是否与已有匹配的符文一致，不新增
    for (const cd of cdData) {
      const cnName = cdNameMap.get(cd.id);
      if (!cnName) continue;
      const compEntry = comparison.find(c => c.name_cn === cnName || c.db_name === cnName);
      if (compEntry) compEntry.hasCD = true;
    }
  } else {
  const processedAMNames = new Set(amAugs.map(a => a.name));
  const processedSourceIds = new Set(amAugs.map(a => a.id));

  for (const cd of cdData) {
    const cnName = cdNameMap.get(cd.id);
    if (!cnName) continue;

    // 跳过 arammayhem 已处理的（同 source_id 或同名）
    if (processedSourceIds.has(cd.id)) continue;
    if (processedAMNames.has(cnName)) continue;

    let existing = bySourceId.get(cd.id) || byName.get(cnName);

    // 如果找到的 DB 符文已被 arammayhem 匹配过 → 去重，标记为双源确认
    if (existing && matchedDBIds.has(existing.id)) {
      // 更新 comparison 中对应的条目
      const compEntry = comparison.find(c => c.db_name === existing.name);
      if (compEntry) {
        compEntry.hasCD = true;
        compEntry.cdragon_id = cd.id;
      }
      continue;
    }

    let matchedByDesc = false;
    let foundDesc = "";

    // 尝试在 arammayhem 中找同名或相似名的描述
    if (!existing) {
      const amMatch = amAugs.find(a => a.name === cnName || descSimilarity(cnName, a.name) > 0.6);
      if (amMatch) foundDesc = amMatch.description;
    }

    // 描述匹配：尝试在剩余未匹配的DB符文中找
    if (!existing) {
      let best = 0, bestMatch: any = null;
      for (const r of existingRunes) {
        if (matchedDBIds.has(r.id)) continue;
        const s = descSimilarity(cnName, r.name + " " + (r.description || ""));
        if (s > best && s >= 0.2) { best = s; bestMatch = r; }
      }
      if (bestMatch) { existing = bestMatch; matchedByDesc = true; foundDesc = bestMatch.description || foundDesc; }
    }

    const tier = rarityToTier(cd.rarity);
    const q = cd.rarity === 2 ? "prismatic" : cd.rarity === 1 ? "gold" : "silver";

    if (existing) {
      matchedDBIds.add(existing.id);
      comparison.push({ name_cn: cnName, db_name: existing.name, matched: true, hasCD: true, hasAM: false, matchMethod: matchedByDesc ? "描述相似" : "名称/source_id" });

      if (!existing.source_id) {
        if (!dryRun) {
          await supabase.from("runes").update({ source_id: cd.id, is_active: true }).eq("id", existing.id);
        }
        details.push({ nameEn: cd.id, name: existing.name, action: "updated",
          changes: { desc: `补充source_id关联（来源：CDragon官方 v${cdVersion}）`, sources: ["CDragon官方 v" + cdVersion], snippet: existing.description || foundDesc || "" } });
      }
    } else {
      // 找社区中可能的同名符文（名称相似度 + 描述相似度）
      let similarTo = "";
      let simScore = 0;
      let simMethod = "";

      // 优先：描述匹配
      if (foundDesc) {
        for (const am of amAugs) {
          const s = descSimilarity(foundDesc, am.description);
          if (s > simScore && s >= 0.5) { simScore = s; similarTo = am.name; simMethod = "描述"; }
        }
      }

      // 备选：名称相似度（无描述时使用）
      if (!similarTo) {
        for (const am of amAugs) {
          const s = descSimilarity(cnName, am.name);
          if (s > simScore && s >= 0.3) { simScore = s; similarTo = am.name; simMethod = "名称"; }
        }
        // 也检查 DB 中未匹配的符文
        if (!similarTo) {
          for (const r of existingRunes) {
            if (matchedDBIds.has(r.id)) continue;
            const s = descSimilarity(cnName, r.name);
            if (s > simScore && s >= 0.3) { simScore = s; similarTo = r.name; simMethod = "名称(DB)"; }
          }
        }
      }

      comparison.push({ name_cn: cnName, db_name: "", matched: false, hasCD: true, hasAM: false, action: "new_official", similarTo });

      if (!dryRun) {
        await supabase.from("runes").upsert({
          name: cnName, description: foundDesc, quality: q, tier,
          effect_type: "utility", source_id: cd.id, is_active: true,
        }, { onConflict: "name" });
      }
      const descNote = similarTo
        ? `⚠️ ${simMethod}相似度${Math.round(simScore*100)}%，可能与社区「${similarTo}」重复，建议手动确认`
        : "CDragon独有，无社区对应，建议运行后手动审核";
      details.push({ nameEn: cd.id, name: cnName, action: "created",
        changes: {
          desc: `原数据库不存在，现增加（来源：CDragon官方 v${cdVersion}）${descNote}`,
          sources: ["CDragon官方 v" + cdVersion],
          snippet: foundDesc || "无描述，需手动补充",
          similar_to: similarTo,
        } });
    }
  }
  }

  // ======== 停用：两个源都不存在的符文 ========
  const allKnownNames = new Set([
    ...amAugs.map(a => a.name),
    ...cdData.map(c => cdNameMap.get(c.id)).filter(Boolean) as string[],
  ]);
  for (const r of existingRunes) {
    if (!matchedDBIds.has(r.id) && r.is_active !== false && !r.special_label?.includes("手动")) {
      if (!allKnownNames.has(r.name)) {
        if (!dryRun) await supabase.from("runes").update({ is_active: false }).eq("id", r.id);
        details.push({ nameEn: r.source_id || r.name, name: r.name, action: "deactivated",
          changes: { desc: "该符文在双源中均不存在，已停用（不影响已有推荐配置中的记录）", sources: [] } });
      }
    }
  }

  const created = details.filter(d => d.action === "created").length;
  const updated = details.filter(d => d.action === "updated").length;
  const deactivated = details.filter(d => d.action === "deactivated").length;

  const result: SyncResult = { newRunes: created, updatedRunes: updated, deactivatedRunes: deactivated, reactivatedRunes: 0, details };
  const versionNote = ""; // 后续可对比上次同步版本

  const log: Partial<UpdateLog> = {
    log_type: "sync-runes", title: `符文池同步 — ${dryRun ? "预览" : "执行"}`,
    summary: `CDragon v${cdVersion} (${cdData.length}) | arammayhem P${amPatch} (${amData.augments.length}) | 本地 ${existingRunes.length}\n匹配 ${matchedDBIds.size} | 新增 ${created} | 更新 ${updated} | 停用 ${deactivated}\n⚠️ 匹配策略: source_id → 名称 → 描述相似度，不修改符文名`,
    details: { cdVersion, cdCount: cdData.length, amPatch, amCount: amData.augments.length, localCount: existingRunes.length, ...result },
    stats: { cdCount: cdData.length, amCount: amData.augments.length, localCount: existingRunes.length, matchedCount: matchedDBIds.size, newRunes: created, updatedRunes: updated, deactivatedRunes: deactivated },
    run_mode: "manual", status: "completed",
  };
  return { result, comparison, log };
}

export async function previewSync() { return syncRunes({ dryRun: true }); }
