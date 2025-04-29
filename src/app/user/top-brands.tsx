import { ExternalLinkIcon } from "lucide-react";

import { createAdminClient } from "@/lib/supabase/server/client";

import { Tables } from "@/types/supabase";

import { Button } from "@/components/ui/button";

async function getBrands() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("brands")
    .select("*")
    .order("priority", { ascending: true })
    .limit(10);

  if (error) {
    throw error;
  }

  return data as Tables<"brands">[];
}

export function Brands({ brands }: { brands: Tables<"brands">[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
      {brands.map((brand) => (
        <div
          key={brand.id}
          className="flex flex-col gap-2 cursor-pointer group"
        >
          <div
            className={`relative aspect-square flex items-center justify-center p-6 rounded-xl overflow-hidden ${
              !brand.color ? "bg-muted" : ""
            }`}
            style={{ backgroundColor: brand.color || undefined }}
          >
            <img
              src={brand.image_url ?? "/placeholder.svg"}
              alt={brand.name}
              className="object-contain max-w-full max-h-full"
              width={120}
              height={120}
            />
            <Button
              className="absolute h-8 text-sm bottom-2 right-2"
              variant="ghost"
            >
              Shop
              <ExternalLinkIcon className="size-4" />
            </Button>
          </div>

          <div className="flex flex-col gap-0.5">
            <div className="text-lg font-bold transition-all group-hover:underline">
              {brand.name}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export async function TopBrands() {
  const brands = await getBrands();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Top Brands</h1>

      <Brands brands={brands} />
    </div>
  );
}
