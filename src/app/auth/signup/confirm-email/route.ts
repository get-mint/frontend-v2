import { NextResponse } from "next/server";

import { createHash } from "crypto";

import { createAdminClient } from "@/lib/supabase/server/client";
import { AuthenticationError, handleApiError } from "@/lib/utils/errors";

/**
 * This route is used to confirm the email address of a user after they have
 * signed up. Once the user has confirmed their email address, a new user is
 * created in the database (public, auth already exists) and the user is
 * redirected to the login page.
 *
 * @param request - The request object.
 *
 * @returns A redirect to the login page.
 */
export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const code = searchParams.get("code");

  try {
    if (!code) {
      throw new AuthenticationError("No authentication code provided");
    }

    const supabase = createAdminClient();

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.exchangeCodeForSession(code);

    if (sessionError || !session?.user?.id) {
      throw new AuthenticationError(
        "Failed to exchange code for session: ",
        sessionError?.message
      );
    }

    if (!session.user.email) {
      throw new AuthenticationError("No email found in session.");
    }

    const tracking_id = createHash("sha256")
      .update(session.user.email.toLowerCase())
      .digest("hex");

    const supabaseAdmin = createAdminClient();

    // First check if a user with this tracking_id already exists
    const { data: existingUser, error: lookupError } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("tracking_id", tracking_id)
      .maybeSingle();

    if (lookupError) {
      throw new AuthenticationError(
        "Failed to lookup user: ",
        lookupError.message
      );
    }

    let error;

    if (existingUser) {
      // User already exists with this tracking ID, update with user_id
      const { error: updateError } = await supabaseAdmin
        .from("users")
        .update({ user_id: session.user.id })
        .eq("tracking_id", tracking_id);

      error = updateError;
    } else {
      // No user exists, create a new one with both tracking_id and user_id
      const { error: insertError } = await supabaseAdmin.from("users").insert({
        user_id: session.user.id,
        tracking_id,
      });

      error = insertError;
    }

    if (error) {
      throw new AuthenticationError(
        "Failed to create/update user: ",
        error.message
      );
    }

    const requestUrl = new URL(request.url);
    return NextResponse.redirect(new URL("/auth/login", requestUrl.origin));
  } catch (error) {
    const { error: message, status } = handleApiError(error);
    return Response.json({ error: message }, { status });
  }
}
