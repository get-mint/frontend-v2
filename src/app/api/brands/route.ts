import { NextRequest, NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/server/client";

import { Tables } from "@/types/supabase";

import { getRakutenAdvertiserActiveOffers } from "./rakuten";

export interface Offer {
  description: string;
  commission: number;
  type: "flat" | "sale";
  is_base_commission: boolean;
}

export async function GET(request: NextRequest) {
  const domain = request.nextUrl.searchParams.get("domain");
  const slug = request.nextUrl.searchParams.get("slug");

  if (!domain && !slug) {
    return NextResponse.json(
      { error: "At least one of domain or slug is required" },
      {
        status: 400,
      }
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
      { error: "Error: " + brandAndNetworkError.message },
      {
        status: 400,
      }
    );
  }

  if (!brandAndNetwork) {
    return NextResponse.json(
      { error: "Brand not found" },
      {
        status: 404,
      }
    );
  }

  brandAndNetwork = brandAndNetwork as unknown as Tables<"brands"> & {
    network: Tables<"networks">;
  };

  let offers: Offer[] = [];

  if (brandAndNetwork.network.id === 1) {
    try {
      const rakutenAdvertiserPartnershipDetails =
        await getRakutenAdvertiserActiveOffers(brandAndNetwork);

      offers = rakutenAdvertiserPartnershipDetails;
    } catch (error) {
      return NextResponse.json(
        {
          error:
            "Failed to get Rakuten advertiser active offers (getRakutenAdvertiserActiveOffers)",
        },
        {
          status: 400,
        }
      );
    }
  } else {
    return NextResponse.json(
      { error: "Brand has invalid network" },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json({
    ...brandAndNetwork,
    offers: offers.sort(
      (a, b) => (b.is_base_commission ? 1 : 0) - (a.is_base_commission ? 1 : 0)
    ),
  });
}
