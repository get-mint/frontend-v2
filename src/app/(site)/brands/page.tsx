import { Metadata } from "next";
import { unstable_cache } from "next/cache";

import { createAdminClient } from "@/lib/supabase/server/client";

import { TextAnimate } from "@/components/magicui/text-animate";

import BrandsClient from "./brands";

const ITEMS_PER_PAGE = 12;

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

export const metadata: Metadata = {
  title: "Brands | Mint Cashback",
  description:
    "Earn cashback every time you shop — automatically! Mint Cashback helps you find the best cashback deals on your favorite brands.",
};

export default async function BrandsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page || "1", 10);
  const { brands, totalPages } = await fetchBrands(page);

  return (
    <>
      <div className="px-6 py-8 sm:py-20 bg-gradient-to-br from-primary to-primary/70 page-header">
        <div className="flex flex-col items-center gap-4 sm:gap-8">
          <TextAnimate
            animation="slideUp"
            by="word"
            className="max-w-full text-5xl font-bold text-center text-white sm:max-w-3xl sm:text-6xl"
          >
            Earn cashback every time you shop — automatically!
          </TextAnimate>

          <TextAnimate
            animation="blurIn"
            by="line"
            delay={0.25}
            className="max-w-xl text-xl font-medium text-center text-white"
          >
            Mint automatically finds the best cashback offers for you on all of
            your favorite brands, so you don't have to.
          </TextAnimate>
        </div>
      </div>

      <div className="flex flex-col items-center px-6 py-12 mx-auto max-w-7xl">
        <TextAnimate
          animation="slideUp"
          by="character"
          delay={0.35}
          className="mb-4 text-4xl font-bold brands-title"
        >
          Featured Brands
        </TextAnimate>

        <TextAnimate
          animation="blurIn"
          by="line"
          delay={0.5}
          className="mb-12 text-xl font-medium text-center"
        >
          Tap into the best cashback offers for you on all of your favorite
          brands
        </TextAnimate>

        <BrandsClient initialBrands={brands} initialTotalPages={totalPages} />
      </div>
    </>
  );
}
