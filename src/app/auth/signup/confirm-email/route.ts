import { NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/server/client";
import { sendFormattedMessage } from "@/lib/utils/discord";

import { createHash } from "crypto";

async function deleteAuthUserAndLog(userId: string, requestUrl: URL) {
  const supabase = createAdminClient();

  const { error: deleteError } = await supabase.auth.admin.deleteUser(userId);

  await sendFormattedMessage(
    "auth",
    "error",
    "Auth User Deleted After Database Failure",
    `Deleted auth user ${userId}`,
    [
      ...(deleteError
        ? [{ name: "Deletion Error", value: JSON.stringify(deleteError) }]
        : []),
    ]
  );

  return NextResponse.redirect(
    new URL("/auth/signup/confirmation-error", requestUrl.origin)
  );
}

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
  const trackingId = createHash("sha256")
    .update(email.toLowerCase())
    .digest("hex");

  const { data: existingUser, error: selectError } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (selectError) {
    await sendFormattedMessage(
      "auth",
      "error",
      "User Query Failed",
      `Failed to query for existing user`,
      [
        { name: "User ID", value: userId },
        { name: "Error", value: JSON.stringify(selectError, null, 2) },
      ]
    );

    return deleteAuthUserAndLog(userId, requestUrl);
  }

  if (existingUser) {
    const { error: updateError } = await supabase
      .from("users")
      .update({ tracking_id: trackingId })
      .eq("user_id", userId);

    if (updateError) {
      await sendFormattedMessage(
        "auth",
        "error",
        "User Update Failed",
        `Failed to update existing user`,
        [
          { name: "User ID", value: userId },
          { name: "Error", value: JSON.stringify(updateError, null, 2) },
        ]
      );

      return deleteAuthUserAndLog(userId, requestUrl);
    }
  } else {
    const { error: insertError } = await supabase
      .from("users")
      .insert({ user_id: userId, tracking_id: trackingId });

    if (insertError) {
      await sendFormattedMessage(
        "auth",
        "error",
        "User Insert Failed",
        `Failed to insert new user`,
        [
          { name: "User ID", value: userId },
          { name: "Error", value: JSON.stringify(insertError, null, 2) },
        ]
      );

      return deleteAuthUserAndLog(userId, requestUrl);
    }
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
