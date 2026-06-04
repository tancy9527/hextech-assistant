// 英雄-符文推荐生成核心
// 数据来源: arammayhem.com combos (666个英雄+符文组合) + AI 深度分析
// 保护机制: source='manual' 的记录永不自动覆盖

import { createAdminClient } from "@/lib/supabase/admin";
import { fetchAramMayhemData } from "./arammayhem";
import { generateRecsFromAI } from "./translate";
import type { GenerateRecsResult, UpdateLog } from "./types";

const TIER_SCORE: Record<string, number> = {
  "S": 100, "S+": 100, "A": 90, "B": 85, "C": 70, "D": 50,
};

export interface RecDiffEntry {
  heroName: string;
  runeName: string;
  runeDesc: string;
  action: "add" | "update" | "skip_manual" | "skip_exists";
  oldScore?: number;
  newScore?: number;
  oldReason?: string;
  newReason?: string;
  playstyle_name?: string;
}

export interface RecPreview {
  summary: { toAdd: number; toUpdate: number; skipManual: number; skipExists: number; affectedHeroes: number };
  details: RecDiffEntry[];
  affectedHeroes: string[];
}

// ============================================================
// 主入口
// ============================================================
export async function generateRecsFromCombos(options: {
  heroIds?: string[];
  mode?: "incremental" | "fullRefresh"; // 增量（默认） | 全量刷新
  dryRun?: boolean;
}): Promise<{ preview: RecPreview; results: GenerateRecsResult[]; log: Partial<UpdateLog> }> {
  const { heroIds, mode = "incremental", dryRun = false } = options;
  const results: GenerateRecsResult[] = [];
  const affectedHeroesSet = new Set<string>();
  const preview: RecPreview = { summary: { toAdd: 0, toUpdate: 0, skipManual: 0, skipExists: 0, affectedHeroes: 0 }, details: [], affectedHeroes: [] };

  // 1. 获取数据
  const amData = await fetchAramMayhemData();
  const supabase = createAdminClient(); // 预览也需要查DB做匹配，只是不写入

  // 2. 建立映射
  const { heroMap, heroNames, heroAttackTypes, heroDescs } = await buildHeroMaps(supabase);
  const { runeMap, runeInfoMap, sourceIdMap } = await buildRuneMapWithInfo(supabase, amData);

  // 3. 确保每个英雄有"通用流派"
  const playstyleMap = new Map<string, string>(); // hero_id → playstyle_id
  if (!dryRun) {
    const heroEntries = Array.from(heroMap.entries()) as [string, string][];
    for (let hi = 0; hi < heroEntries.length; hi++) {
      const [enName, heroId] = heroEntries[hi];
      // 查找或创建"通用流派"
      const { data: existingPs } = await supabase.from("hero_playstyles").select("id").eq("hero_id", heroId).eq("name", "通用流派").limit(1);
      if (existingPs && existingPs.length > 0) {
        playstyleMap.set(heroId, existingPs[0].id);
      } else {
        const { data: newPs } = await supabase.from("hero_playstyles").insert({ hero_id: heroId, name: "通用流派", description: "arammayhem社区推荐组合" }).select("id").single();
        if (newPs) playstyleMap.set(heroId, newPs.id);
      }
    }
  }

  // 4. 获取英雄已有推荐（用于 diff）
  let existingRecsMap = new Map<string, { id: string; source: string; priority_score: number; reason: string; playstyle_name?: string }>();
  let psMap = new Map<string, string>();
  const { data: allRecs } = await supabase.from("hero_rune_recommendations").select("id, hero_id, rune_id, source, priority_score, reason, playstyle_id");
  // 获取玩法流派名称（暴露给外部用于兜底查询）
  const { data: allPs } = await supabase.from("hero_playstyles").select("id, name");
  psMap = new Map((allPs || []).map((p: any) => [p.id, p.name]));
  if (allRecs) {
    // 建立所有符文（含已停用）的 rune_id → source_id 反向索引
    const { data: allRunes } = await supabase.from("runes").select("id, source_id");
    const runeSourceRev = new Map<string, string>();
    for (const rn of allRunes || []) {
      if (rn.source_id) runeSourceRev.set(rn.id, rn.source_id);
    }
    for (const r of allRecs) {
      const key = `${r.hero_id}:${r.rune_id}`;
      const psName = r.playstyle_id ? psMap.get(r.playstyle_id) : "";
      const entry = { ...r, playstyle_name: psName || "" };
      existingRecsMap.set(key, entry);
      // 同时也按 source_id 索引（适配符文改名后 ID 对不上）
      const srcId = runeSourceRev.get(r.rune_id);
      if (srcId) {
        existingRecsMap.set(`${r.hero_id}:${srcId}`, entry);
      }
    }
  }

  // 4. 过滤combos
  const filteredCombos = filterCombos(amData.combos, heroIds, heroMap);

  let entriesGenerated = 0;
  const errors: string[] = [];

  // 5. 处理每个combo
  const processedInThisRun = new Set<string>(); // 本次运行已处理的 heroId:runeId（去重）
  for (const combo of filteredCombos) {
    const heroId = heroMap.get(combo.championId.toLowerCase());
    if (!heroId) continue;

    const heroName = heroNames.get(combo.championId.toLowerCase()) || combo.championId;
    if (heroIds && heroIds.length > 0 && !heroIds.includes(heroId)) continue;

    affectedHeroesSet.add(heroName);
    const score = TIER_SCORE[combo.tier] || 50;

    for (const augmentId of combo.augmentIds) {
      const runeId = runeMap.get(augmentId);
      if (!runeId) continue;
      const ri = runeInfoMap.get(runeId);
      const runeName = ri?.name || augmentId;
      const runeDesc = ri?.desc || "";

      const loopKey = `${heroId}:${runeId}`;
      if (processedInThisRun.has(loopKey)) continue; // 同一个英雄+符文在本轮已处理，去重
      processedInThisRun.add(loopKey);

      // 先用 UUID 查找，再用 source_id（augmentId）查找，最后直接查 DB 兜底
      let existing = existingRecsMap.get(loopKey);
      if (!existing) {
        existing = existingRecsMap.get(`${heroId}:${augmentId}`);
      }
      if (!existing) {
        const { data: directCheck } = await supabase
          .from("hero_rune_recommendations")
          .select("id, source, priority_score, reason, playstyle_id")
          .eq("hero_id", heroId)
          .eq("rune_id", runeId)
          .limit(1);
        if (directCheck && directCheck.length > 0) {
          // 直接查询存在，但 Map 没找到 → 创建临时 entry 用于判断
          const psName = directCheck[0].playstyle_id ? psMap.get(directCheck[0].playstyle_id) : "";
          existing = { id: directCheck[0].id, source: directCheck[0].source, priority_score: directCheck[0].priority_score, reason: directCheck[0].reason || "", playstyle_name: psName || "" };
        }
      }

      // 手动推荐保护（除非用户主动勾选了该英雄）
      let overrideManual = false;
      if (existing && existing.source === "manual") {
        overrideManual = !!heroIds && heroIds.length > 0 && heroIds.includes(heroId);
        if (!overrideManual) {
          preview.details.push({ heroName, runeName, runeDesc, action: "skip_manual", oldScore: existing.priority_score, newScore: score, oldReason: existing.reason, newReason: combo.desc_cn, playstyle_name: existing.playstyle_name });
          preview.summary.skipManual++;
          continue;
        }
        // 用户主动勾选 → 覆盖手动保护，更新分数和推荐理由，保留原流派
      }

      // 增量模式：跳过已有推荐（除非是手动覆盖）
      if (existing && mode === "incremental" && !overrideManual) {
        preview.details.push({ heroName, runeName, runeDesc, action: "skip_exists", oldScore: existing.priority_score, oldReason: existing.reason, playstyle_name: existing.playstyle_name });
        preview.summary.skipExists++;
        continue;
      }

      // 全量刷新模式：更新已有推荐（手动覆盖也走更新逻辑）
      if (existing && (mode === "fullRefresh" || overrideManual)) {
        preview.details.push({
          heroName, runeName, runeDesc, action: "update",
          oldScore: existing.priority_score, newScore: score,
          oldReason: existing.reason, newReason: combo.desc_cn,
        });
        preview.summary.toUpdate++;
      } else if (!existing) {
        preview.details.push({ heroName, runeName, runeDesc, action: "add", newScore: score, newReason: combo.desc_cn, playstyle_name: "通用流派" });
        preview.summary.toAdd++;
      }

      if (!dryRun && supabase) {
        try {
          // 手动覆盖：保留原流派和阶段，只更新分数和推荐理由
          if (overrideManual && existing) {
            const { error } = await supabase
              .from("hero_rune_recommendations")
              .update({
                priority_score: score,
                reason: combo.desc_cn || `arammayhem ${combo.tier}级推荐`,
                build_synergy: combo.desc_cn || "",
                source: "arammayhem",
              })
              .eq("id", existing.id);
            if (error) errors.push(`${combo.slug}: ${error.message}`);
            else entriesGenerated++;
          } else {
            if (existing && mode === "fullRefresh") {
              await supabase.from("hero_rune_recommendations").delete().eq("id", existing.id);
            }

            const psId = playstyleMap.get(heroId) || null;

            const { error } = await supabase.from("hero_rune_recommendations").upsert({
              hero_id: heroId,
              rune_id: runeId,
              playstyle_id: psId,
              phase: combo.tier === "S" ? "3" : "7",
              priority_score: score,
              reason: combo.desc_cn || `arammayhem ${combo.tier}级推荐`,
              build_synergy: combo.desc_cn || "",
              adjustment_tags: [],
              fetter_boost: [],
              source: "arammayhem",
            }, {
              onConflict: "hero_id, rune_id, playstyle_id, phase",
              ignoreDuplicates: true,
            });

            if (error) errors.push(`${combo.slug}: ${error.message}`);
            else entriesGenerated++;
          }
        } catch (e: any) {
          errors.push(`${combo.slug}: ${e.message}`);
        }
      } else {
        entriesGenerated++;
      }
    }

    results.push({ heroId, heroName, entriesGenerated: combo.augmentIds.length, errors: [] });
  }

  const log: Partial<UpdateLog> = buildLog(amData.patch, dryRun, mode, filteredCombos.length, entriesGenerated, errors, preview);

  preview.summary.affectedHeroes = affectedHeroesSet.size;
  preview.affectedHeroes = Array.from(affectedHeroesSet);
  return { preview, results, log };
}

// ============================================================
// AI 深度分析：基于英雄属性评估符文适配度
// ============================================================
export async function generateRecsWithAI(options: {
  heroIds?: string[];
  dryRun?: boolean;
}): Promise<{ preview: RecPreview; log: Partial<UpdateLog> }> {
  const { heroIds, dryRun = false } = options;
  const supabase = dryRun ? null : createAdminClient();
  const amData = await fetchAramMayhemData();
  const { heroMap, heroNames, heroAttackTypes, heroDescs } = await buildHeroMaps(supabase);
  const { runeMap, runeInfoMap: _ri } = await buildRuneMapWithInfo(supabase, amData);

  const affectedHeroesSetAI = new Set<string>();
  const preview: RecPreview = { summary: { toAdd: 0, toUpdate: 0, skipManual: 0, skipExists: 0, affectedHeroes: 0 }, details: [], affectedHeroes: [] };
  const errors: string[] = [];

  // 获取需要分析的英雄
  let heroesToAnalyze: any[] = [];
  if (!dryRun && supabase) {
    const query = supabase.from("heroes").select("id, name, title, role, attack_type, description");
    if (heroIds && heroIds.length > 0) query.in("id", heroIds);
    const { data } = await query;
    if (data) heroesToAnalyze = data;
  }

  // 获取活跃符文列表（含完整信息）
  let runesForAI: any[] = [];
  if (!dryRun && supabase) {
    const { data } = await supabase.from("runes").select("id, name, tier, quality, description, effect_type, pros, cons").eq("is_active", true);
    if (data) runesForAI = data;
  }

  let entriesGenerated = 0;

  for (const hero of heroesToAnalyze) {
    affectedHeroesSetAI.add(hero.name);
    try {
      // 构建分析提示
      const prompt = buildAnalysisPrompt(hero, runesForAI);
      const aiResult = await generateRecsFromAI(prompt);

      const recommendations = aiResult?.recommendations || [];
      if (!Array.isArray(recommendations)) continue;

      for (const rec of recommendations) {
        const runeName = rec.rune_name || rec.name;
        const rune = runesForAI.find((r) => r.name === runeName);
        if (!rune) continue;

        const key = `${hero.id}:${rune.id}`;
        // 检查是否手动推荐
        if (!dryRun && supabase) {
          const { data: existing } = await supabase.from("hero_rune_recommendations")
            .select("id, source").eq("hero_id", hero.id).eq("rune_id", rune.id).limit(1);

          if (existing && existing.length > 0 && existing[0].source === "manual") {
            affectedHeroesSetAI.add(hero.name);
            preview.details.push({ heroName: hero.name, runeName, runeDesc: "", action: "skip_manual" });
            preview.summary.skipManual++;
            continue;
          }

          if (existing && existing.length > 0) {
            await supabase.from("hero_rune_recommendations").delete().eq("id", existing[0].id);
          }

          const { error } = await supabase.from("hero_rune_recommendations").insert({
            hero_id: hero.id,
            rune_id: rune.id,
            playstyle_id: null,
            phase: rec.phase || "7",
            priority_score: rec.priority_score || 50,
            reason: rec.reason || "",
            build_synergy: rec.build_synergy || "",
            adjustment_tags: rec.adjustment_tags || [],
            fetter_boost: rec.fetter_boost || [],
            source: "ai_generated",
          });

          if (error) errors.push(`${hero.name}/${runeName}: ${error.message}`);
          else { entriesGenerated++; preview.summary.toAdd++; }
        }
      }
    } catch (e: any) {
      errors.push(`${hero.name}: ${e.message}`);
    }
  }

  const log: Partial<UpdateLog> = {
    log_type: "generate-recs",
    title: `AI深度分析 — ${dryRun ? "预览" : "执行"} (P${amData.patch})`,
    summary: `AI分析完成：生成 ${entriesGenerated} 条推荐，错误 ${errors.length}`,
    details: { patch: amData.patch, entriesGenerated, errors, preview },
    stats: { entriesGenerated, errors: errors.length, ...preview.summary },
    run_mode: "manual",
    status: "completed",
  };

  preview.summary.affectedHeroes = affectedHeroesSetAI.size;
  preview.affectedHeroes = Array.from(affectedHeroesSetAI);
  return { preview, log };
}

// ============================================================
// 辅助函数
// ============================================================
async function buildHeroMaps(supabase: any) {
  const heroMap = new Map<string, string>();
  const heroNames = new Map<string, string>();
  const heroAttackTypes = new Map<string, string>();
  const heroDescs = new Map<string, string>();

  if (!supabase) return { heroMap, heroNames, heroAttackTypes, heroDescs };

  const { data: heroes } = await supabase.from("heroes").select("id, name, title, attack_type, description");
  if (!heroes) return { heroMap, heroNames, heroAttackTypes, heroDescs };

  for (const h of heroes) {
    const enMatch = h.title?.match(/^(\w+)\s*—/) || h.title?.match(/^([\w']+)\s*—/);
    const enName = enMatch ? enMatch[1] : "";
    if (enName) {
      heroMap.set(enName.toLowerCase(), h.id);
      heroNames.set(enName.toLowerCase(), h.name);
    }
    heroNames.set(h.name, h.name);
    heroAttackTypes.set(h.id, h.attack_type);
    heroDescs.set(h.id, h.description || "");
  }

  return { heroMap, heroNames, heroAttackTypes, heroDescs };
}

async function buildRuneMapWithInfo(supabase: any, amData: any) {
  const runeMap = new Map<string, string>();
  const runeInfoMap = new Map<string, { name: string; desc: string }>();
  const sourceIdMap = new Map<string, string>(); // source_id → rune_id
  if (!supabase) return { runeMap, runeInfoMap, sourceIdMap };

  const { data: runes } = await supabase.from("runes").select("id, name, description, source_id").eq("is_active", true);
  if (!runes) return { runeMap, runeInfoMap, sourceIdMap };

  for (const r of runes) {
    runeInfoMap.set(r.id, { name: r.name, desc: r.description || "" });
    if (r.source_id) sourceIdMap.set(r.source_id, r.id);
  }

  const amAugmentNames = new Map(amData.augments.map((a: any) => [a.id, a.name_cn]));
  for (const r of runes) {
    // 优先用 source_id 匹配（不受改名影响）
    if (r.source_id && amAugmentNames.has(r.source_id)) {
      runeMap.set(r.source_id, r.id);
      continue;
    }
    // 其次用中文名匹配
    const amEntries = Array.from(amAugmentNames.entries()) as [string, string][];
    for (let j = 0; j < amEntries.length; j++) {
      const [augId, augNameCn] = amEntries[j];
      if (augNameCn === r.name) { runeMap.set(augId, r.id); break; }
    }
  }

  return { runeMap, runeInfoMap, sourceIdMap };
}

function filterCombos(combos: any[], heroIds: string[] | undefined, heroMap: Map<string, string>) {
  return combos.filter((c) => {
    const heroId = heroMap.get(c.championId.toLowerCase());
    if (!heroId) return false;
    if (heroIds && heroIds.length > 0 && !heroIds.includes(heroId)) return false;
    return true;
  });
}

function buildLog(patch: string, dryRun: boolean, mode: string, matchedCombos: number, entriesGenerated: number, errors: string[], preview: RecPreview): Partial<UpdateLog> {
  return {
    log_type: "generate-recs",
    title: `推荐配置同步 — ${dryRun ? "预览" : "执行"} [${mode === "incremental" ? "增量" : "全量"}] (P${patch})`,
    summary: dryRun
      ? `预览：新增 ${preview.summary.toAdd}，更新 ${preview.summary.toUpdate}，跳过手动 ${preview.summary.skipManual}，跳过已存在 ${preview.summary.skipExists}`
      : `已完成：新增 ${preview.summary.toAdd}，更新 ${preview.summary.toUpdate}，保护手动 ${preview.summary.skipManual}`,
    details: { patch, mode, matchedCombos, entriesGenerated, errors, preview },
    stats: { matchedCombos, entriesGenerated, errors: errors.length, ...preview.summary },
    run_mode: "manual",
    status: "completed",
  };
}

function buildAnalysisPrompt(hero: any, runes: any[]): string {
  const runeList = runes.map((r) =>
    `[${r.tier === "chromatic" ? "彩色" : r.tier === "gold" ? "金色" : "银色"}] ${r.name}: ${r.description} (${r.effect_type})`
  ).join("\n");

  return `你是英雄联盟大乱斗(ARAM)海克斯符文专家。请分析以下英雄与所有海克斯符文的适配度。

英雄信息：
- 名称：${hero.name}
- 称号：${hero.title}
- 角色：${hero.role}
- 攻击类型：${hero.attack_type}
- 技能描述：${hero.description || "无"}

评估要求：
1. 基于英雄的攻击类型(AP/AD/Tank/Support)、技能机制、团战定位，评估与每个符文的适配度
2. 考虑当前版本装备流行趋势（如心之钢、电刀等装备对符文选择的影响）
3. priority_score 范围 0-100，低于30分的不要输出
4. 每个英雄按不同流派(playstyle)给出建议：
   - AP英雄至少要有"爆发输出流"和"持续消耗流"
   - AD英雄至少要有"攻速暴击流"和"技能收割流"
   - Tank英雄至少要有"开团控制流"和"成长坦克流"
   - Support英雄至少要有"保护治疗流"和"控制开团流"
5. phase代表最佳选择阶段：3级/7级/11级/15级
6. reason简要说明适配原因（中文）
7. build_synergy说明出装搭配思路（中文）
8. adjustment_tags提供标签如：anti_tank, sustain, anti_cc, poke, burst, scaling
9. 特别注意：如果装备系统有更新（如心之钢增强），需要反映在推荐中

所有海克斯符文列表：
${runeList}

输出JSON格式，不要输出其他内容：
{
  "recommendations": [
    {
      "playstyle_name": "流派名称",
      "playstyle_desc": "流派简介",
      "rune_name": "符文名称（用中文名）",
      "phase": "3",
      "priority_score": 85,
      "reason": "适配原因",
      "build_synergy": "出装搭配思路",
      "adjustment_tags": ["tag1"],
      "fetter_boost": []
    }
  ]
}`;
}

// 导出羁绊同步（保持不变）
export { syncFetters } from "./sync-fetters";
