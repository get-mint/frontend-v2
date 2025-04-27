import { NextRequest, NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/server/client";

export async function GET(request: NextRequest) {
  const domain = request.nextUrl.searchParams.get("domain");
  const slug = request.nextUrl.searchParams.get("slug");

  if (!domain && !slug) {
    return NextResponse.json(
      { error: "At least one of domain or slug is required" },
      { status: 400 }
    );
  }

  const supabase = createAdminClient();

  let query = supabase.from("brands").select("*");

  if (domain) {
    query = query.eq("domain", domain);
  }

  if (slug) {
    query = query.eq("slug", slug);
  }

  const { data, error } = await query.maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  if (!data) {
    return NextResponse.json({ error: "Brand not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}
