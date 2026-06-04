/**
 * 英雄-符文推荐生成 CLI 脚本
 * 从 arammayhem.com combos 数据生成 hero_rune_recommendations
 *
 * 用法:
 *   npx tsx scripts/agent-generate-recs.ts [--dry-run] [--mode=fullRefresh] [--hero=拉克丝,金克丝] [--fetters]
 *
 * 参数:
 *   --dry-run     预览模式，只看不写
 *   --mode=incremental  增量模式（默认），仅新增不重复的推荐
 *   --mode=fullRefresh  全量刷新，替换匹配英雄的非手动推荐
 *   --hero=拉克丝,金克丝  只处理指定英雄（逗号分隔中文名）
 *   --fetters     同时同步羁绊套装
 */
import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(__dirname, "..", ".env.local") });

import { generateRecsFromCombos, syncFetters } from "../src/lib/agent/generate-recs-core";

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const modeArg = process.argv.find((a) => a.startsWith("--mode="));
  const mode = (modeArg ? modeArg.replace("--mode=", "") : "incremental") as "incremental" | "fullRefresh";
  const heroArg = process.argv.find((a) => a.startsWith("--hero="));
  const heroNames = heroArg ? heroArg.replace("--hero=", "").split(",").map((s) => s.trim()) : undefined;
  const syncFettersFlag = process.argv.includes("--fetters");

  const modeLabel = mode === "fullRefresh" ? "全量刷新（替换非手动推荐）" : "增量模式（仅新增）";

  if (dryRun) {
    console.log(`🔍 预览模式 [${modeLabel}]：仅估算数据，不写入数据库\n`);
  } else {
    console.log(`⚡ 执行模式 [${modeLabel}]：将生成推荐并写入 Supabase\n`);
  }

  console.log("═".repeat(50));
  console.log("📥 从 arammayhem.com 获取 combos 数据...");

  try {
    const { results, log } = await generateRecsFromCombos({
      heroIds: heroNames,
      mode,
      dryRun,
    });

    console.log(`\n📊 推荐生成结果:`);
    console.log(`   arammayhem combo 总数: ${log.stats?.totalCombos}`);
    console.log(`   匹配到的 combo: ${log.stats?.matchedCombos}`);
    console.log(`   生成推荐条目: ${log.stats?.entriesGenerated}`);
    if (log.stats?.errors) {
      console.log(`   错误: ${log.stats?.errors}`);
    }

    const heroResults = results.filter((r) => r.entriesGenerated > 0);
    if (heroResults.length > 0) {
      console.log(`\n📋 处理英雄 (${heroResults.length} 个):`);
      for (const hr of heroResults.slice(0, 20)) {
        console.log(`   ${hr.heroName}: ${hr.entriesGenerated} 条推荐`);
      }
      if (heroResults.length > 20) {
        console.log(`   ... 还有 ${heroResults.length - 20} 个英雄`);
      }
    }

    // 同步羁绊
    if (syncFettersFlag) {
      console.log(`\n🧩 同步羁绊套装...`);
      const { created, updated } = await syncFetters({ dryRun });
      console.log(`   创建羁绊: ${created}, 更新羁绊: ${updated}`);
    }

    console.log(`\n${"═".repeat(50)}`);
    if (dryRun) {
      console.log("💡 预览完成。去掉 --dry-run 执行实际写入");
    } else {
      console.log("✅ 推荐生成完成！日志已写入数据库 update_logs 表");
    }
  } catch (err: any) {
    console.error(`\n❌ 生成失败: ${err.message}`);
    process.exit(1);
  }
}

main();
