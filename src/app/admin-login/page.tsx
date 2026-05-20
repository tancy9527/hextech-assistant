"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!key.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: key.trim() }),
      });
      if (res.ok) {
        sessionStorage.setItem("admin_key", key.trim());
        router.push("/admin");
      } else {
        const d = await res.json();
        setError(d.error || "密钥不正确");
      }
    } catch {
      setError("无法连接服务器");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-cream-50 px-4">
      <div className="glass-card p-8 max-w-sm w-full text-center">
        <h1 className="text-[20px] font-bold text-sage-700 mb-2">后台管理</h1>
        <p className="text-[13px] text-sage-500 mb-5">请输入管理员密钥以继续</p>
        {error && (
          <p className="text-[12px] text-rose-500 mb-3 bg-rose-50 py-2 px-3 rounded-lg">
            {error}
          </p>
        )}
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          placeholder="管理员密钥"
          autoFocus
          className="w-full px-4 py-3 rounded-xl border border-sage-200 text-[14px] mb-4 bg-white/80 focus:outline-none focus:border-gold-400"
        />
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gold-300 text-gold-700 text-[14px] font-medium hover:bg-gold-400 transition-colors active:scale-95 disabled:opacity-50"
        >
          {loading ? "验证中..." : "进入后台"}
        </button>
        <a href="/" className="block mt-4 text-[12px] text-sage-400 hover:text-sage-600">
          返回首页
        </a>
      </div>
    </main>
  );
}
