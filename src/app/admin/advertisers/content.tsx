import { unstable_cache } from "next/cache";

import { createAdminClient } from "@/lib/supabase/server/client";

import { AdvertisersTable } from "./table";
import { AdvertisersPagination } from "./pagination";

const ITEMS_PER_PAGE = 10;

const fetchAdvertisersData = async (page: number, searchQuery: string) => {
  const supabase = createAdminClient();

  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE - 1;

  let query = supabase.from("advertisers").select(
    `
      *,
      network: networks(name),
      currency: currencies(acronym)
    `,
    { count: "exact" }
  );

  if (searchQuery) {
    query = query.or(
      `name.ilike.%${searchQuery}%,domain.ilike.%${searchQuery}%`
    );
  }

  const { data, count, error } = await query
    .range(start, end)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching advertisers:", error);
    return { advertisers: [], totalPages: 0 };
  }

  return {
    advertisers: data || [],
    totalPages: Math.ceil((count || 0) / ITEMS_PER_PAGE),
  };
};

const fetchAdvertisers = unstable_cache(
  fetchAdvertisersData,
  ["admin-advertisers-list"],
  { revalidate: 60, tags: ["advertisers"] }
);

async function toggleAdvertiserActive(formData: FormData) {
  "use server";

  const id = formData.get("id") as string;
  const currentActive = formData.get("active") === "true";

  if (!id) return;

  const supabase = createAdminClient();

  try {
    const { error } = await supabase
      .from("advertisers")
      .update({ active: !currentActive })
      .eq("id", id);

    if (error) throw error;

    try {
      await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/revalidate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tag: "advertisers" }),
      });
    } catch (revalidateError) {
      console.error("Failed to revalidate:", revalidateError);
    }
  } catch (error) {
    console.error("Error updating advertiser:", error);
  }
}

export async function AdvertisersContent({
  page,
  searchQuery,
}: {
  page: number;
  searchQuery: string;
}) {
  const { advertisers, totalPages } = await fetchAdvertisers(page, searchQuery);

  return (
    <>
      <AdvertisersTable
        advertisers={advertisers}
        toggleActiveAction={toggleAdvertiserActive}
      />

      {totalPages > 0 && (
        <AdvertisersPagination
          currentPage={page}
          totalPages={totalPages}
          searchQuery={searchQuery}
        />
      )}
    </>
  );
}
