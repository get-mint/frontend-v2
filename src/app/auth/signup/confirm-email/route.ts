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

    // Handle the case where exchangeCodeForSession might fail
    try {
      const { data } = await supabase.auth.exchangeCodeForSession(code);

      if (data?.session?.user?.id) {
        await supabase.auth.admin.deleteUser(data.session.user.id);
        console.log(
          `Successfully deleted user ${data.session.user.id} via fallback method`
        );
        return true;
      }
    } catch (exchangeError) {
      console.error("Error exchanging code for session:", exchangeError);
      // Continue to try other methods if available
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
  const token = searchParams.get("token");
  let userId: string | undefined;

  try {
    if (!code && !token) {
      throw new AuthenticationError("No authentication code or token provided");
    }

    // Try to get user from token (PKCE flow) first
    if (token) {
      try {
        // Extract user info from token - for PKCE flow
        const supabase = createAdminClient();
        
        // Try to get user info from the token
        const tokenParts = token.split('_');
        if (tokenParts.length > 1) {
          // The token might contain encoded user info
          // Let's check if the user exists and is confirmed
          const { data: users, error: usersError } = await supabase.auth.admin.listUsers();
          
          if (!usersError && users?.users) {
            // Find recently confirmed user
            const confirmedUser = users.users.find(user => 
              user.email_confirmed_at !== null && 
              // Look for users confirmed in the last 5 minutes
              (new Date().getTime() - new Date(user.email_confirmed_at || '').getTime() < 5 * 60 * 1000)
            );
            
            if (confirmedUser && confirmedUser.email) {
              // This user was just confirmed! Let's use this
              await createOrUpdateUser(confirmedUser.id, confirmedUser.email);
              
              const requestUrl = new URL(request.url);
              return NextResponse.redirect(new URL("/auth/login", requestUrl.origin));
            }
          }
        }
      } catch (tokenError) {
        console.error("Error processing token:", tokenError);
        // Continue to try with code if available
      }
    }

    // If we got here and have a code, try the original flow
    if (code) {
      try {
        const {
          session,
          userId: authUserId,
          email,
        } = await exchangeCodeForSession(code);
        userId = authUserId;

        await createOrUpdateUser(userId, email);

        const requestUrl = new URL(request.url);
        return NextResponse.redirect(new URL("/auth/login", requestUrl.origin));
      } catch (codeError) {
        console.error("Error exchanging code:", codeError);
        
        // Check if user might already be verified (code already consumed)
        // This is a fallback approach
        const supabase = createAdminClient();
        const { data: recentUsers, error: usersError } = await supabase.auth.admin.listUsers();
        
        if (!usersError && recentUsers?.users) {
          // Find recently verified users (within last 5 minutes)
          const recentlyVerifiedUsers = recentUsers.users.filter(user => 
            user.email_confirmed_at !== null && 
            (new Date().getTime() - new Date(user.email_confirmed_at || '').getTime() < 5 * 60 * 1000)
          );
          
          if (recentlyVerifiedUsers.length === 1 && recentlyVerifiedUsers[0].email) {
            // If we have exactly one recently verified user, it's likely the one we're dealing with
            await createOrUpdateUser(recentlyVerifiedUsers[0].id, recentlyVerifiedUsers[0].email);
            
            const requestUrl = new URL(request.url);
            return NextResponse.redirect(new URL("/auth/login", requestUrl.origin));
          }
        }
        
        // If we got here, we need to propagate the original error
        throw codeError;
      }
    }
    
    // If we got here with neither a valid token nor code
    throw new AuthenticationError("Failed to verify user");
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
