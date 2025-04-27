import { NextRequest, NextResponse } from "next/server";

import crypto from "crypto";

import { createAdminClient } from "@/lib/supabase/server/client";
import { Tables } from "@/types/supabase";

import { getRakutenAdvertisingLink } from "./rakuten";

export async function GET(request: NextRequest) {
  const url = request.nextUrl;

  const link = url.searchParams.get("link");
  const email = url.searchParams.get("email");

  if (!link || !email) {
    return NextResponse.json(
      { error: "Link and email are required" },
      { status: 400 }
    );
  }

  const domain = new URL(link).hostname;

  console.log("Domain", domain);

  if (!domain) {
    return NextResponse.json({ error: "Invalid link" }, { status: 400 });
  }

  const supabase = createAdminClient();

  let { data: brandAndNetwork, error: brandAndNetworkError } = await supabase
    .from("brands")
    .select(
      `
      *,
      network: networks(*)
      `
    )
    .eq("domain", domain)
    .maybeSingle();

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

  const trackingId = crypto
    .createHash("sha256")
    .update(email.toLowerCase().trim())
    .digest("hex");

  if (brandAndNetwork.network.id == 1) {
    try {
      const rakutenAdvertisingLink = await getRakutenAdvertisingLink(
        link,
        trackingId,
        brandAndNetwork
      );

      return NextResponse.json({
        link: rakutenAdvertisingLink,
      });
    } catch (error) {
      console.error("Error when calling getRakutenAdvertisingLink", error);

      return NextResponse.json(
        {
          error:
            "Failed to get Rakuten Advertising link (getRakutenAdvertisingLink)",
        },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json({ error: "Invalid network" }, { status: 400 });
  }
}
