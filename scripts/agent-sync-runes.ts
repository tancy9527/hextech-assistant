/**
 * 海克斯符文池同步 CLI 脚本
 * 从 arammayhem.com 获取最新符文数据（含官方中文名）并同步到 Supabase
 *
 * 用法: npx tsx scripts/agent-sync-runes.ts [--dry-run]
 *
 * 数据源:
 *   主: https://arammayhem.com/search-index.json (209符文，含zh-CN名称和描述)
 *   备: CommunityDragon (仅英文名+等级)
 */

// 加载环境变量
import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(__dirname, "..", ".env.local") });

import { syncRunes, previewSync } from "../src/lib/agent/sync-runes-core";

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  if (dryRun) {
    console.log("🔍 预览模式：仅对比数据，不写入数据库\n");
  } else {
    console.log("⚡ 执行模式：将同步数据到 Supabase\n");
  }

  console.log("═".repeat(50));
  console.log("📥 从 arammayhem.com 获取数据...");

  try {
    const { result, log } = dryRun ? await previewSync() : await syncRunes({ dryRun: false });

    console.log(`\n📊 同步结果:`);
    console.log(`   远程符文总数: ${log.stats?.remoteCount}`);
    console.log(`   本地符文总数: ${log.stats?.localCount}`);
    console.log(`   新增: ${result.newRunes}`);
    console.log(`   品质更新: ${result.updatedRunes}`);
    console.log(`   停用: ${result.deactivatedRunes}`);

    if (result.details.length > 0) {
      console.log(`\n📋 变更详情:`);
      for (const d of result.details.slice(0, 30)) {
        const actionLabel = d.action === "created" ? "✅ 新增" :
          d.action === "updated" ? "🔄 更新" :
          d.action === "deactivated" ? "❌ 停用" :
          d.action === "skipped" ? "⏭️ 跳过" : d.action;
        const changes = d.changes ? ` (${JSON.stringify(d.changes)})` : "";
        console.log(`   ${actionLabel} ${d.name} (${d.nameEn})${changes}`);
      }
      if (result.details.length > 30) {
        console.log(`   ... 还有 ${result.details.length - 30} 条`);
      }
    }

    console.log(`\n${"═".repeat(50)}`);
    if (dryRun) {
      console.log("💡 预览完成。使用 --dry-run 查看变更，不加参数执行同步");
    } else {
      console.log("✅ 同步完成！日志已写入数据库 update_logs 表");
    }
  } catch (err: any) {
    console.error(`\n❌ 同步失败: ${err.message}`);
    process.exit(1);
  }
}

main();
