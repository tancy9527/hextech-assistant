"use client";

import { useState, useEffect } from "react";
import { requestNotificationPermission } from "@/lib/notifications";

export default function NotificationPrompt() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("Notification" in window)) return;
    if (Notification.permission === "default") {
      const dismissed = localStorage.getItem("hextech_notify_dismissed");
      if (!dismissed) setShow(true);
    }
  }, []);

  if (!show) return null;

  const handleEnable = async () => {
    const result = await requestNotificationPermission();
    if (result === "granted") {
      setShow(false);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem("hextech_notify_dismissed", "1");
    setShow(false);
  };

  return (
    <div className="glass-card p-4 mb-4 border-gold-300">
      <div className="flex items-center gap-3">
        <span className="text-2xl">🔔</span>
        <div className="flex-1">
          <p className="text-[14px] font-semibold text-sage-700">
            开启通知提醒
          </p>
          <p className="text-[12px] text-sage-500">
            在关键等级（3/7/11/15级）时提醒你查看符文推荐
          </p>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <button
          onClick={handleEnable}
          className="flex-1 btn-primary text-[13px] py-2"
        >
          允许通知
        </button>
        <button
          onClick={handleDismiss}
          className="flex-1 text-[13px] py-2 rounded-xl bg-white/40 text-sage-500 font-medium"
        >
          以后再说
        </button>
      </div>
    </div>
  );
}
