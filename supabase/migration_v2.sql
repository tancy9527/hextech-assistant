-- ============================================================
-- Hextech Assistant — v2 迁移脚本
-- 在 Supabase SQL Editor 中运行此脚本
-- 只新增，不删除，不破坏已有数据
-- ============================================================

-- 1. 给现有 runes 表添加新列（如果不存在则添加）
ALTER TABLE runes ADD COLUMN IF NOT EXISTS special_label TEXT DEFAULT '';
ALTER TABLE runes ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- 2. 给 hero_rune_recommendations 表添加新列
ALTER TABLE hero_rune_recommendations ADD COLUMN IF NOT EXISTS fetter_boost TEXT[] DEFAULT '{}';

-- 3. 新增羁绊定义表
CREATE TABLE IF NOT EXISTS fetters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  effect_2 TEXT DEFAULT '',
  effect_3 TEXT DEFAULT '',
  effect_4 TEXT DEFAULT '',
  icon_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. 新增符文-羁绊关联表
CREATE TABLE IF NOT EXISTS rune_fetters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rune_id UUID REFERENCES runes(id) ON DELETE CASCADE NOT NULL,
  fetter_id UUID REFERENCES fetters(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(rune_id, fetter_id)
);

-- 5. 新增图文推荐卡表
CREATE TABLE IF NOT EXISTS hero_build_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_id UUID REFERENCES heroes(id) ON DELETE CASCADE NOT NULL,
  playstyle_id UUID REFERENCES hero_playstyles(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  title TEXT DEFAULT '',
  description TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(hero_id, playstyle_id)
);

-- 6. 新增索引
CREATE INDEX IF NOT EXISTS idx_rune_fetters_rune ON rune_fetters(rune_id);
CREATE INDEX IF NOT EXISTS idx_rune_fetters_fetter ON rune_fetters(fetter_id);
CREATE INDEX IF NOT EXISTS idx_build_card_hero ON hero_build_cards(hero_id);
CREATE INDEX IF NOT EXISTS idx_runes_active ON runes(is_active) WHERE is_active = true;

-- 7. 新表的 RLS
ALTER TABLE fetters ENABLE ROW LEVEL SECURITY;
ALTER TABLE rune_fetters ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_build_cards ENABLE ROW LEVEL SECURITY;

-- 8. 新表的 RLS 策略（如果不存在则创建）
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read fetters') THEN
    CREATE POLICY "Public read fetters" ON fetters FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read rune_fetters') THEN
    CREATE POLICY "Public read rune_fetters" ON rune_fetters FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read build_cards') THEN
    CREATE POLICY "Public read build_cards" ON hero_build_cards FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public insert fetters') THEN
    CREATE POLICY "Public insert fetters" ON fetters FOR INSERT WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public update fetters') THEN
    CREATE POLICY "Public update fetters" ON fetters FOR UPDATE USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public delete fetters') THEN
    CREATE POLICY "Public delete fetters" ON fetters FOR DELETE USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public insert rune_fetters') THEN
    CREATE POLICY "Public insert rune_fetters" ON rune_fetters FOR INSERT WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public delete rune_fetters') THEN
    CREATE POLICY "Public delete rune_fetters" ON rune_fetters FOR DELETE USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public insert build_cards') THEN
    CREATE POLICY "Public insert build_cards" ON hero_build_cards FOR INSERT WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public update build_cards') THEN
    CREATE POLICY "Public update build_cards" ON hero_build_cards FOR UPDATE USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public delete build_cards') THEN
    CREATE POLICY "Public delete build_cards" ON hero_build_cards FOR DELETE USING (true);
  END IF;
END $$;

-- 9. 更新现有 runes 表 RLS（如果缺少 update 策略）
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public update runes') THEN
    CREATE POLICY "Public update runes" ON runes FOR UPDATE USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public update recommendations') THEN
    CREATE POLICY "Public update recommendations" ON hero_rune_recommendations FOR UPDATE USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public delete recommendations') THEN
    CREATE POLICY "Public delete recommendations" ON hero_rune_recommendations FOR DELETE USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public insert playstyles') THEN
    CREATE POLICY "Public insert playstyles" ON hero_playstyles FOR INSERT WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public update playstyles') THEN
    CREATE POLICY "Public update playstyles" ON hero_playstyles FOR UPDATE USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public delete playstyles') THEN
    CREATE POLICY "Public delete playstyles" ON hero_playstyles FOR DELETE USING (true);
  END IF;
END $$;

-- 10. 清理无用的 game_sessions 表
DROP TABLE IF EXISTS game_sessions CASCADE;

-- 12. 推荐配置 phase 改为可选（NULL = 全阶段适用）
ALTER TABLE hero_rune_recommendations ALTER COLUMN phase DROP NOT NULL;

-- 13. 清理不存在于当前版本的符文（软删除）
-- 如果你不确定，可以先在后台管理逐個确认，或注释掉下面这段
UPDATE runes SET is_active = false WHERE name IN (
  '终极革命', '反伤装甲', '禁疗', '回音',
  '适应之力转换AP', '适应之力转换AD', '强化防御', '护盾爆炸',
  '灵魂之魂', '全能吸血', '透视', '疾行',
  '嗜血', '属性叠属性', '易伤', '轻语', '双倍打击',
  '不倦回复', '坚韧'
);

-- 14. 修正符文名：神圣干涉 → 神圣干预（国服名称）
UPDATE runes SET name = '神圣干预', is_active = true WHERE name = '神圣干涉';

-- 15. 修正符文品质（根据 CDragon 16.3 数据校正）
UPDATE runes SET quality = 'silver', tier = 'silver' WHERE name = '质变：黄金阶';
UPDATE runes SET quality = 'gold', tier = 'gold' WHERE name = '质变：棱彩阶';

-- 16. 批量修正符文品质（根据 CDragon 16.3 数据）
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
