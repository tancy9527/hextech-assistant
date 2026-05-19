import type { ExcludedRunes, SelectedRuneEntry, GamePhase } from "@/types";

const STORAGE_KEY = "hextech_excluded_runes";

export function loadExcludedRunes(): ExcludedRunes {
  if (typeof window === "undefined") return { selected: [], seen: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { selected: [], seen: [] };
    const parsed = JSON.parse(raw);
    return {
      selected: parsed.selected || [],
      seen: parsed.seen || [],
    };
  } catch {
    return { selected: [], seen: [] };
  }
}

export function saveExcludedRunes(excluded: ExcludedRunes) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(excluded));
}

export function clearExcludedRunes() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export function markRuneSelected(runeId: string, phase: GamePhase) {
  const excluded = loadExcludedRunes();
  if (!excluded.selected.find((s) => s.runeId === runeId)) {
    excluded.selected.push({ runeId, phase });
  }
  excluded.seen = excluded.seen.filter((id) => id !== runeId);
  saveExcludedRunes(excluded);
}

export function markRuneSeen(runeId: string) {
  const excluded = loadExcludedRunes();
  const isSelected = excluded.selected.some((s) => s.runeId === runeId);
  if (!excluded.seen.includes(runeId) && !isSelected) {
    excluded.seen.push(runeId);
  }
  saveExcludedRunes(excluded);
}

export function unmarkRune(runeId: string) {
  const excluded = loadExcludedRunes();
  excluded.selected = excluded.selected.filter((s) => s.runeId !== runeId);
  excluded.seen = excluded.seen.filter((id) => id !== runeId);
  saveExcludedRunes(excluded);
}

export function getSelectedRuneIds(): string[] {
  const excluded = loadExcludedRunes();
  return excluded.selected.map((s) => s.runeId);
}

export function getSeenRuneIds(): string[] {
  const excluded = loadExcludedRunes();
  return excluded.seen;
}

export function getAllExcludedIds(): string[] {
  const excluded = loadExcludedRunes();
  return [
    ...excluded.selected.map((s) => s.runeId),
    ...excluded.seen,
  ];
}

export function getExcludedCount(): number {
  const excluded = loadExcludedRunes();
  return excluded.selected.length + excluded.seen.length;
}

export function getSelectedEntries(): SelectedRuneEntry[] {
  const excluded = loadExcludedRunes();
  return excluded.selected;
}
