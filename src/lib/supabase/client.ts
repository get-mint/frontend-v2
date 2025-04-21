import { createBrowserClient } from "@supabase/ssr";

import { SupabaseClient } from "@supabase/supabase-js";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function getJwt(client: SupabaseClient) {
  const {
    data: { session },
  } = await client.auth.getSession();
  return session?.access_token;
}
