// Add Chinese translations for missing runes + regenerate import SQL
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const translations = {
  'ReEnergize': { name: '重新充能', effect_type: 'utility', pros: '周期性回复生命和法力', cons: '回复量有限', scenarios: '需要续航的英雄' },
  'Upgrade_Thornmail': { name: '升级：荆棘之甲', effect_type: 'defense', pros: '强化反伤效果', cons: '需要出荆棘之甲', scenarios: '坦克英雄' },
  'Fetch': { name: '拾取', effect_type: 'utility', pros: '自动拾取附近道具', cons: '范围有限', scenarios: '通用' },
  'PromQueen': { name: '舞会皇后', effect_type: 'utility', pros: '周期性友方增益光环', cons: '光环范围有限', scenarios: '辅助英雄' },
  'ARAM_FeeltheBurn': { name: '感受灼烧', effect_type: 'damage', pros: '技能附加灼烧效果', cons: '需要技能命中', scenarios: '技能型英雄' },
  'ARAM_MissingPingAugment': { name: '信号增强', effect_type: 'utility', pros: '发送信号获得增益', cons: '需要主动发信号', scenarios: '团队协作' },
  'InfiniteRecursion': { name: '无限递归', effect_type: 'damage', pros: '技能连击伤害递增', cons: '需要连续命中', scenarios: '技能连招型英雄' },
  'ARAM_CrackOpenThatEgg': { name: '敲开蛋壳', effect_type: 'defense', pros: '护盾爆炸造成范围伤害', cons: '依赖护盾触发', scenarios: '有护盾技能的英雄' },
  'ARAM_Juiced': { name: '充能', effect_type: 'utility', pros: '获得强化增益', cons: '持续时间有限', scenarios: '通用' },
  'TrainOfTheDead': { name: '最终都市列车', effect_type: 'damage', pros: '死亡时释放列车撞击', cons: '需要死亡触发', scenarios: '开团坦克' },
  'ARAM_EmpoweredByTheFaithful': { name: '信仰之力', effect_type: 'damage', pros: '治疗/护盾叠层释放AOE', cons: '需要时间叠层', scenarios: '辅助英雄' },
  'KillSecured': { name: '确保击杀', effect_type: 'damage', pros: '低血量敌人额外伤害', cons: '对满血无效', scenarios: '收割型英雄' },
  'ARAM_Purist_Caster': { name: '纯粹施法者', effect_type: 'damage', pros: '提升技能伤害', cons: '降低攻速', scenarios: '纯技能型法师' },
  'YouSpinMeRightRound': { name: '旋转不停', effect_type: 'damage', pros: '周期性旋转AOE', cons: '范围有限', scenarios: '近战英雄' },
  'Goldrend': { name: '金裂', effect_type: 'damage', pros: '金币转化为伤害', cons: '消耗金币', scenarios: '经济型英雄' },
  'ARAM_Zealot': { name: '狂热者', effect_type: 'damage', pros: '攻速和移速加成', cons: '受到更多伤害', scenarios: 'ADC' },
  'ARAM_VoidRift': { name: '虚空裂隙', effect_type: 'damage', pros: '技能留下伤害区域', cons: '区域固定', scenarios: '技能型法师' },
  'Poltergeist': { name: '捣蛋鬼', effect_type: 'utility', pros: '周期性随机效果', cons: '随机性强', scenarios: '通用' },
  'WindBeneathBlade': { name: '剑下之风', effect_type: 'mobility', pros: '攻击后获得移速', cons: '需要持续攻击', scenarios: '近战AD' },
  'ARAM_Quest_VoidImmolation': { name: '任务：虚空献祭', effect_type: 'damage', pros: '完成条件获得虚空之力', cons: '需要完成任务', scenarios: '任务型英雄' },
  'ARAM_WeightedPopoffs': { name: '重磅登场', effect_type: 'damage', pros: '击杀后爆炸伤害', cons: '需要击杀触发', scenarios: '收割型英雄' },
  'ARAM_WatchOutGrapefruit': { name: '小心葡萄柚', effect_type: 'damage', pros: '周期性投掷爆炸物', cons: '自动释放不可控', scenarios: '通用' },
  'ARAM_Poro_Blast': { name: '魄罗爆破', effect_type: 'damage', pros: '魄罗爆炸造成伤害', cons: '需要魄罗命中', scenarios: '魄罗相关' },
  'CriticalMissile': { name: '暴击飞弹', effect_type: 'damage', pros: '暴击追加飞弹', cons: '非暴击流无效', scenarios: '暴击流AD' },
  'ARAM_StuckInHereWithMe': { name: '与我困在一起', effect_type: 'defense', pros: '限制敌人移动', cons: '自己也受影响', scenarios: '坦克英雄' },
  'Dropybara_Active': { name: '水豚掉落', effect_type: 'utility', pros: '周期性掉落道具', cons: '需要拾取', scenarios: '通用' },
  'HandOfBaron': { name: '男爵之手', effect_type: 'damage', pros: '获得纳什男爵之力', cons: '持续时间有限', scenarios: '通用' },
  'ARAM_DoubleTap': { name: '双击', effect_type: 'damage', pros: '攻击双重触发', cons: '单次伤害降低', scenarios: '攻击特效英雄' },
  'HextechSoul': { name: '海克斯龙魂', effect_type: 'utility', pros: '获得海克斯龙魂效果', cons: '无其他效果', scenarios: '通用' },
  'ARAM_TheBrutalizer': { name: '残暴之力', effect_type: 'damage', pros: '+穿甲+攻击力', cons: '纯输出', scenarios: 'AD刺客' }
};

const qualityMap = { 2: 'prismatic', 1: 'gold', 0: 'silver' };
const tierMap = { 2: 'chromatic', 1: 'gold', 0: 'silver' };

// Load data
const data = fs.readFileSync(path.join(ROOT, 'scripts/kiwi_16.3.json'), 'utf8');
const blocks = data.split('"__type":"AugmentData"');
const cdRarity = {};
for (const block of blocks) {
  const nm = block.match(/"AugmentNameId":"([^"]+)"/);
  if (!nm) continue;
  const rm = block.match(/"rarity":(\d+)/);
  cdRarity[nm[1]] = rm ? parseInt(rm[1]) : 0;
}

// Update overrides
const overrides = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/rune-overrides.json'), 'utf8'));
for (const [nameEn, trans] of Object.entries(translations)) {
  const existing = overrides.find(o => o.nameEn === nameEn);
  if (existing) {
    Object.assign(existing, trans);
  } else {
    const r = cdRarity[nameEn] !== undefined ? cdRarity[nameEn] : 0;
    overrides.push({
      nameEn, name: trans.name,
      tier: tierMap[r], quality: qualityMap[r],
      effect_type: trans.effect_type,
      pros: trans.pros, cons: trans.cons, scenarios: trans.scenarios
    });
  }
}
fs.writeFileSync(path.join(ROOT, 'scripts/rune-overrides.json'), JSON.stringify(overrides, null, 2));
console.log('Overrides updated: ' + overrides.length + ' runes');

// Regenerate import SQL
const seed = fs.readFileSync(path.join(ROOT, 'supabase/seed.sql'), 'utf8');
let lines = [];
lines.push('-- Import missing runes with Chinese names and descriptions');
lines.push('-- Run in Supabase SQL Editor');
lines.push('-- Generated from CDragon 16.3 data');
lines.push('');

let total = 0;
['chromatic', 'gold', 'silver'].forEach(tier => {
  const tierLines = [];
  for (const [nameEn, r] of Object.entries(cdRarity)) {
    if (tierMap[r] !== tier) continue;
    const ov = overrides.find(o => o.nameEn === nameEn);
    if (!ov) continue;
    if (seed.includes("'" + ov.name + "'")) continue;
    const nm = ov.name.replace(/'/g, "''");
    const desc = (ov.pros || '') + (ov.cons ? '。注意：' + ov.cons : '');
    const p = (ov.pros || '').replace(/'/g, "''");
    const c = (ov.cons || '').replace(/'/g, "''");
    const s = (ov.scenarios || '').replace(/'/g, "''");
    tierLines.push("INSERT INTO runes (name, description, quality, tier, effect_type, pros, cons, scenarios) VALUES ('" + nm + "', '" + desc.replace(/'/g, "''") + "', '" + qualityMap[r] + "', '" + tier + "', '" + (ov.effect_type || 'utility') + "', '" + p + "', '" + c + "', '" + s + "') ON CONFLICT (name) DO UPDATE SET quality = EXCLUDED.quality, tier = EXCLUDED.tier, description = EXCLUDED.description, pros = EXCLUDED.pros, cons = EXCLUDED.cons, scenarios = EXCLUDED.scenarios;");
    total++;
  }
  if (tierLines.length > 0) {
    const label = tier === 'chromatic' ? '彩色' : tier === 'gold' ? '金色' : '银色';
    lines.push('-- ' + label + ' (' + tierLines.length + ')');
    lines = lines.concat(tierLines);
    lines.push('');
  }
});

fs.writeFileSync(path.join(ROOT, 'supabase/import_missing_runes.sql'), lines.join('\n'));
console.log('Import SQL regenerated: ' + total + ' runes');
