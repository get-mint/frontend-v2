import { NextResponse, type NextRequest } from "next/server";

import { createServerClient } from "@supabase/ssr";

import { isUserAdmin, isUserAuthenticated } from "./auth";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );

          response = NextResponse.next({ request });

          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const previousPage = request.headers.get("referer") || "/";

  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/user", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/admin")) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !(await isUserAdmin(supabase))) {
      const redirectUrl = new URL("/auth/login", request.url);
      redirectUrl.searchParams.set("from", previousPage);
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (request.nextUrl.pathname.startsWith("/user")) {
    if (!(await isUserAuthenticated(supabase))) {
      const redirectUrl = new URL("/auth/login", request.url);
      redirectUrl.searchParams.set("from", previousPage);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return response;
}
