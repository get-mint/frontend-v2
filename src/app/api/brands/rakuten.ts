import { Tables } from "@/types/supabase";

import { getAccessToken } from "../networks/rakuten";
import { Offer } from "./route";

export async function getRakutenAdvertiserActiveOffers(
  brandAndNetwork: Tables<"brands"> & {
    network: Tables<"networks">;
  }
) {
  const advertiserId =
    typeof brandAndNetwork.metadata === "object" &&
    brandAndNetwork.metadata !== null &&
    "mid" in brandAndNetwork.metadata
      ? String(brandAndNetwork.metadata.mid)
      : undefined;

  const accessToken = await getAccessToken();

  const response = await fetch(
    `https://api.linksynergy.com/v1/offers?offer_status=active&advertiser=${advertiserId}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get Rakuten advertiser active offers");
  }

  const data = await response.json();

  const offers: Offer[] = [];

  for (const offer of data.offers[0].offer_rules) {
    offers.push({
      description: offer.commissions[0].description,
      type: offer.commissions[0].commission_type,
      commission: offer.commissions[0].tiers[0].commission,
    });
  }

  return offers;
}
