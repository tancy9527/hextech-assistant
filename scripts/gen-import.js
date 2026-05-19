// Generate import SQL for runes missing from seed.sql
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const data = fs.readFileSync(path.join(ROOT, 'scripts/kiwi_16.3.json'), 'utf8');
const blocks = data.split('"__type":"AugmentData"');
const cdRunes = {};
for (const block of blocks) {
  const nm = block.match(/"AugmentNameId":"([^"]+)"/);
  if (!nm) continue;
  const rm = block.match(/"rarity":(\d+)/);
  cdRunes[nm[1]] = rm ? parseInt(rm[1]) : 0;
}

const overrides = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/rune-overrides.json'), 'utf8'));
const seed = fs.readFileSync(path.join(ROOT, 'supabase/seed.sql'), 'utf8');

const qualityMap = { 2: 'prismatic', 1: 'gold', 0: 'silver' };
const tierMap = { 2: 'chromatic', 1: 'gold', 0: 'silver' };

let sql = ['-- Import missing runes from CDragon 16.3', '-- Run in Supabase SQL Editor', ''];

let total = 0;
['chromatic', 'gold', 'silver'].forEach(tier => {
  const lines = [];
  for (const [nameEn, cdR] of Object.entries(cdRunes)) {
    if (tierMap[cdR] !== tier) continue;
    const ov = overrides.find(o => o.nameEn === nameEn);
    const cnName = ov ? ov.name : nameEn.replace('ARAM_', '').replace(/([a-z])([A-Z])/g, '$1 $2');
    // Check seed
    if (seed.includes("'" + cnName + "'")) continue;
    const nm = cnName.replace(/'/g, "''");
    lines.push("INSERT INTO runes (name, description, quality, tier, effect_type) VALUES ('" + nm + "', '待补充', '" + qualityMap[cdR] + "', '" + tier + "', 'utility') ON CONFLICT (name) DO UPDATE SET quality = EXCLUDED.quality, tier = EXCLUDED.tier;");
    total++;
  }
  if (lines.length > 0) {
    const label = tier === 'chromatic' ? '彩色' : tier === 'gold' ? '金色' : '银色';
    sql.push('-- ' + label + ' (' + lines.length + ')');
    sql = sql.concat(lines);
    sql.push('');
  }
});

fs.writeFileSync(path.join(ROOT, 'supabase/import_missing_runes.sql'), sql.join('\n'));
console.log('Generated: ' + total + ' missing rune INSERTs');
