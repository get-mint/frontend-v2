import { NextRequest, NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/server/client";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { agreedToTerms, authUserId } = await request.json();

    if (!agreedToTerms) {
      return NextResponse.json(
        { error: "You must agree to the Terms of Service to continue" },
        { status: 400 }
      );
    }

    if (!authUserId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    console.log("Attempting to find user with auth_user_id:", authUserId);

    const { data: userRecord, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("auth_user_id", authUserId)
      .maybeSingle();

    if (userError || !userRecord) {
      console.error("Error finding user:", userError || "User not found");
      return NextResponse.json(
        { error: "User not found in database" },
        { status: 404 }
      );
    }

    console.log("Found user with ID:", userRecord.id);

    const { data: existingAffiliate, error: checkError } = await supabase
      .from("affiliates")
      .select("*")
      .eq("user_id", userRecord.id)
      .maybeSingle();

    if (checkError) {
      console.error("Error checking existing affiliate:", checkError);
      return NextResponse.json(
        {
          error:
            "Error checking existing affiliate status: " + checkError.message,
        },
        { status: 500 }
      );
    }

    if (existingAffiliate) {
      return NextResponse.json({
        success: true,
        message: "You are already registered as an affiliate",
        affiliate: existingAffiliate,
      });
    }

    const { data: affiliate, error: insertError } = await supabase
      .from("affiliates")
      .insert({
        user_id: userRecord.id,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Error inserting affiliate:", insertError);
      return NextResponse.json(
        { error: "Failed to register as affiliate: " + insertError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "You are now registered as an affiliate",
      affiliate,
    });
  } catch (error: any) {
    console.error("Error in affiliate registration:", error);
    return NextResponse.json(
      { error: "Internal server error: " + error.message },
      { status: 500 }
    );
  }
}
