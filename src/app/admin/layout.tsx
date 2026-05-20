import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const adminKey = process.env.ADMIN_SECRET_KEY;
  if (!adminKey) return <>{children}</>;

  const cookieStore = cookies();
  const session = cookieStore.get("admin_session")?.value;
  if (session !== adminKey) redirect("/admin-login");

  return <>{children}</>;
}
