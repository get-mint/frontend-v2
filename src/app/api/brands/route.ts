import { NextRequest, NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/server/client";

import { Tables } from "@/types/supabase";

import { getRakutenAdvertiserPartnershipDetails } from "./rakuten";

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

  let query = supabase.from("brands").select(
    `
    *,
    network: networks(*)
    `
  );

  if (domain) {
    query = query.eq("domain", domain);
  }

  if (slug) {
    query = query.eq("slug", slug);
  }

  let { data: brandAndNetwork, error: brandAndNetworkError } =
    await query.maybeSingle();

  if (brandAndNetworkError) {
    return NextResponse.json(
      { error: brandAndNetworkError.message },
      { status: 400 }
    );
  }

  if (!brandAndNetwork) {
    return NextResponse.json({ error: "Brand not found" }, { status: 404 });
  }

  brandAndNetwork = brandAndNetwork as unknown as Tables<"brands"> & {
    network: Tables<"networks">;
  };

  if (brandAndNetwork.network.id === 1) {
    try {
      const rakutenAdvertiserPartnershipDetails =
        await getRakutenAdvertiserPartnershipDetails(brandAndNetwork);

      return NextResponse.json({
        ...brandAndNetwork,
        rakutenAdvertiserPartnershipDetails,
      });
    } catch (error) {
      return NextResponse.json(
        {
          error:
            "Failed to get Rakuten partnership details (getRakutenAdvertiserPartnershipDetails)",
        },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json(
      { error: "Brand has invalid network" },
      { status: 400 }
    );
  }

  return NextResponse.json(brandAndNetwork);
}
