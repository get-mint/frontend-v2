import Link from "next/link";
import { unstable_cache } from "next/cache";
import { cn } from "@/lib/utils/tailwind";

import { createAdminClient } from "@/lib/supabase/server/client";

import { Tables } from "@/types/supabase";

import { BlurFade } from "@/components/magicui/blur-fade";
import { BrandsPagination } from "./pagination";

const ITEMS_PER_PAGE = 8;

const fetchBrandsData = async (page: number) => {
  const supabase = createAdminClient();

  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE - 1;

  let query = supabase
    .from("advertisers")
    .select("*", { count: "exact" })
    .eq("active", true);

  const { data, count, error } = await query
    .range(start, end)
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching brands:", error);
    return { brands: [], totalPages: 0 };
  }

  return {
    brands: data || [],
    totalPages: Math.ceil((count || 0) / ITEMS_PER_PAGE),
  };
};

const fetchBrands = unstable_cache(fetchBrandsData, ["brands-list"], {
  revalidate: 3600,
});

interface BrandsProps {
  page: number;
}

export default async function Brands({ page = 1 }: BrandsProps) {
  const { brands, totalPages } = await fetchBrands(page);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-4">
        {brands.map((brand: Tables<"advertisers">, index: number) => (
          <BlurFade delay={0.1 * (index % 4)} key={brand.id} inView>
            <Link href={`/brands/${brand.slug}`}>
              <div
                className={cn(
                  "p-8 rounded-3xl hover:scale-102 transition-all",
                  !brand.brand_hex_color && "border"
                )}
                style={
                  brand.brand_hex_color
                    ? { backgroundColor: brand.brand_hex_color }
                    : undefined
                }
              >
                <img
                  src={brand.image_url || "/images/placeholder.svg"}
                  alt={brand.name}
                  width={512}
                  height={512}
                  className="object-contain w-full aspect-video"
                />
              </div>
            </Link>
          </BlurFade>
        ))}
      </div>

      {totalPages > 1 && (
        <BrandsPagination currentPage={page} totalPages={totalPages} />
      )}
    </>
  );
}
