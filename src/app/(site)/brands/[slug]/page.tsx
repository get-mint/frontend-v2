import { Suspense } from "react";
import { Metadata } from "next";

import { Brand } from "./brand";
import { fetchBrand } from "./data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const brand = await fetchBrand(slug);

  if (!brand) {
    return {
      title: "Brand Not Found | Mint Cashback",
      description: "The requested brand could not be found.",
    };
  }

  return {
    title: `Mint Cashback | Cashback on ${brand.name}`,
    description: `Earn up to ${brand.up_to_pct ?? "0"}% cashback on ${
      brand.name
    } with Mint. ${brand.description}`,
    openGraph: {
      title: `${brand.name} | Mint Cashback`,
      description: `Earn up to ${brand.up_to_pct ?? "0"}% cashback on ${
        brand.name
      } with Mint. ${brand.description}`,
      images: brand.image_url ? [brand.image_url] : undefined,
    },
  };
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="min-h-screen">
      <Suspense fallback={undefined}>
        <Brand slug={slug} />
      </Suspense>
    </div>
  );
}
