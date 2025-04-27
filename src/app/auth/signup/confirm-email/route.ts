import { NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/server/client";

import { createHash } from "crypto";

type ErrorStage =
  | "token_validation"
  | "otp_verification"
  | "user_creation"
  | "user_deletion";

async function handleError(
  userId: string | null,
  requestUrl: URL,
  stage: ErrorStage,
  error?: any
) {
  console.error(`Account creation failed at stage: ${stage}`, {
    userId,
    error: error?.message || "Unknown error",
    code: error?.code || "No error code",
  });

  if (userId) {
    const supabase = createAdminClient();
    const { error: deleteError } = await supabase.auth.admin.deleteUser(userId);

    if (deleteError) {
      console.error("Failed to delete user after error:", {
        userId,
        error: deleteError.message,
        code: deleteError.code,
      });
    }
  }

  return NextResponse.redirect(
    new URL(`/auth/signup/confirmation-error?stage=${stage}`, requestUrl.origin)
  );
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const token_hash = requestUrl.searchParams.get("token_hash");
  const type = requestUrl.searchParams.get("type") || "email";

  // Validate token_hash exists
  if (!token_hash) {
    return handleError(null, requestUrl, "token_validation", {
      message: "Missing token_hash parameter",
    });
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
      requestUrl,
      "otp_verification",
      error || { message: "Missing user data after OTP verification" }
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
    return handleError(userId, requestUrl, "user_creation", dbError);
  }

  return NextResponse.redirect(new URL("/auth/login", requestUrl.origin));
}
