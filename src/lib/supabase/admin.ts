import { createClient } from "@supabase/supabase-js";

/**
 * Admin Supabase client.
 * Prefers service_role key (bypasses RLS), but falls back to anon key
 * so the admin page works without extra configuration.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (serviceKey) {
    return createClient(url, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }

  // Fallback to anon key — RLS policies allow admin operations
  return createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
