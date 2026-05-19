-- Hextech ARAM Assistant — Database Schema

-- Enums
CREATE TYPE attack_type AS ENUM ('AP', 'AD', 'Tank', 'Support');
CREATE TYPE rune_quality AS ENUM ('silver', 'gold', 'prismatic');
CREATE TYPE rune_tier AS ENUM ('chromatic', 'gold', 'silver');
CREATE TYPE game_phase AS ENUM ('3', '7', '11', '15');

-- Heroes table
CREATE TABLE heroes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  role TEXT NOT NULL,
  attack_type attack_type NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT DEFAULT '',
  nicknames TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hero playstyles (hero-specific build archetypes)
CREATE TABLE hero_playstyles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_id UUID REFERENCES heroes(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(hero_id, name)
);

-- Runes table
CREATE TABLE runes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  quality rune_quality NOT NULL,
  tier rune_tier NOT NULL DEFAULT 'silver',
  effect_type TEXT NOT NULL,
  pros TEXT DEFAULT '',
  cons TEXT DEFAULT '',
  scenarios TEXT DEFAULT '',
  icon_url TEXT DEFAULT '',
  special_label TEXT DEFAULT '',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rune synergies (for dynamic re-ranking based on selected runes)
CREATE TABLE rune_synergies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rune_id UUID REFERENCES runes(id) ON DELETE CASCADE NOT NULL,
  synergizes_with UUID REFERENCES runes(id) ON DELETE CASCADE NOT NULL,
  synergy_score INTEGER NOT NULL DEFAULT 0,
  reason TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(rune_id, synergizes_with)
);

-- Fetters (羁绊) — Rune set bonuses, like TFT traits
CREATE TABLE fetters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  effect_2 TEXT DEFAULT '',
  effect_3 TEXT DEFAULT '',
  effect_4 TEXT DEFAULT '',
  icon_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rune-Fetter junction (which runes belong to which fetter sets)
CREATE TABLE rune_fetters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rune_id UUID REFERENCES runes(id) ON DELETE CASCADE NOT NULL,
  fetter_id UUID REFERENCES fetters(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(rune_id, fetter_id)
);

-- Hero-Rune recommendations (junction table)
CREATE TABLE hero_rune_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_id UUID REFERENCES heroes(id) ON DELETE CASCADE NOT NULL,
  rune_id UUID REFERENCES runes(id) ON DELETE CASCADE NOT NULL,
  playstyle_id UUID REFERENCES hero_playstyles(id) ON DELETE CASCADE,
  phase game_phase NOT NULL,
  priority_score INTEGER NOT NULL DEFAULT 50,
  reason TEXT NOT NULL,
  build_synergy TEXT NOT NULL,
  adjustment_tags TEXT[] DEFAULT '{}',
  fetter_boost TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(hero_id, rune_id, playstyle_id, phase)
);

-- Hero build cards (image guides per hero+playstyle)
CREATE TABLE hero_build_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_id UUID REFERENCES heroes(id) ON DELETE CASCADE NOT NULL,
  playstyle_id UUID REFERENCES hero_playstyles(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  title TEXT DEFAULT '',
  description TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(hero_id, playstyle_id)
);

-- Indexes
CREATE INDEX idx_rec_hero_phase ON hero_rune_recommendations(hero_id, phase);
CREATE INDEX idx_rec_playstyle ON hero_rune_recommendations(playstyle_id);
CREATE INDEX idx_rec_priority ON hero_rune_recommendations(priority_score DESC);
CREATE INDEX idx_rec_tags ON hero_rune_recommendations USING GIN(adjustment_tags);
CREATE INDEX idx_playstyle_hero ON hero_playstyles(hero_id);
CREATE INDEX idx_synergy_rune ON rune_synergies(rune_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_rune_tier ON runes(name, tier);
CREATE INDEX idx_rune_fetters_rune ON rune_fetters(rune_id);
CREATE INDEX idx_rune_fetters_fetter ON rune_fetters(fetter_id);
CREATE INDEX idx_build_card_hero ON hero_build_cards(hero_id);
CREATE INDEX idx_runes_active ON runes(is_active) WHERE is_active = true;

-- RLS: Enable on all tables
ALTER TABLE heroes ENABLE ROW LEVEL SECURITY;
ALTER TABLE runes ENABLE ROW LEVEL SECURITY;
ALTER TABLE rune_synergies ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_rune_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_playstyles ENABLE ROW LEVEL SECURITY;
ALTER TABLE fetters ENABLE ROW LEVEL SECURITY;
ALTER TABLE rune_fetters ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_build_cards ENABLE ROW LEVEL SECURITY;

-- Public read access for reference data
CREATE POLICY "Public read heroes" ON heroes FOR SELECT USING (true);
CREATE POLICY "Public read runes" ON runes FOR SELECT USING (true);
CREATE POLICY "Public read synergies" ON rune_synergies FOR SELECT USING (true);
CREATE POLICY "Public read recommendations" ON hero_rune_recommendations FOR SELECT USING (true);
CREATE POLICY "Public read playstyles" ON hero_playstyles FOR SELECT USING (true);
CREATE POLICY "Public read fetters" ON fetters FOR SELECT USING (true);
CREATE POLICY "Public read rune_fetters" ON rune_fetters FOR SELECT USING (true);
CREATE POLICY "Public read build_cards" ON hero_build_cards FOR SELECT USING (true);
-- Allow insert/update/delete for admin operations (public for now, admin auth via API)
CREATE POLICY "Public insert runes" ON runes FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update runes" ON runes FOR UPDATE USING (true);
CREATE POLICY "Public insert synergies" ON rune_synergies FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert recommendations" ON hero_rune_recommendations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update recommendations" ON hero_rune_recommendations FOR UPDATE USING (true);
CREATE POLICY "Public delete recommendations" ON hero_rune_recommendations FOR DELETE USING (true);
CREATE POLICY "Public insert playstyles" ON hero_playstyles FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update playstyles" ON hero_playstyles FOR UPDATE USING (true);
CREATE POLICY "Public delete playstyles" ON hero_playstyles FOR DELETE USING (true);
CREATE POLICY "Public insert fetters" ON fetters FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update fetters" ON fetters FOR UPDATE USING (true);
CREATE POLICY "Public delete fetters" ON fetters FOR DELETE USING (true);
CREATE POLICY "Public insert rune_fetters" ON rune_fetters FOR INSERT WITH CHECK (true);
CREATE POLICY "Public delete rune_fetters" ON rune_fetters FOR DELETE USING (true);
CREATE POLICY "Public insert build_cards" ON hero_build_cards FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update build_cards" ON hero_build_cards FOR UPDATE USING (true);
CREATE POLICY "Public delete build_cards" ON hero_build_cards FOR DELETE USING (true);
