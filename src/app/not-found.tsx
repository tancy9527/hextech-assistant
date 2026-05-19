export default function NotFoundPage() {
  return (
    <main className="max-w-md mx-auto px-4 py-16 text-center safe-bottom">
      <p className="text-[48px] mb-4">🔍</p>
      <h1 className="text-[18px] font-bold text-sage-700 mb-2">
        页面未找到
      </h1>
      <p className="text-[13px] text-sage-500 mb-6">
        你访问的页面不存在
      </p>
      <a href="/" className="btn-primary inline-block text-[14px] px-6 py-3">
        返回首页
      </a>
    </main>
  );
}
