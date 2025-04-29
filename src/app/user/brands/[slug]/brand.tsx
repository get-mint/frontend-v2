import Banner from "./banner";
import { BrandAndNetworkAndOffers } from "./types";

async function getBrandFromSlug(
  slug: string
): Promise<BrandAndNetworkAndOffers | undefined> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/brands?slug=${encodeURIComponent(
      slug
    )}`
  );

  if (!response.ok) {
    console.error("Failed to fetch brand:", response.status);
    return undefined;
  }

  const data = await response.json();
  console.log("Data:", data);

  return data;
}

export async function Brand({ slug }: { slug: string }) {
  const brand = await getBrandFromSlug(slug);

  return brand ? (
    <>
      <Banner brand={brand} />
    </>
  ) : (
    <div>
      <p>
        We couldn't find the brand you're looking for. Please try again later.
      </p>
    </div>
  );
}
