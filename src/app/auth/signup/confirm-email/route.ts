import { NextResponse } from "next/server";

import { createHash } from "crypto";

import { createClient, createAdminClient } from "@/lib/supabase/server/server";
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

    const supabase = await createClient();

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
      throw new AuthenticationError("No email found in session");
    }

    const tracking_id = createHash("sha256")
      .update(session.user.email.toLowerCase())
      .digest("hex");

    const supabaseAdmin = createAdminClient();

    const { error: createUserError } = await supabaseAdmin
      .from("users")
      .insert({
        id: session.user.id,
        tracking_id,
      });

    if (createUserError) {
      throw new AuthenticationError(
        "Failed to create user: ",
        createUserError.message
      );
    }

    const requestUrl = new URL(request.url);
    return NextResponse.redirect(new URL("/auth/login", requestUrl.origin));
  } catch (error) {
    const { error: message, status } = handleApiError(error);
    return Response.json({ error: message }, { status });
  }
}
