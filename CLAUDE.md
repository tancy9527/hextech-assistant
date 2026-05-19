# 海克斯助手 (Hextech ARAM Assistant)

## 质量规则

- 每次代码修改后，验证 `npx tsc --noEmit` 通过零错误
- 所有面向用户的文本必须使用简体中文
- 绝不从主应用调用任何外部接口（主流程中不调用 Riot API、DeepSeek API）
- DeepSeek API 仅用于 `/admin` 页面进行 OCR 数据录入 — 绝不在游戏循环中使用
- 英雄输入始终为手动文本输入，绝不从游戏客户端自动检测
- 所有推荐数据来自 Supabase 预置表
- 通知仅使用浏览器 Notification API
- 移动端优先：在 375-414px 宽度下测试
- 不写注释，除非 WHY 不明显
- 修改代码过程中使用中文，包括注释、解释、说明等
- 每次修改代码后，对修改逻辑进行检查，保证没有问题
- 修改后如有增量 SQL，告知应如何在 Supabase 操作
- 如果是批量导入或从数据接口获得数据，必须保证数据来源的准确性
- 每次修改后，告知现在产品逻辑是什么样，然后自我检测界面点击跳转按钮是否有问题
- 每次修改后，告知现在应该怎么做，重新运行项目

## 项目结构

```
src/
  app/
    page.tsx          — 主 SPA（客户端组件，所有状态编排）
    layout.tsx        — 根布局，含 PWA 元数据 + Service Worker 注册
    globals.css       — 莫兰迪色系 + 玻璃拟态工具类
    manifest.ts       — PWA 清单路由
    admin/page.tsx    — 管理页：图片上传 + DeepSeek OCR
    api/              — 所有 API 路由（Next.js Route Handlers）
    components/       — UI 组件（HeroSelector、HeroInfo、RuneCard 等）
  lib/
    supabase/         — 浏览器端 + 服务端 Supabase 客户端
    recommendations.ts — 核心评分算法（标签 + 协同 + 品质）
    notifications.ts  — Notification API 封装
    storage.ts        — Supabase 存储辅助（符文图标）
    utils.ts          — cn()、formatTime()、localStorage 辅助函数
  types/index.ts     — 所有 TypeScript 接口 + 常量
supabase/
  schema.sql         — 8 张表（heroes、runes、rune_synergies、hero_playstyles、hero_rune_recommendations、fetters、rune_fetters、hero_build_cards）
  seed.sql           — 原始种子数据
public/
  sw.js              — Service Worker（缓存 + notificationclick）
  manifest.json      — 通过 manifest.ts 路由自动生成
```

## 关键行为

- **推荐流程**：选择英雄 → 获取 `/api/recommendations?heroId=&playstyleId=&tags=&selected=` → 展示卡片
- **符文选择**：点击"选择" → 加入 localStorage `hextech_selected_runes` → 从排行中排除 → 为剩余符文增加协同加成
- **已选符文**：持久化到 localStorage，以标签形式展示并带 × 移除按钮，刷新页面后保留
- **品质筛选**："彩色"/"金色"/"银色"/"全部"按钮在客户端筛选已展示的卡片
- **管理 OCR**：上传图片 → `/api/vision/parse`（DeepSeek）→ 审核 → `/api/runes/batch-insert`（Supabase，含去重）
- **推荐逻辑**：API 只返回该英雄有 DB 推荐配置的符文，无推荐的符文由前端排在末尾，不显示推荐标签
- **流派筛选**：选择流派后只显示该流派下的推荐符文，不混入其他流派的符文
