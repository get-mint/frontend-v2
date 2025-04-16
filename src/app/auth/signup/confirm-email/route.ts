import { NextResponse } from "next/server";

import { createHash } from "crypto";

import { createAdminClient } from "@/lib/supabase/server/client";
import { AuthenticationError, handleApiError } from "@/lib/utils/errors";

async function exchangeCodeForSession(code: string) {
  const supabase = createAdminClient();

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.exchangeCodeForSession(code);

  if (sessionError || !session?.user?.id) {
    throw new AuthenticationError(
      `Failed to exchange code for session: ${sessionError?.message || ""}`
    );
  }

  if (!session.user.email) {
    throw new AuthenticationError("No email found in session.");
  }

  return { session, userId: session.user.id, email: session.user.email };
}

async function createOrUpdateUser(userId: string, email: string) {
  const tracking_id = createHash("sha256")
    .update(email.toLowerCase())
    .digest("hex");

  const supabase = createAdminClient();

  const { data: existingUser, error: lookupError } = await supabase
    .from("users")
    .select("*")
    .eq("tracking_id", tracking_id)
    .maybeSingle();

  if (lookupError) {
    throw new AuthenticationError(
      `Failed to lookup user: ${lookupError.message}`
    );
  }

  let error;

  if (existingUser) {
    const { error: updateError } = await supabase
      .from("users")
      .update({ user_id: userId })
      .eq("tracking_id", tracking_id);

    error = updateError;
  } else {
    const { error: insertError } = await supabase.from("users").insert({
      user_id: userId,
      tracking_id,
    });

    error = insertError;
  }

  if (error) {
    throw new AuthenticationError(
      `Failed to create/update user: ${error.message}`
    );
  }
}

async function deleteUser(userId: string): Promise<boolean> {
  try {
    const supabase = createAdminClient();
    await supabase.auth.admin.deleteUser(userId);
    console.log(
      `Successfully deleted user ${userId} due to confirmation error`
    );
    return true;
  } catch (error) {
    console.error("Failed to delete user account:", error);
    return false;
  }
}

async function deleteUserWithCode(code: string): Promise<boolean> {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase.auth.exchangeCodeForSession(code);

    if (data?.session?.user?.id) {
      await supabase.auth.admin.deleteUser(data.session.user.id);
      console.log(
        `Successfully deleted user ${data.session.user.id} via fallback method`
      );
      return true;
    }
    return false;
  } catch (error) {
    console.error("Failed to delete user account via fallback method:", error);
    return false;
  }
}

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

function formatErrorInfo(error: unknown): {
  errorMessage: string;
  errorDetails: string;
} {
  let errorMessage = "Unknown error";
  let errorDetails = "";

  if (error instanceof Error) {
    errorMessage = error.message;
    errorDetails = error.stack || "";

    if (error instanceof AuthenticationError) {
      errorMessage = `Authentication Error: ${error.message}`;
    }
  }

  return { errorMessage, errorDetails };
}

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const code = searchParams.get("code");
  let userId: string | undefined;

  try {
    if (!code) {
      throw new AuthenticationError("No authentication code provided");
    }

    const {
      session,
      userId: authUserId,
      email,
    } = await exchangeCodeForSession(code);
    userId = authUserId;

    await createOrUpdateUser(userId, email);

    const requestUrl = new URL(request.url);
    return NextResponse.redirect(new URL("/auth/login", requestUrl.origin));
  } catch (error) {
    const { error: message, status } = handleApiError(error);
    console.error("Email confirmation error:", error);

    const { errorMessage, errorDetails } = formatErrorInfo(error);
    let finalErrorDetails = errorDetails;

    if (userId) {
      const deleteSuccess = await deleteUser(userId);
      if (!deleteSuccess) {
        finalErrorDetails +=
          "\n\nAdditionally, we were unable to clean up the created user account. This may require manual intervention.";
      }
    } else if (code) {
      await deleteUserWithCode(code);
    }

    const requestUrl = new URL(request.url);
    const errorUrl = prepareErrorRedirect(
      requestUrl,
      errorMessage,
      finalErrorDetails
    );

    return NextResponse.redirect(errorUrl);
  }
}
