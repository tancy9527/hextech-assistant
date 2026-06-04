-- Hextech ARAM Assistant — Agent 智能体系统数据库迁移
-- 执行方式: 在 Supabase SQL Editor 中运行此文件

-- 1. 更新日志表（记录每次同步/生成操作的详细信息）
CREATE TABLE IF NOT EXISTS update_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  log_type TEXT NOT NULL, -- 'sync-runes' | 'generate-recs'
  title TEXT NOT NULL,
  summary TEXT DEFAULT '',
  details JSONB DEFAULT '{}',
  stats JSONB DEFAULT '{}',
  run_mode TEXT DEFAULT 'manual', -- 'manual' | 'auto'
  status TEXT DEFAULT 'pending', -- 'pending' | 'running' | 'completed' | 'failed' | 'rolled_back'
  error_message TEXT,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 推荐来源追踪
ALTER TABLE hero_rune_recommendations ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'manual';
-- 'manual' | 'arammayhem' | 'ai_generated' | 'reviewed'

-- 3. 索引
CREATE INDEX IF NOT EXISTS idx_logs_type ON update_logs(log_type);
CREATE INDEX IF NOT EXISTS idx_logs_status ON update_logs(status);
CREATE INDEX IF NOT EXISTS idx_logs_created ON update_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_recs_source ON hero_rune_recommendations(source);

-- 4. 英雄 Meta 数据（胜率 + 等级）
ALTER TABLE heroes ADD COLUMN IF NOT EXISTS win_rate TEXT DEFAULT '';
ALTER TABLE heroes ADD COLUMN IF NOT EXISTS meta_tier TEXT DEFAULT '';

CREATE INDEX IF NOT EXISTS idx_heroes_meta_tier ON heroes(meta_tier);
CREATE INDEX IF NOT EXISTS idx_heroes_win_rate ON heroes(win_rate);

-- 5. 符文来源 ID（用于 arammayhem.com 匹配）
ALTER TABLE runes ADD COLUMN IF NOT EXISTS source_id TEXT DEFAULT '';
CREATE INDEX IF NOT EXISTS idx_runes_source_id ON runes(source_id);

-- 6. RLS: 公开读取日志
ALTER TABLE update_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read logs" ON update_logs FOR SELECT USING (true);
CREATE POLICY "Public insert logs" ON update_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update logs" ON update_logs FOR UPDATE USING (true);
CREATE POLICY "Public delete logs" ON update_logs FOR DELETE USING (true);

-- AI比对反馈表
CREATE TABLE IF NOT EXISTS ai_comparison_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_name TEXT NOT NULL DEFAULT '',
  data_station_name TEXT NOT NULL DEFAULT '',
  feedback_type TEXT NOT NULL,
  admin_note TEXT DEFAULT '',
  rune_pair_key TEXT DEFAULT '',
  override_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_feedback_pair ON ai_comparison_feedback(rune_pair_key);
CREATE INDEX IF NOT EXISTS idx_feedback_type ON ai_comparison_feedback(feedback_type);

ALTER TABLE update_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public ai feedback" ON ai_comparison_feedback FOR SELECT USING (true);
CREATE POLICY "Public insert ai feedback" ON ai_comparison_feedback FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update ai feedback" ON ai_comparison_feedback FOR UPDATE USING (true);
