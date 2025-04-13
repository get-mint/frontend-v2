import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";
import { checkAuth } from "./auth";

async function isAuthenticated(supabase: SupabaseClient) {
  return await checkAuth(supabase);
}

function redirectToLogin(request: NextRequest) {
  const redirectUrl = new URL("/auth/login", request.url);
  const previousPage = request.headers.get("referer") || "/";
  redirectUrl.searchParams.set("from", previousPage);
  return NextResponse.redirect(redirectUrl);
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );

          supabaseResponse = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  try {
    if (request.nextUrl.pathname.startsWith("/user")) {
      const authenticated = await isAuthenticated(supabase);
      if (!authenticated) {
        return redirectToLogin(request);
      }
    }

    return NextResponse.next();
  } catch (error: any) {
    if (
      error.name === "AuthApiError" &&
      error.code === "refresh_token_not_found"
    ) {
      return redirectToLogin(request);
    }
    return NextResponse.next();
  }
}
