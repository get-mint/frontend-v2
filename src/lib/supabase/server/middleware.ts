import { NextResponse, type NextRequest } from "next/server";

import { createServerClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";

import { checkAllRoles, checkAuth, checkRole } from "./auth";

/**
 * Protects a path by checking if the user is authenticated and has the required
 * roles. If the user is not authenticated or does not have the required roles,
 * they are redirected to the unauthorized path.
 *
 * @param supabase - The Supabase client.
 * @param roles - The roles required to access the path.
 * @param allRequired - Whether all roles are required.
 * @param unauthorizedPath - The path to redirect to if the user is not
 *                           authorized.
 *
 * @returns The path to redirect to if the user is not authorized, or null if
 *          the user is authorized.
 */
async function protectPath(
  supabase: SupabaseClient,
  roles: string[] | null,
  allRequired: boolean = false,
  unauthorizedPath: string = "/unauthorized"
) {
  let authorized = false;

  const isAuthenticated = await checkAuth(supabase);
  if (!isAuthenticated) {
    return unauthorizedPath;
  }

  if (!roles || roles.length === 0) {
    return null;
  }

  if (allRequired) {
    authorized = await checkAllRoles(supabase, roles);
  } else {
    authorized = await checkRole(supabase, roles);
  }

  if (!authorized) {
    return unauthorizedPath;
  }

  return null;
}

const protectedRoutes = [
  {
    path: "/dashboard",
    roles: [], // This route only requires authentication, no specific roles
    unauthorizedPath: "/unauthorized",
  },
  // Add more protected routes here as needed
  // Example:
  // {
  //   path: "/admin",
  //   roles: ["admin"],
  //   unauthorizedPath: "/unauthorized"
  // }
];

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

  for (const route of protectedRoutes) {
    if (request.nextUrl.pathname.startsWith(route.path)) {
      const unauthorizedPath = await protectPath(
        supabase,
        route.roles,
        false,
        route.unauthorizedPath
      );
      if (unauthorizedPath) {
        const redirectUrl = new URL(unauthorizedPath, request.url);
        const previousPage = request.headers.get("referer") || "/";
        redirectUrl.searchParams.set("from", previousPage);
        return NextResponse.redirect(redirectUrl);
      }
    }
  }

  return NextResponse.next();
}
