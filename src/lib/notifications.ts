import { type GamePhase, PHASE_THRESHOLDS } from "@/types";

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return "denied";
  }
  if (Notification.permission === "granted") return "granted";
  return Notification.requestPermission();
}

export function sendPhaseNotification(
  phase: GamePhase,
  heroName: string
): void {
  if (
    typeof window === "undefined" ||
    !("Notification" in window) ||
    Notification.permission !== "granted"
  ) {
    return;
  }

  const config = PHASE_THRESHOLDS[phase];
  new Notification(`${config.label}`, {
    body: `${heroName} — 查看推荐的海克斯符文`,
    icon: "/icon-192.png",
    tag: `phase-${phase}`,
    requireInteraction: true,
  } as NotificationOptions);
}

export function notifyPermissionDenied(): boolean {
  if (typeof window === "undefined") return true;
  if (!("Notification" in window)) return true;
  return Notification.permission === "denied";
}

export function notifyPermissionGranted(): boolean {
  if (typeof window === "undefined") return false;
  if (!("Notification" in window)) return false;
  return Notification.permission === "granted";
}
