import { NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/server/client";
import { sendFormattedMessage } from "@/lib/utils/discord";

import { createHash } from "crypto";

// Helper to handle errors and redirects
async function handleError(
  userId: string | null,
  requestUrl: URL,
  channel: "auth" | "site",
  severity: "info" | "success" | "warning" | "error" | "update",
  title: string,
  message: string,
  fields: { name: string; value: string }[] = []
) {
  await sendFormattedMessage(channel, severity, title, message, fields);

  // Delete auth user if one was created
  if (userId) {
    const supabase = createAdminClient();
    const { error: deleteError } = await supabase.auth.admin.deleteUser(userId);

    if (deleteError) {
      await sendFormattedMessage(
        "auth",
        "error",
        "Auth User Deletion Failed",
        `Failed to delete auth user ${userId}`,
        [{ name: "Deletion Error", value: JSON.stringify(deleteError) }]
      );
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
      requestUrl,
      "auth",
      "warning",
      "Email Confirmation Failed",
      "Missing token_hash parameter in URL",
      [{ name: "URL", value: request.url }]
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
      requestUrl,
      "auth",
      "error",
      "Email Verification Failed",
      error?.message || "Missing user data after verification",
      [
        { name: "Error", value: JSON.stringify(error, null, 2) },
        { name: "Has User Data", value: Boolean(data?.user).toString() },
      ]
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
      requestUrl,
      "auth",
      "error",
      "User Upsert Failed",
      "Failed to save user data",
      [
        { name: "User ID", value: userId },
        { name: "Error", value: JSON.stringify(dbError, null, 2) },
      ]
    );
  }

  await sendFormattedMessage(
    "auth",
    "success",
    "Email Verification Successful",
    `User ${email} verified and saved`,
    [
      { name: "User ID", value: userId },
      { name: "Tracking ID", value: trackingId },
    ]
  );

  return NextResponse.redirect(new URL("/auth/login", requestUrl.origin));
}
