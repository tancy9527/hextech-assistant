/**
 * 从 all_data_complete.json 匹配符文并生成 icon_url 更新 SQL (v3 - 保守匹配)
 * 用法: node scripts/update_rune_icons.js
 * 输出: supabase/update_icons.sql
 */
const fs = require("fs");
const path = require("path");

// 手动映射表：种子名 → JSON 名（同名符文，只是不同翻译版本）
const MANUAL_MAP = {
  "黎明使者的决心": "黎明使者的坚决",
  "急救箱": "急救用具",
  "冰霜之魂": "冰霜幽灵",
  "闪光2号": "闪光弹",
  "死亡轰炸": "死亡之环",
  "炼狱扳机": "扳机炼狱",
  "潘多拉的盒子": "潘朵拉的盒子",
  "任务：乌尔夫的冠军": "任务：海牛阿福的勇士",
  "不倦回复": "无休回复",
  "恶魔之舞": "魔鬼之舞",
  "往复循环": "无限循环往复",
  "适应之力转换AP": "物理转魔法",
  "适应之力转换AD": "魔法转物理",
  "终极革命": "终极刷新",
  "妖精魔法": "精怪魔法",
  "不可触碰": "你摸不到",
  "被信仰赋予力量": "信念者的强化",
  "灵体武器": "虚幻武器",
  "嗜血": "渴血",
  "易伤": "易损",
  "暴击专精": "关键暴击",
  "暗夜猎杀": "夜狩",
  "炽热黎明": "炽烈黎明",
  "轻语": "穿针引线",
  "钝力": "大力",
  "巫术思维": "巫师式思考",
  "重拳出击": "重量级打击手",
  "坚定不移": "不动如山",
  "强化防御": "会心防御",
  "暴击施法": "由暴生急",
  "护盾猛击": "强力护盾",
  "斥力器": "退敌力场",
  "疾行": "暗影疾奔",
  "远程武器": "万用瞄准镜",
  "属性叠属性": "属性叠属性！",
  "巨型雪球": "史上最大雪球",
};

const json = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "all_data_complete.json"), "utf8")
);

const jsonRunes = json.runes;
const jsonByName = {};
for (const r of jsonRunes) {
  jsonByName[r.cn] = r;
}

// 从 seed.sql 提取所有符文名
const seed = fs.readFileSync(
  path.join(__dirname, "..", "supabase", "seed.sql"),
  "utf8"
);
const seedNames = [];
const lines = seed.split("\n");
let inRunes = false;
for (const line of lines) {
  if (line.includes("INSERT INTO runes")) inRunes = true;
  else if (line.includes("INSERT INTO hero_playstyles")) inRunes = false;
  else if (line.includes("INSERT INTO fetters")) inRunes = false;
  else if (inRunes && line.includes("'")) {
    const match = line.match(/\(\s*'([^']+)'/);
    if (match) seedNames.push(match[1]);
  }
}

const uniqueSeedNames = [...new Set(seedNames)];
console.log("种子符文数（去重）:", uniqueSeedNames.length);
console.log("JSON 符文数:", jsonRunes.length);

const matched = [];
const unmatched = [];

for (const name of uniqueSeedNames) {
  let target = null;

  // 1. 精确匹配
  if (jsonByName[name]) {
    target = jsonByName[name];
    matched.push({ name, icon_url: target.icon_url, method: "exact" });
    continue;
  }

  // 2. 手动映射
  if (MANUAL_MAP[name] && jsonByName[MANUAL_MAP[name]]) {
    target = jsonByName[MANUAL_MAP[name]];
    matched.push({ name, icon_url: target.icon_url, method: "manual" });
    continue;
  }

  // 3. 去掉后缀匹配（如"lv."）
  const clean = name.replace(/lv\..*/i, "").trim();
  if (clean !== name && jsonByName[clean]) {
    matched.push({ name, icon_url: jsonByName[clean].icon_url, method: "clean" });
    continue;
  }

  unmatched.push(name);
}

console.log(`\n匹配成功: ${matched.length}`);
console.log(`  精确: ${matched.filter(m => m.method === "exact").length}`);
console.log(`  手动: ${matched.filter(m => m.method === "manual").length}`);
console.log(`未匹配: ${unmatched.length}`);
console.log("\n未匹配符文:", unmatched.join("\n  "));

// 验证 icon_url 格式
let sql = `-- 批量更新符文图标 (${new Date().toISOString().split("T")[0]})
-- 匹配: ${matched.length} 未匹配: ${unmatched.length}

BEGIN;

`;

for (const m of matched) {
  sql += `UPDATE runes SET icon_url = '${m.icon_url}' WHERE name = '${m.name}';\n`;
}

sql += `\nCOMMIT;\n`;

fs.writeFileSync(
  path.join(__dirname, "..", "supabase", "update_icons.sql"),
  sql
);
console.log(`\nSQL 已写入 supabase/update_icons.sql (${matched.length} 条 UPDATE)`);
console.log(`\n可手动在 Supabase SQL 编辑器中执行此 SQL。`);
