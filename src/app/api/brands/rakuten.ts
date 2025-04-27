import { Tables } from "@/types/supabase";

import { getAccessToken } from "../networks/rakuten-advertising";

export async function getRakutenAdvertiserPartnershipDetails(brandAndNetwork: Tables<"brands"> & {
  network: Tables<"networks">;
}) {
  const advertiserId =
    typeof brandAndNetwork.metadata === "object" &&
    brandAndNetwork.metadata !== null &&
    "mid" in brandAndNetwork.metadata
      ? String(brandAndNetwork.metadata.mid)
      : undefined;

  const accessToken = await getAccessToken();

  const response = await fetch(
    `https://api.linksynergy.com/v1/partnerships/${advertiserId}`,
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
    throw new Error("Failed to get Rakuten partnership details");
  }

  const data = await response.json();

  return data;
}
