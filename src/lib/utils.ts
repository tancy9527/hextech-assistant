import { clsx, type ClassValue } from "clsx";
import { type GamePhase, PHASE_THRESHOLDS, PHASE_ORDER } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function getPhaseFromElapsed(
  elapsedSec: number
): { phase: GamePhase; label: string } | null {
  for (let i = PHASE_ORDER.length - 1; i >= 0; i--) {
    const phase = PHASE_ORDER[i];
    if (elapsedSec >= PHASE_THRESHOLDS[phase].timeSec) {
      return { phase, label: PHASE_THRESHOLDS[phase].label };
    }
  }
  return null;
}

const GAME_STORAGE_KEY = "hextech_game";

export function saveGameToStorage(data: {
  gameStartTime: number;
  heroId: string;
  heroName: string;
  tags: string[];
}) {
  if (typeof window === "undefined") return;
  localStorage.setItem(GAME_STORAGE_KEY, JSON.stringify(data));
}

export function loadGameFromStorage(): {
  gameStartTime: number;
  heroId: string;
  heroName: string;
  tags: string[];
} | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(GAME_STORAGE_KEY);
  if (!raw) return null;
  try {
    const data = JSON.parse(raw);
    const elapsed = Math.floor((Date.now() - data.gameStartTime) / 1000);
    if (elapsed > 1800) {
      localStorage.removeItem(GAME_STORAGE_KEY);
      return null;
    }
    return data;
  } catch {
    localStorage.removeItem(GAME_STORAGE_KEY);
    return null;
  }
}

export function clearGameFromStorage() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(GAME_STORAGE_KEY);
}
