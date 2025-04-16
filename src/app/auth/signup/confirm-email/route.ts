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

  // Try insert first
  const { error: insertError } = await supabase
    .from("users")
    .insert({ user_id: userId, tracking_id });

  if (insertError?.code === "23505" /* duplicate */) {
    // Conflict: update instead
    const { error: updateError } = await supabase
      .from("users")
      .update({ user_id: userId })
      .eq("tracking_id", tracking_id);

    if (updateError) {
      await sendFormattedMessage(
        "auth",
        "error",
        "User Update Failed After Duplicate",
        `Update failed for existing tracking_id`,
        [
          { name: "User ID", value: userId },
          { name: "Tracking ID", value: tracking_id },
          { name: "Error", value: JSON.stringify(updateError, null, 2) },
        ]
      );
    }
  } else if (insertError) {
    // Not a conflict, real error
    await sendFormattedMessage(
      "auth",
      "error",
      "User Insert Failed",
      `Insert failed for user ${email}`,
      [
        { name: "User ID", value: userId },
        { name: "Tracking ID", value: tracking_id },
        { name: "Error", value: JSON.stringify(insertError, null, 2) },
      ]
    );

    const { error: deleteError } = await supabase.auth.admin.deleteUser(userId);

    await sendFormattedMessage(
      "auth",
      deleteError ? "error" : "warning",
      "Auth User Deleted After DB Failure",
      `Deleted auth user ${userId}`,
      [
        { name: "Email", value: email },
        ...(deleteError
          ? [{ name: "Deletion Error", value: JSON.stringify(deleteError) }]
          : []),
      ]
    );

    return NextResponse.redirect(
      new URL("/auth/signup/confirmation-error", requestUrl.origin)
    );
  }

  await sendFormattedMessage(
    "auth",
    "success",
    "Email Verification Successful",
    `User ${email} verified and saved`,
    [
      { name: "User ID", value: userId },
      { name: "Tracking ID", value: tracking_id },
    ]
  );

  return NextResponse.redirect(new URL("/auth/login", requestUrl.origin));
}
