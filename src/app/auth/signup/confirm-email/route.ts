import { NextResponse } from "next/server";

import { createHash } from "crypto";

import { createAdminClient } from "@/lib/supabase/server/client";
import { AuthenticationError } from "@/lib/utils/errors";

function prepareErrorRedirect(
  requestUrl: URL,
  errorMessage: string,
  errorDetails: string
): URL {
  const errorUrl = new URL(
    "/auth/signup/confirmation-error",
    requestUrl.origin
  );

  errorUrl.searchParams.set("error", errorMessage);
  errorUrl.searchParams.set("details", errorDetails);

  return errorUrl;
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const searchParams = requestUrl.searchParams;
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as
    | "signup"
    | "email"
    | "recovery"
    | "magiclink";

  try {
    if (!token_hash || !type) {
      throw new AuthenticationError("Missing token_hash or type parameter");
    }

    const supabase = createAdminClient();

    // Verify OTP token
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash,
      type,
    });

    if (error) {
      console.error("Error verifying token:", error);
      throw new AuthenticationError(error.message);
    }

    if (data?.user?.id && data.user.email) {
      // User is verified, create or update user record
      const userId = data.user.id;
      const email = data.user.email;
      const tracking_id = createHash("sha256")
        .update(email.toLowerCase())
        .digest("hex");

      // Create or update user record
      const { data: existingUser, error: lookupError } = await supabase
        .from("users")
        .select("*")
        .eq("tracking_id", tracking_id)
        .maybeSingle();

      if (!lookupError) {
        if (existingUser) {
          await supabase
            .from("users")
            .update({ user_id: userId })
            .eq("tracking_id", tracking_id);
        } else {
          await supabase.from("users").insert({
            user_id: userId,
            tracking_id,
          });
        }
      }

      // Redirect to login
      return NextResponse.redirect(new URL("/auth/login", requestUrl.origin));
    }

    // If we got here, no verified user was found
    throw new AuthenticationError("Failed to verify user");
  } catch (error) {
    console.error("Email confirmation error:", error);

    let errorMessage = "Unknown error";
    let errorDetails = "";

    if (error instanceof Error) {
      errorMessage = error.message;
      errorDetails = error.stack || "";
    }

    const errorUrl = prepareErrorRedirect(
      requestUrl,
      errorMessage,
      errorDetails
    );
    return NextResponse.redirect(errorUrl);
  }
}
