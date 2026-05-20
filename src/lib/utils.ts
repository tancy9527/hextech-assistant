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

const MAX_UPLOAD_BYTES = 500 * 1024; // 500KB

export function compressImage(file: File, maxBytes = MAX_UPLOAD_BYTES): Promise<File> {
  return new Promise((resolve, reject) => {
    if (file.size <= maxBytes) return resolve(file);
    if (!file.type.startsWith("image/")) return resolve(file);

    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement("canvas");
      let { width, height } = img;

      // 限制最大尺寸 1200px，减少内存占用
      const maxDim = 1200;
      if (width > maxDim || height > maxDim) {
        const ratio = Math.min(maxDim / width, maxDim / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve(file);
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) return resolve(file);
          const compressed = new File([blob], file.name.replace(/\.[^.]+$/, ".jpg"), { type: "image/jpeg" });
          resolve(compressed.size < file.size ? compressed : file);
        },
        "image/jpeg",
        0.75
      );
    };
    img.onerror = () => resolve(file);
    img.src = url;
  });
}
