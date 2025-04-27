import { getAccessToken } from "@/app/api/networks/rakuten-advertising";

import { Tables } from "@/types/supabase";

export async function getRakutenAdvertisingLink(
  url: string,
  u1: string, // trackingId
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

  if (!advertiserId) {
    throw new Error("Advertiser ID not found");
  }

  console.log("Advertiser ID", advertiserId);

  const accessToken = await getAccessToken();

  console.log("Access token", accessToken);

  const response = await fetch(
    "https://api.linksynergy.com/v1/links/deep_links",
    {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        url,
        advertiser_id: advertiserId,
        u1,
      }),
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Failed to get Rakuten Advertising link:", {
      status: response.status,
      statusText: response.statusText,
      body: errorBody,
    });
    throw new Error(
      `Failed to get Rakuten Advertising link: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();

  console.log("Data", data);

  return data.deep_link;
}
