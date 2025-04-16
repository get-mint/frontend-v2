import { NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/server/client";
import { sendFormattedMessage } from "@/lib/utils/discord";

import { createHash } from "crypto";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const token_hash = requestUrl.searchParams.get("token_hash");
  const type = requestUrl.searchParams.get("type") || "email";

  if (!token_hash) {
    await sendFormattedMessage(
      "auth",
      "warning",
      "Email Confirmation Failed",
      "Missing token_hash parameter in URL",
      [{ name: "URL", value: request.url }]
    );

    return NextResponse.redirect(
      new URL("/auth/signup/confirmation-error", requestUrl.origin)
    );
  }

  const supabase = createAdminClient();

  const { data, error } = await supabase.auth.verifyOtp({
    token_hash,
    type: type as "email",
  });

  if (error || !data?.user?.id || !data.user.email) {
    await sendFormattedMessage(
      "auth",
      "error",
      "Email Verification Failed",
      error?.message || "Missing user data after verification",
      [
        { name: "Error", value: JSON.stringify(error, null, 2) },
        { name: "Has User Data", value: Boolean(data?.user).toString() },
      ]
    );

    return NextResponse.redirect(
      new URL("/auth/signup/confirmation-error", requestUrl.origin)
    );
  }

  const userId = data.user.id;
  const email = data.user.email;
  const tracking_id = createHash("sha256")
    .update(email.toLowerCase())
    .digest("hex");

  const { data: userData, error: userError } = await supabase
    .from("users")
    .upsert({ user_id: userId, tracking_id }, { onConflict: "tracking_id" })
    .select();

  if (userError) {
    await sendFormattedMessage(
      "auth",
      "error",
      "User Database Update Failed",
      `Failed to save user data to the users table for ${email}`,
      [
        { name: "User ID", value: userId },
        { name: "Tracking ID", value: tracking_id },
        { name: "Error", value: JSON.stringify(userError, null, 2) },
      ]
    );

    const { error: deleteError } = await supabase.auth.admin.deleteUser(userId);

    await sendFormattedMessage(
      "auth",
      deleteError ? "error" : "warning",
      "Auth User Deleted After Database Failure",
      `Deleted auth user ${userId} because users table entry failed`,
      [
        { name: "User ID", value: userId },
        { name: "Email", value: email },
        ...(deleteError
          ? [
              {
                name: "Deletion Error",
                value: JSON.stringify(deleteError, null, 2),
              },
            ]
          : []),
      ]
    );

    return NextResponse.redirect(
      new URL("/auth/signup/confirmation-error", requestUrl.origin)
    );
  } else {
    await sendFormattedMessage(
      "auth",
      "success",
      "Email Verification Successful",
      `User ${email} has verified their email and data saved to users table`,
      [
        { name: "User ID", value: userId },
        { name: "Tracking ID", value: tracking_id },
        {
          name: "Record Created/Updated",
          value: Boolean(userData && userData.length > 0).toString(),
        },
      ]
    );
  }

  return NextResponse.redirect(new URL("/auth/login", requestUrl.origin));
}
