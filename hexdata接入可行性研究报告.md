# hexdata.com.cn 数据源接入 — 可行性研究与业务架构设计

> **版本**：v1.0  
> **日期**：2026年6月4日  
> **数据版本**：hexdata Patch 16.11（2026-06-02 生成）  

---

## 目录

1. [数据源分析](#1-数据源分析)
2. [核心价值评估](#2-核心价值评估)
3. [业务架构设计](#3-业务架构设计)
4. [数据库设计](#4-数据库设计)
5. [前台交互设计](#5-前台交互设计)
6. [技术实施方案](#6-技术实施方案)
7. [风险评估](#7-风险评估)

---

## 1. 数据源分析

### 1.1 现有三源对比

| 维度 | CDragon (官方) | arammayhem (社区) | hexdata (数据站) |
|------|:---:|:---:|:---:|
| 符文存在性 | ✅ 权威 | ✅ | ✅ |
| 符文中文名 | ❌ | ✅ 官方名 | ✅ |
| 符文描述 | ❌ | ✅ 详细描述 | ✅ |
| 符文稀有度 | ✅ 权威 | ✅ | ✅ |
| 符文真实胜率 | ❌ | ❌ | ✅ ⭐独家 |
| 符文选取率 | ❌ | ❌ | ✅ ⭐独家 |
| 符文图标 | ❌ | ✅ | ✅ |
| 英雄胜率 | ❌ | ✅ Tier+WinRate | ✅ 详细统计 |
| 英雄Tier | ❌ | ✅ S+~C | ✅ |
| 英雄KDA/数据 | ❌ | ❌ | ✅ ⭐独家 |
| 英雄-符文推荐 | ❌ | ✅ 666组合 | ✅ topAugments(5个) |
| 英雄-装备推荐 | ❌ | ❌ | ✅ ⭐独家 |
| 开局装备 | ❌ | ❌ | ✅ ⭐独家 |
| 核心装备 | ❌ | ❌ | ✅ ⭐独家 |
| 版本趋势 | ❌ | ❌ | ✅ ⭐独家 |
| 隐藏宝藏 | ❌ | ❌ | ✅ ⭐独家 |
| 更新时间 | PBE实时 | Patch 26.11 | Patch 16.11 |

### 1.2 hexdata 数据文件清单

| 文件 | 大小 | 内容 |
|------|------|------|
| `augments.json` | 92KB | 199个符文，含 winRate / pickRate / description / icon |
| `heroes.json` | 472KB | 172个英雄，含详细统计 + topAugments (每个5条) |
| `hero_formula_items.json` | 651KB | 172个英雄的成套装备推荐 (starterItems + coreItems) |
| `fun_data.json` | 28KB | augmentSets / versionWinners / versionLosers / hiddenGems |
| `meta.json` | 3KB | 元数据 |
| `hextech_insights.json` | 631KB | 深度分析数据 |

---

## 2. 核心价值评估

### 2.1 最关键的增量能力：装备推荐

当前海克斯助手**完全没有装备推荐功能**。hexdata 的 `hero_formula_items.json` 直接提供了每个英雄的：

```json
{
  "heroName": "腕豪",
  "starterItems": [
    { "name": "巨人腰带", "id": "1011" },
    { "name": "红水晶", "id": "1028" }
  ],
  "coreItems": [
    { "name": "心之钢", "id": "3084" },
    { "name": "霸王血铠", "id": "2501" },
    { "name": "狂徒铠甲", "id": "3083" },
    { "name": "朔极之矛", "id": "3161" }
  ]
}
```

装备与符文存在联动效果（如"钢化你心"符文 + "心之钢"装备），玩家需要同时参考两种数据。

### 2.2 符文真实数据

arammayhem 的 666 组合是社区人工编辑的（S/A/B/C 评级），但hexdata 的 `topAugments` 是基于**真实对局胜率统计**的。两者的推荐可能不同，互补价值高。

### 2.3 版本趋势和隐藏宝藏

`versionWinners/versionLosers` 能告诉玩家新版本谁变强了/变弱了。`hiddenGems` 是高胜率但低选取率的符文——是真正的"黑科技"。

---

## 3. 业务架构设计

### 3.1 总体架构

```
┌──────────────────────────────────────────────────┐
│                   海克斯助手                       │
│                                                   │
│  ┌──────────┐  ┌──────────┐  ┌───────────────┐   │
│  │ 符文选择  │  │ 装备选择  │  │ 英雄信息       │   │
│  │ (已有)   │  │ (新增)   │  │ (增强)        │   │
│  └──────────┘  └──────────┘  └───────────────┘   │
│       │              │               │            │
│       ▼              ▼               ▼            │
│  ┌───────────────────────────────────────────┐    │
│  │              推荐引擎                      │    │
│  │  符文 × 装备联动评分 + 胜率加权            │    │
│  └───────────────────────────────────────────┘    │
│                       │                           │
│                       ▼                           │
│  ┌───────────────────────────────────────────┐    │
│  │            三源数据层                       │    │
│  │  CDragon │ arammayhem │ hexdata           │    │
│  └───────────────────────────────────────────┘    │
└──────────────────────────────────────────────────┘
```

### 3.2 数据流设计

```
┌─ 后台同步 ──────────────────────────────────────┐
│                                                  │
│  AI智能体 新增卡片：⚙️ 装备&数据同步             │
│  ├─ hexdata 装备数据 → hero_formula_items 表     │
│  ├─ hexdata 符文统计 → augment_stats 表          │
│  ├─ hexdata 英雄统计 → 合并到 heroes 表           │
│  └─ hexdata 版本趋势 → version_trends 表         │
│                                                  │
│  同步策略：                                      │
│  ├─ 全量同步（每次覆盖，数据站生成新版本）       │
│  ├─ 预览展示变更的英雄装备数量                   │
│  └─ 独立于符文同步，不影响现有功能               │
└──────────────────────────────────────────────────┘

┌─ 前台展示 ──────────────────────────────────────┐
│                                                  │
│  选择英雄后：                                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │ 英雄卡片  │  │ 符文推荐  │  │ 装备推荐  │      │
│  │           │  │          │  │ ← 新增！  │      │
│  │ 胜率      │  │ S/A/B/C  │  │ 出门装    │      │
│  │ KDA       │  │ +评分    │  │ 核心装    │      │
│  │ 趋势      │  │ +胜率    │  │ 联动提示  │      │
│  └──────────┘  └──────────┘  └──────────┘      │
│                       │            │             │
│                       ▼            ▼             │
│              符文+装备联动高亮标记                │
│  （如：选了心之钢 → 钢化你心 高亮推荐）          │
└──────────────────────────────────────────────────┘
```

### 3.3 用户操作流程

```
1. 打开助手 → 搜索/选择英雄
2. 英雄卡片展示：
   - 左侧：英雄名/称号/角色
   - 右侧：胜率/等级  +  版本趋势 ↑↓
3. 下方 Tab 切换：
   [符文推荐] [装备推荐]
   
   Tab1 符文推荐（已有）：
   - 品质筛选 + 快速搜索
   - 符文卡片（含推荐理由 + 社区分数 + 真实胜率）
   
   Tab2 装备推荐（新增）：
   - 出门装（图标+名称）
   - 核心装（图标+名称+顺序）
   - 装备说明
```

---

## 4. 数据库设计

### 4.1 新增表

```sql
-- 英雄装备推荐表
CREATE TABLE hero_equipment_recs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_id UUID REFERENCES heroes(id) ON DELETE CASCADE NOT NULL,
  starter_items JSONB DEFAULT '[]',  -- [{name, id}, ...]
  core_items JSONB DEFAULT '[]',     -- [{name, id}, ...]
  patch TEXT DEFAULT '',
  source TEXT DEFAULT 'hexdata',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(hero_id)
);

-- 符文统计数据表（真实胜率/选取率）
CREATE TABLE augment_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  augment_hex_id TEXT NOT NULL,       -- hexdata的内部ID
  rune_id UUID REFERENCES runes(id) ON DELETE CASCADE,
  win_rate REAL DEFAULT 0,
  pick_rate REAL DEFAULT 0,
  games INTEGER DEFAULT 0,
  tier INTEGER DEFAULT 0,
  patch TEXT DEFAULT '',
  source TEXT DEFAULT 'hexdata',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 版本趋势表
CREATE TABLE version_trends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trend_type TEXT NOT NULL,  -- 'winner' | 'loser' | 'hidden_gem'
  hero_id UUID REFERENCES heroes(id) ON DELETE CASCADE,
  augment_id TEXT,
  win_rate REAL DEFAULT 0,
  prev_win_rate REAL DEFAULT 0,
  change_pct REAL DEFAULT 0,
  patch TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 4.2 现有表扩展

```sql
-- heroes 表补充 hexdata 统计字段
ALTER TABLE heroes ADD COLUMN IF NOT EXISTS hex_kda REAL;
ALTER TABLE heroes ADD COLUMN IF NOT EXISTS hex_games INTEGER;
ALTER TABLE heroes ADD COLUMN IF NOT EXISTS hex_avg_damage REAL;
ALTER TABLE heroes ADD COLUMN IF NOT EXISTS hex_patch TEXT;
```

---

## 5. 前台交互设计

### 5.1 英雄卡片增强

```
┌─────────────────────────────────────────────┐
│  🔮 拉克丝                                    │
│  Lux — 光辉女郎                              │
│                                              │
│  [AP] [爆发法师]    │  S级 · 52.86%         │
│                      │  ↑ +2.1% (版本上升)   │
│                      │  KDA 3.2 · 均伤 28K   │
├─────────────────────────────────────────────┤
│  远程消耗型法师，技能全AOE。大乱斗狭窄地形... │
└─────────────────────────────────────────────┘
```

### 5.2 符文推荐增强

现有符文卡片增加一行「真实胜率」（来自augment_stats）：

```
┌─────────────────────────────────────┐
│ 🔮 珠光护手  [彩色] [推荐]  95分    │
│ 技能可以暴击，造成145%伤害...        │
│ 📊 胜率 58.3% · 选取率 12.5%       │ ← 新增
│ [选择] [排除]                        │
└─────────────────────────────────────┘
```

### 5.3 装备推荐（全新Tab）

```
┌─────────────────────────────────────┐
│ 🛡️ 装备推荐                         │
│                                     │
│ 📦 出门装：                          │
│  [多兰之戒] [生命药水]               │
│                                     │
│ ⚔️ 核心装备：                        │
│  ① [卢登的伙伴]  ② [影焰]           │
│  ③ [灭世者的死亡之帽] ④ [虚空之杖]  │
│                                     │
│ 💡 符文联动提示：                    │
│  卢登+珠光护手 = 技能暴击+溅射      │ ← 最具价值的功能
└─────────────────────────────────────┘
```

### 5.4 装备图标获取

CDragon 提供所有装备图标：
```
https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/items/{id}.png
```

hexdata 的装备数据只存了 `id`（如 3084 = 心之钢），名称和图标从 CDragon 取。

---

## 6. 技术实施方案

### 6.1 实施阶段

| 阶段 | 内容 | 工时 |
|------|------|------|
| **阶段1** | hexdata 数据获取模块 + 数据库表 | 0.5天 |
| **阶段2** | AI智能体新增装备同步卡片 | 0.5天 |
| **阶段3** | 前台装备推荐 Tab | 1天 |
| **阶段4** | 符文卡片增强（真实胜率） | 0.5天 |
| **阶段5** | 装备-符文联动标记 | 1天 |
| **总计** | | **3.5天** |

### 6.2 数据获取模块

```typescript
// src/lib/agent/hexdata.ts
export async function fetchHexData() {
  const [augments, heroes, items, funData] = await Promise.all([
    fetch("https://hexdata.com.cn/data/augments.json"),
    fetch("https://hexdata.com.cn/data/heroes.json"),
    fetch("https://hexdata.com.cn/data/hero_formula_items.json"),
    fetch("https://hexdata.com.cn/data/fun_data.json"),
  ]);
  // 解析并结构化...
}
```

### 6.3 现有功能影响

| 现有功能 | 影响 | 处理方式 |
|----------|------|----------|
| 符文池同步 | 无 | 独立运行 |
| 英雄胜率同步 | 增强 | 融入hexdata统计 |
| 英雄-符文匹配 | 增强 | topAugments作为第三源 |
| 符文管理 | 无 | 不变 |
| 推荐配置 | 增强 | 可引用装备数据 |
| 前台推荐 | 新增装备Tab | 符文Tab不变 |

---

## 7. 风险评估

| 风险 | 概率 | 影响 | 缓解措施 |
|------|------|------|----------|
| hexdata网站停更 | 低 | 中 | 三源互为备份 |
| 数据格式变化 | 中 | 低 | 版本检测+兼容处理 |
| 装备图片获取失败 | 低 | 低 | CDragon作为备选 |
| 装备ID与游戏不一致 | 低 | 中 | 用CDragon items.json做映射 |
| 前台信息过载 | 中 | 中 | Tab切换 + 快速模式 |

---

## 结论

**hexdata.com.cn 接入价值极高**。它提供了海克斯助手目前最缺失的能力：**装备推荐**和**真实胜率数据**。接入成本低（约3.5天），不影响现有功能，且增强了三个核心模块（英雄卡片、符文推荐、装备推荐）。
