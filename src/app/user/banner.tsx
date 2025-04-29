import Link from "next/link";

import { DownloadIcon, TagsIcon } from "lucide-react";

import { createAdminClient } from "@/lib/supabase/server/client";

import { Button } from "@/components/ui/button";

async function getBrandCount() {
  const supabase = createAdminClient();

  const { count, error } = await supabase
    .from("brands")
    .select("*", { count: "exact", head: true });

  if (error) {
    throw error;
  }

  return count;
}

export async function Banner() {
  const brandCount = await getBrandCount();

  return (
    <div className="flex flex-col items-center justify-center w-full p-12 text-center rounded-3xl bg-gradient-to-br from-primary to-primary/60">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-4xl font-extrabold text-white">
          Earn Real Cashback at {brandCount} Stores
        </h1>

        <div className="flex flex-row gap-4">
          <Link href="/home/download" passHref>
            <Button className="w-48 h-12 text-lg font-semibold transition-all bg-primary-foreground hover:w-50 text-primary hover:bg-primary-foreground">
              Start Saving
              <DownloadIcon className="size-5" />
            </Button>
          </Link>

          <Link href="/user/brands" passHref>
            <Button className="w-48 h-12 text-lg font-semibold text-white transition-all bg-transparent border-2 border-primary-foreground hover:w-50 hover:bg-transparent">
              Browse Brands
              <TagsIcon className="size-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
