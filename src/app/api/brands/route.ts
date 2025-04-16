import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server/client";

const ITEMS_PER_PAGE = 8;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");

  const supabase = createAdminClient();

  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE - 1;

  let query = supabase
    .from("advertisers")
    .select("*", { count: "exact" })
    .eq("active", true);

  const { data, count, error } = await query
    .range(start, end)
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching brands:", error);
    return NextResponse.json(
      { error: "Failed to fetch brands" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    brands: data || [],
    totalPages: Math.ceil((count || 0) / ITEMS_PER_PAGE),
  });
}
