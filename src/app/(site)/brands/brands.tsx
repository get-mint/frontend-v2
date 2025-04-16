import Link from "next/link";
import { unstable_cache } from "next/cache";
import { cn } from "@/lib/utils/tailwind";

import { createAdminClient } from "@/lib/supabase/server/client";

import { Tables } from "@/types/supabase";

import { BlurFade } from "@/components/magicui/blur-fade";

const fetchBrandsData = async () => {
  const supabase = createAdminClient();

  const { data: advertisers, error } = await supabase
    .from("advertisers")
    .select("*")
    .eq("active", true);

  if (error) {
    console.error("Error fetching brands:", error);
    return [];
  }

  return advertisers;
};

const fetchBrands = unstable_cache(fetchBrandsData, ["brands-list"], {
  revalidate: 3600,
});

export default async function Brands() {
  const brands = await fetchBrands();

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {brands.map((brand: Tables<"advertisers">) => (
        <BlurFade delay={0.1} key={brand.id} inView>
          <Link href={`/brands/${brand.slug}`}>
            <div 
              className={cn("p-6 rounded-3xl hover:scale-102 transition-all", !brand.brand_hex_color && "border")}
              style={brand.brand_hex_color ? { backgroundColor: brand.brand_hex_color } : undefined}
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
  );
}
