// Reconcile database runes against CDragon official data
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// CDragon data
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

// Extract seed runes
const nameRe = /\('([^']+)'\s*,\s*'[^']*'\s*,\s*'(\w+)'\s*,\s*'(\w+)'/g;
const seedRunes = [];
let m;
while ((m = nameRe.exec(seed)) !== null) {
  seedRunes.push({ name: m[1], quality: m[2], tier: m[3] });
}

const qualityMap = { 2: 'prismatic', 1: 'gold', 0: 'silver' };
const tierMap = { 2: 'chromatic', 1: 'gold', 0: 'silver' };

// Find runes to disable
const toDisable = [];
const tierFixes = [];

for (const sr of seedRunes) {
  const ov = overrides.find(o => o.name === sr.name);
  if (!ov || cdRunes[ov.nameEn] === undefined) {
    toDisable.push(sr);
    continue;
  }
  const cdR = cdRunes[ov.nameEn];
  const correctQuality = qualityMap[cdR];
  const correctTier = tierMap[cdR];
  if (sr.quality !== correctQuality || sr.tier !== correctTier) {
    tierFixes.push({ ...sr, correctQuality, correctTier });
  }
}

// Write cleanup SQL
let sql = [];
sql.push('-- Data cleanup based on CDragon 16.3');
sql.push('');
sql.push('-- Disable runes not in CDragon');
sql.push('UPDATE runes SET is_active = false WHERE name IN (');
sql.push(toDisable.map(r => "  '" + r.name.replace(/'/g, "''") + "'").join(',\n'));
sql.push(');');
sql.push('');
sql.push('-- Fix tier/quality mismatches');
tierFixes.forEach(r => {
  sql.push("UPDATE runes SET quality = '" + r.correctQuality + "', tier = '" + r.correctTier + "' WHERE name = '" + r.name.replace(/'/g, "''") + "';");
});

fs.writeFileSync(path.join(ROOT, 'supabase/cleanup_runes.sql'), sql.join('\n'));

// Print summary
console.log('=== Cleanup Summary ===');
console.log('Disabled ' + toDisable.length + ' runes (not in CDragon):');
toDisable.forEach(r => console.log('  - ' + r.name + ' [' + r.tier + ']'));
console.log('');
console.log('Fixed ' + tierFixes.length + ' tier mismatches:');
tierFixes.forEach(r => console.log('  ~ ' + r.name + ': ' + r.tier + ' → ' + r.correctTier));
console.log('');
console.log('SQL written to supabase/cleanup_runes.sql');
