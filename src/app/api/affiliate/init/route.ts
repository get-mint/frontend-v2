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
    const { display_name, bio, avatar_url } = await request.json();

    // Validate required fields
    if (!display_name || display_name.trim() === "") {
      return NextResponse.json(
        { error: "Display name is required" },
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

    // Check if user already has an affiliate account
    const { data: existingAffiliate } = await supabase
      .from("affiliates")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (existingAffiliate) {
      return NextResponse.json(
        { error: "Affiliate account already exists" },
        { status: 400 }
      );
    }

    // Create affiliate record
    const { data: affiliate, error: affiliateError } = await supabase
      .from("affiliates")
      .insert({
        user_id: user.id,
        display_name,
        bio: bio || null,
        avatar_url: avatar_url || null,
      })
      .select()
      .single();

    if (affiliateError) {
      console.error("Error creating affiliate:", affiliateError);
      return NextResponse.json(
        { error: "Failed to create affiliate account" },
        { status: 500 }
      );
    }

    // Create default referral code (use first 8 chars of affiliate ID)
    const defaultCode = affiliate.id.substring(0, 8);
    const { error: codeError } = await supabase
      .from("affiliate_codes")
      .insert({
        affiliate_id: affiliate.id,
        code: defaultCode,
      });

    if (codeError) {
      console.error("Error creating referral code:", codeError);
      // Don't fail the request since the affiliate was created
    }

    // Create default reward stages (example values)
    const rewardStages = [
      { affiliate_id: affiliate.id, month: 0, reward_pct: 40 },
      { affiliate_id: affiliate.id, month: 1, reward_pct: 30 },
      { affiliate_id: affiliate.id, month: 2, reward_pct: 20 },
    ];

    const { error: stagesError } = await supabase
      .from("affiliate_reward_stages")
      .insert(rewardStages);

    if (stagesError) {
      console.error("Error creating reward stages:", stagesError);
      // Don't fail the request since the affiliate was created
    }

    return NextResponse.json(affiliate);
  } catch (error) {
    console.error("Error in affiliate init API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 