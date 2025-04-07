import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/supabase";

export async function GET() {
  try {
    const supabase = createClient();

    const { count: usersCount } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true });

    const { count: advertisersCount } = await supabase
      .from("advertisers")
      .select("*", { count: "exact", head: true });

    return NextResponse.json({
      usersCount: usersCount || 0,
      advertisersCount: advertisersCount || 0,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
} 