import { NextRequest, NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/server/client";

/**
 * When an email is saved on the browser extension, this route is called to save it on the database.
 *
 * @param request - The request object containing the email to save.
 *
 * @returns The response object containing the saved user or an error message.
 */
export async function POST(request: NextRequest) {
  const { email } = await request.json();

  const supabase = createAdminClient();

  const { data: existingUser, error: existingUserError } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (existingUserError) {
    return NextResponse.json(
      { error: existingUserError.message },
      { status: 500 }
    );
  }

  if (existingUser) {
    return NextResponse.json({ data: existingUser }, { status: 200 });
  }

  let { data: newUser, error: newUserError } = await supabase
    .from("users")
    .insert({ email })
    .select();

  if (newUserError) {
    return NextResponse.json({ error: newUserError.message }, { status: 500 });
  }

  return NextResponse.json({ data: newUser }, { status: 200 });
}
