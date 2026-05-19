"use client";

import { useState } from "react";

interface ExclusionBarProps {
  excludedCount: number;
  remainingCount: number;
  onReset: () => void;
}

export default function ExclusionBar({
  excludedCount,
  remainingCount,
  onReset,
}: ExclusionBarProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <div className="sticky bottom-0 left-0 right-0 glass-card p-3 mb-0 mt-3 z-10">
        <div className="flex items-center justify-between text-[12px]">
          <button
            onClick={() => setShowConfirm(true)}
            className="text-sage-500 font-medium hover:text-sage-700 transition-colors text-left"
          >
            已屏蔽本局符文: <span className="text-rose-500 font-bold">{excludedCount}</span> 个
          </button>
          <span className="text-sage-500 font-medium">
            剩余可优选符文: <span className="text-gold-600 font-bold">{remainingCount}</span> 个
          </span>
        </div>
      </div>

      {/* Reset confirmation modal */}
      {showConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30 backdrop-blur-sm"
          onClick={() => setShowConfirm(false)}
        >
          <div
            className="bg-white rounded-t-2xl sm:rounded-2xl p-5 w-full max-w-sm shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-[14px] text-sage-700 font-semibold mb-2">
              重置本局屏蔽记录
            </p>
            <p className="text-[13px] text-sage-500 mb-4">
              已屏蔽的符文不会在推荐列表中出现。如需释放所有已屏蔽符文，请点击「重置本局」。
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 text-[13px] px-4 py-2 rounded-xl bg-sage-100 text-sage-600 font-medium"
              >
                取消
              </button>
              <button
                onClick={() => { onReset(); setShowConfirm(false); }}
                className="flex-1 text-[13px] px-4 py-2 rounded-xl bg-rose-500 text-white font-medium"
              >
                重置本局
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
