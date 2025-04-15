import { NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/server/client";
import { checkIsAdminFromJwt } from "@/lib/supabase/server/auth";
import {
  handleApiError,
  AuthenticationError,
  NotFoundError,
} from "@/lib/utils/errors";

export async function POST(request: Request) {
  try {
    const supabase = createAdminClient();
    const token = request.headers.get("Authorization")?.split(" ")[1];
    const { userId } = await request.json();

    if (!userId) {
      throw new NotFoundError("User ID is required");
    }

    if (!token || !(await checkIsAdminFromJwt(token))) {
      throw new AuthenticationError("Invalid or missing authentication token");
    }

    const { data: user, error: getUserError } =
      await supabase.auth.admin.getUserById(userId);

    if (getUserError || !user?.user) {
      throw new NotFoundError("User not found");
    }

    const { data: adminRole, error: roleError } = await supabase
      .from("roles")
      .select("id")
      .eq("name", "admin")
      .single();

    if (roleError || !adminRole) {
      throw new Error("Admin role not found");
    }

    const { data: currentRole } = await supabase
      .from("user_roles")
      .select("roles(name)")
      .eq("user_id", userId)
      .eq("roles.name", "admin")
      .maybeSingle();

    const currentIsAdmin = currentRole !== null;

    if (!currentIsAdmin) {
      const { error: insertError } = await supabase
        .from("user_roles")
        .insert([{ user_id: userId, role_id: adminRole.id }]);

      if (insertError) {
        throw new Error("Failed to add admin role");
      }
    } else {
      const { error: deleteError } = await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", userId)
        .eq("role_id", adminRole.id);

      if (deleteError) {
        throw new Error("Failed to remove admin role");
      }
    }

    return NextResponse.json({
      success: true,
      is_admin: !currentIsAdmin,
    });
  } catch (error) {
    const { error: errorMessage, code, status } = handleApiError(error);
    return NextResponse.json({ error: errorMessage, code }, { status });
  }
}
