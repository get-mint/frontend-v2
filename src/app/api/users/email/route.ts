import { NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/server/server";
import { checkIsAdminFromJwt } from "@/lib/supabase/server/auth";
import {
  handleApiError,
  AuthenticationError,
  NotFoundError,
} from "@/lib/utils/errors";

export async function GET(request: Request) {
  try {
    const supabase = createAdminClient();
    const token = request.headers.get("Authorization")?.split(" ")[1];
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      throw new NotFoundError("User ID is required");
    }

    if (!token || !(await checkIsAdminFromJwt(token))) {
      throw new AuthenticationError("Invalid or missing authentication token");
    }

    const { data: user, error } = await supabase.auth.admin.getUserById(userId);

    if (error || !user?.user?.email) {
      throw new NotFoundError("User or email not found");
    }

    return NextResponse.json({ email: user.user.email });
  } catch (error) {
    const { error: errorMessage, code, status } = handleApiError(error);
    return NextResponse.json({ error: errorMessage, code }, { status });
  }
}
