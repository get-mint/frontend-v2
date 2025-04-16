import { Metadata } from "next";

import { AdvertiserDetail } from "./advertiser-detail";

export const metadata: Metadata = {
  title: "Admin | Advertiser Details",
  description: "View and edit advertiser details",
};

export default async function AdvertiserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <AdvertiserDetail id={id} />;
}
