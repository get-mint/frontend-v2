import { NextRequest, NextResponse } from "next/server";
import { createClientFromJwt } from "@/lib/supabase/server/client";

export async function POST(request: NextRequest) {
  try {
    // Get authorization header
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authorization header required" },
        { status: 401 }
      );
    }

    const jwt = authHeader.split(" ")[1];
    const supabase = await createClientFromJwt(jwt);

    if (!supabase) {
      return NextResponse.json(
        { error: "Invalid authorization token" },
        { status: 401 }
      );
    }

    // Get the request body
    const { code } = await request.json();

    // Validate required fields
    if (!code || code.trim() === "") {
      return NextResponse.json(
        { error: "Code is required" },
        { status: 400 }
      );
    }

    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Get the user's affiliate account
    const { data: affiliate, error: affiliateError } = await supabase
      .from("affiliates")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (affiliateError || !affiliate) {
      return NextResponse.json(
        { error: "Affiliate account not found" },
        { status: 404 }
      );
    }

    // Check if the code already exists
    const { data: existingCode, error: codeCheckError } = await supabase
      .from("affiliate_codes")
      .select("*")
      .eq("code", code)
      .maybeSingle();

    if (codeCheckError) {
      console.error("Error checking code:", codeCheckError);
      return NextResponse.json(
        { error: "Failed to check if code exists" },
        { status: 500 }
      );
    }

    if (existingCode) {
      return NextResponse.json(
        { error: "This code is already in use" },
        { status: 400 }
      );
    }

    // Count existing codes for this affiliate
    const { count, error: countError } = await supabase
      .from("affiliate_codes")
      .select("*", { count: "exact", head: true })
      .eq("affiliate_id", affiliate.id);

    if (countError) {
      console.error("Error counting codes:", countError);
      return NextResponse.json(
        { error: "Failed to count existing codes" },
        { status: 500 }
      );
    }

    // Limit to 3 codes per affiliate
    if (count && count >= 3) {
      return NextResponse.json(
        { error: "Maximum number of referral codes reached (3)" },
        { status: 400 }
      );
    }

    // Create the new code
    const { data: newCode, error: createError } = await supabase
      .from("affiliate_codes")
      .insert({
        affiliate_id: affiliate.id,
        code,
      })
      .select()
      .single();

    if (createError) {
      console.error("Error creating code:", createError);
      return NextResponse.json(
        { error: "Failed to create referral code" },
        { status: 500 }
      );
    }

    return NextResponse.json(newCode);
  } catch (error) {
    console.error("Error in affiliate code API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 