import { cache } from "react";
import Link from "next/link";

import { Star } from "lucide-react";

import { createAdminClient } from "@/lib/supabase/server/client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const getStats = cache(async () => {
  try {
    const supabase = createAdminClient();

    const [{ count: usersCount }, { count: advertisersCount }] =
      await Promise.all([
        supabase.from("users").select("*", { count: "exact", head: true }),
        supabase
          .from("advertisers")
          .select("*", { count: "exact", head: true })
          .eq("active", true),
      ]);

    return {
      usersCount: usersCount?.toLocaleString() || "1,000+",
      advertisersCount: advertisersCount?.toLocaleString() || "100+",
    };
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    return {
      usersCount: "1,000+",
      advertisersCount: "100+",
    };
  }
});

export async function Hero() {
  const stats = await getStats();

  return (
    <div className="w-full bg-primary/40 animate-in fade-in">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:py-24 flex flex-col sm:flex-row items-center gap-6 sm:gap-12 justify-between">
        <div className="max-w-xl animate-in fade-in slide-in-from-left-16 duration-700 sm:text-left text-center">
          <p className="text-2xl font-extrabold text-secondary hidden sm:block">
            Mint
          </p>

          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-3">
            Cashback, Finally Done Right

          </h1>

          <p className="text-xl text-secondary font-bold">
          Recieve cash back from {stats.advertisersCount || "100+"} stores, travel sites and more — no codes, no effort, just extra cash. 
          Join and watch your rewards add up.
          </p>
        </div>

        <Card className="bg-white rounded-3xl p-8 shadow-lg w-sm sm:w-md animate-in zoom-in-95 duration-700 fade-in">
          <CardContent className="p-0 justify-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">
              Ready to start saving?
            </h2>

            <p className="sm:text-lg font-semibold mb-4">
              Join our community of{" "}
              <span className="text-secondary underline font-bold">
                {stats.usersCount || "1,000+"}
              </span>{" "}
              happy users and growing every day! 💸
            </p>

            <Button
              className="w-full text-lg py-6 rounded-full hover:scale-102"
              variant="secondary"
              asChild
            >
              <Link href="https://chrome.google.com/webstore" target="_blank">
                Download Extension — It's Free
              </Link>
            </Button>

            <div className="flex items-center justify-center w-full mt-4">
              <div className="flex">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              </div>
              <span className="ml-2 text-sm">100+ reviews</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
