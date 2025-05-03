import { SupabaseClient } from "@supabase/supabase-js";

import { createClientFromJwt } from "./client";

export async function isUserAdmin(supabase: SupabaseClient): Promise<boolean> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) return false;

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("id")
    .eq("auth_user_id", user.id)
    .maybeSingle();

  if (userError) return false;

  const { data: userRole, error: roleError } = await supabase
    .from("user_roles")
    .select("roles(name)")
    .eq("user_id", userData?.id)
    .eq("roles.name", "admin")
    .maybeSingle();

  return userRole !== null;
}

export async function isUserAuthenticated(
  supabase: SupabaseClient
): Promise<boolean> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return !!session;
}

export async function checkIsAdminFromJwt(jwt: string): Promise<boolean> {
  const supabase = await createClientFromJwt(jwt);

  if (!supabase) return false;

  return await isUserAdmin(supabase);
}
