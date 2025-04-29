import { Button } from "@/components/ui/button";
import { createAdminClient } from "@/lib/supabase/server/client";
import { Tables } from "@/types/supabase";
import { ExternalLinkIcon, LinkIcon } from "lucide-react";
import Image from "next/image";

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

export async function Brands() {
  const brands = await getBrands();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Featured Offers</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {brands.map((brand) => (
          <div key={brand.id} className="flex flex-col gap-2">
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
              <div className="text-lg font-bold">{brand.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
