-- Data cleanup based on CDragon 16.3

-- Disable runes not in CDragon
UPDATE runes SET is_active = false WHERE name IN (
  '潘朵拉的盒子',
  '轨道镭射',
  '洞悉',
  '范德尔之锤',
  '传火',
  '祈祷',
  '被信仰赋予力量',
  '终极连发',
  '双倍打击',
  '嗜血',
  '属性叠属性',
  '轻语',
  '适应之力转换AP',
  '适应之力转换AD',
  '护盾爆炸',
  '灵魂之魂',
  '护盾猛击',
  '全能吸血',
  '透视',
  '禁疗',
  '回音',
  '信号飞弹'
);

-- Fix tier/quality mismatches
UPDATE runes SET quality = 'prismatic', tier = 'chromatic' WHERE name = '尖端发明家';
UPDATE runes SET quality = 'silver', tier = 'silver' WHERE name = '防护面纱';
UPDATE runes SET quality = 'silver', tier = 'silver' WHERE name = '暗夜猎杀';
UPDATE runes SET quality = 'prismatic', tier = 'chromatic' WHERE name = '任务：乌尔夫的冠军';
UPDATE runes SET quality = 'gold', tier = 'gold' WHERE name = '强化防御';
UPDATE runes SET quality = 'gold', tier = 'gold' WHERE name = '缩小引擎';
UPDATE runes SET quality = 'gold', tier = 'gold' WHERE name = '远程武器';
UPDATE runes SET quality = 'silver', tier = 'silver' WHERE name = '属性！';
UPDATE runes SET quality = 'prismatic', tier = 'chromatic' WHERE name = '属性叠属性叠属性！';
UPDATE runes SET quality = 'prismatic', tier = 'chromatic' WHERE name = '踢倒';