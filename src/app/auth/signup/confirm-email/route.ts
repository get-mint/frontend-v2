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
    fullError: error ? JSON.stringify(error, null, 2) : "No error object",
  });

  if (userId) {
    const supabase = createAdminClient();
    const { error: deleteError } = await supabase.auth.admin.deleteUser(userId);

    if (deleteError) {
      console.error("Failed to delete user after error:", {
        userId,
        error: deleteError.message,
        code: deleteError.code,
        fullError: JSON.stringify(deleteError, null, 2),
      });
    }
  }

  // Create error URL with all available error information
  const errorUrl = new URL(
    "/auth/signup/confirmation-error",
    requestUrl.origin
  );
  errorUrl.searchParams.set("stage", stage);
  errorUrl.searchParams.set("error", error?.message || "Unknown error");
  errorUrl.searchParams.set("code", error?.code || "No error code");
  errorUrl.searchParams.set(
    "details",
    error ? JSON.stringify(error, null, 2) : "No error details"
  );

  return NextResponse.redirect(errorUrl);
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

  // First check if user exists
  const { data: existingUser, error: checkError } = await supabase
    .from("users")
    .select("auth_user_id")
    .eq("auth_user_id", userId)
    .single();

  if (checkError && checkError.code !== "PGRST116") {
    // PGRST116 is "no rows returned"
    return handleError(userId, requestUrl, "user_creation", {
      message: "Failed to check for existing user",
      code: checkError.code,
      details: checkError.details,
      hint: checkError.hint,
      fullError: checkError,
    });
  }

  let dbError;
  if (existingUser) {
    // Update existing user
    const { error: updateError } = await supabase
      .from("users")
      .update({ tracking_id: trackingId })
      .eq("auth_user_id", userId);

    dbError = updateError;
  } else {
    // Insert new user
    const { error: insertError } = await supabase.from("users").insert({
      auth_user_id: userId,
      tracking_id: trackingId,
    });

    dbError = insertError;
  }

  if (dbError) {
    return handleError(userId, requestUrl, "user_creation", {
      message: dbError.message,
      code: dbError.code,
      details: dbError.details,
      hint: dbError.hint,
      fullError: dbError,
    });
  }

  return NextResponse.redirect(new URL("/auth/login", requestUrl.origin));
}
