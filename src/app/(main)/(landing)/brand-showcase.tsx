import { Suspense } from "react";

import { createAdminClient } from "@/lib/supabase/server/client";

import type { Database } from "@/types/supabase";

type Advertiser = Database["public"]["Tables"]["advertisers"]["Row"];

export async function LandingBrandShowcase() {
  let brands: Advertiser[] = [];

  try {
    const supabase = await createAdminClient();

    const { data, error } = await supabase
      .from("advertisers")
      .select("*")
      .eq("active", true)
      .order("name")
      .limit(12);

    if (error) {
      console.error("Error fetching brands:", error.message);
    } else if (data) {
      brands = data;
    }
  } catch (error) {
    console.error("Failed to fetch brands:", error);
  }

  return (
    <div className="grid grid-cols-4 gap-2 max-h-[180px] overflow-hidden animate-in fade-in zoom-in-85 duration-700">
      {brands.map((brand) => (
        <div
          key={brand.id}
          className="bg-white p-2 rounded-lg shadow-sm flex items-center justify-center"
        >
          <div className="w-12 h-12 relative">
            <img
              src={brand.image_url || "/placeholder.svg"}
              alt={brand.name}
              className="object-contain w-full h-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function BrandShowcase() {
  return (
    <Suspense
      fallback={
        <div className="grid grid-cols-4 gap-2 max-h-[180px] overflow-hidden">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="bg-white p-2 rounded-lg shadow-sm flex items-center justify-center"
            >
              <div className="w-12 h-12 relative bg-muted animate-pulse" />
            </div>
          ))}
        </div>
      }
    >
      <LandingBrandShowcase />
    </Suspense>
  );
}
