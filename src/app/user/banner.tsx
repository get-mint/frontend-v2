import { Button } from "@/components/ui/button";

import { createAdminClient } from "@/lib/supabase/server/client";

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
          <Button className="w-48 h-12 text-lg font-semibold transition-all shadow-md hover:shadow-lg bg-primary-foreground hover:w-50 text-primary hover:bg-primary-foreground">
            Start Saving
          </Button>
          <Button className="w-48 h-12 text-lg font-semibold text-white transition-all bg-transparent border-2 shadow-md hover:shadow-lg border-primary-foreground hover:w-50 hover:bg-transparent">
            Browse Brands
          </Button>
        </div>
      </div>
    </div>
  );
}
