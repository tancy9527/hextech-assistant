"use client";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="max-w-md mx-auto px-4 py-16 text-center safe-bottom">
      <p className="text-[48px] mb-4">😵</p>
      <h1 className="text-[18px] font-bold text-sage-700 mb-2">
        出了点问题
      </h1>
      <p className="text-[13px] text-sage-500 mb-6">
        页面加载时发生了错误，请重试
      </p>
      <button onClick={reset} className="btn-primary text-[14px] px-6 py-3">
        重新加载
      </button>
    </main>
  );
}
