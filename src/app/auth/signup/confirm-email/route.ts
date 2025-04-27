import { NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/server/client";

import { createHash } from "crypto";

async function handleError(
  userId: string | null,
  requestUrl: URL,
) {
  if (userId) {
    const supabase = createAdminClient();
    const { error: deleteError } = await supabase.auth.admin.deleteUser(userId);

    if (deleteError) {
      console.error(deleteError);
    }
  }

  return NextResponse.redirect(
    new URL("/auth/signup/confirmation-error", requestUrl.origin)
  );
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const token_hash = requestUrl.searchParams.get("token_hash");
  const type = requestUrl.searchParams.get("type") || "email";

  // Validate token_hash exists
  if (!token_hash) {
    return handleError(
      null,
      requestUrl
    );
  }

  const supabase = createAdminClient();

  // Verify OTP
  const { data, error } = await supabase.auth.verifyOtp({
    token_hash,
    type: type as "email",
  });

  if (error || !data?.user?.id || !data.user.email) {
    return handleError(
      null,
      requestUrl
    );
  }

  const userId = data.user.id;  
  const email = data.user.email;
  const trackingId = createHash("sha256")
    .update(email.toLowerCase())
    .digest("hex");

  const { error: dbError } = await supabase.from("users").upsert(
    {
      auth_user_id: userId,
      tracking_id: trackingId,
    },
    {
      onConflict: "auth_user_id",
    }
  );

  if (dbError) {
    return handleError(
      userId,
      requestUrl
    );
  }

  return NextResponse.redirect(new URL("/auth/login", requestUrl.origin));
}
