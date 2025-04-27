import { NextRequest, NextResponse } from "next/server";

import crypto from "crypto";

import { createAdminClient } from "@/lib/supabase/server/client";
import { Tables } from "@/types/supabase";

import { getRakutenAdvertisingLink } from "./rakuten";

export const dynamic = "force-dynamic"; // Completely disable static rendering and caching

export async function GET(request: NextRequest) {
  const url = request.nextUrl;

  const link = url.searchParams.get("link");
  const email = url.searchParams.get("email");

  if (!link || !email) {
    const response = NextResponse.json(
      { error: "Link and email are required" },
      { status: 400 }
    );
    response.headers.set("Cache-Control", "no-store, max-age=0");
    return response;
  }

  const domain = new URL(link).hostname;

  console.log("Domain", domain);

  if (!domain) {
    const response = NextResponse.json(
      { error: "Invalid link" },
      { status: 400 }
    );
    response.headers.set("Cache-Control", "no-store, max-age=0");
    return response;
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
    const response = NextResponse.json(
      { error: brandAndNetworkError.message },
      { status: 400 }
    );
    response.headers.set("Cache-Control", "no-store, max-age=0");
    return response;
  }

  if (!brandAndNetwork) {
    const response = NextResponse.json(
      { error: "Brand not found" },
      { status: 404 }
    );
    response.headers.set("Cache-Control", "no-store, max-age=0");
    return response;
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

      const response = NextResponse.json({
        link: rakutenAdvertisingLink,
      });
      response.headers.set("Cache-Control", "no-store, max-age=0");
      return response;
    } catch (error) {
      console.error("Error when calling getRakutenAdvertisingLink", error);

      const response = NextResponse.json(
        {
          error:
            "Failed to get Rakuten Advertising link (getRakutenAdvertisingLink)",
        },
        { status: 400 }
      );
      response.headers.set("Cache-Control", "no-store, max-age=0");
      return response;
    }
  } else {
    const response = NextResponse.json(
      { error: "Invalid network" },
      { status: 400 }
    );
    response.headers.set("Cache-Control", "no-store, max-age=0");
    return response;
  }
}
