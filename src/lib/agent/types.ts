// Agent 智能体系统 — 类型定义

export interface RuneOverride {
  nameEn: string;
  name: string;
  tier?: string;
  quality?: string;
  effect_type?: string;
  pros?: string;
  cons?: string;
  scenarios?: string;
  special_label?: string;
}

export interface RemoteAugment {
  id: string;
  rarity: number;
  tags: number[];
}

export interface SyncDiff {
  newRunes: string[];
  missingOverrides: string[];
  removedOverrides: string[];
  tierChanges: { nameEn: string; from: string; to: string }[];
}

export interface SyncResult {
  newRunes: number;
  updatedRunes: number;
  deactivatedRunes: number;
  reactivatedRunes: number;
  details: SyncDetail[];
}

export interface SyncDetail {
  nameEn: string;
  name: string;
  action: "created" | "updated" | "deactivated" | "reactivated" | "skipped";
  changes?: Record<string, any>;
}

// 推荐生成
export interface GenerateRecsInput {
  hero: {
    id: string;
    name: string;
    title: string;
    role: string;
    attack_type: string;
    description: string;
  };
  playstyles: { index: number; id: string; name: string; description: string }[];
  runes: { index: number; id: string; name: string; tier: string; description: string; effect_type: string; pros?: string; cons?: string }[];
}

export interface GeneratedRecEntry {
  rune_index: number;
  playstyle_index: number;
  phase: "3" | "7" | "11" | "15";
  priority_score: number;
  reason: string;
  build_synergy: string;
  adjustment_tags: string[];
}

export interface GenerateRecsResult {
  heroId: string;
  heroName: string;
  entriesGenerated: number;
  errors: string[];
}

// 作业追踪
export interface JobProgress {
  jobId: string;
  type: "sync-runes" | "generate-recs";
  status: "pending" | "running" | "completed" | "failed";
  total: number;
  completed: number;
  failed: number;
  entriesGenerated: number;
  results: GenerateRecsResult[];
  errorLog: string[];
  startedAt?: string;
  completedAt?: string;
}

// 更新日志
export interface UpdateLog {
  id?: string;
  log_type: "sync-runes" | "generate-recs";
  title: string;
  summary: string;
  details: any;
  stats: Record<string, number>;
  run_mode: "manual" | "auto";
  status: "pending" | "running" | "completed" | "failed" | "rolled_back";
  error_message?: string;
  started_at?: string;
  completed_at?: string;
  created_at?: string;
}
