import Link from "next/link";
import { Star } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/server/server";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export async function Hero() {
  let stats = {
    usersCount: "1,000+",
    advertisersCount: "100+",
  };

  try {
    const supabase = createAdminClient();

    const { count: usersCount } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true });

    const { count: advertisersCount } = await supabase
      .from("advertisers")
      .select("*", { count: "exact", head: true })
      .eq("active", true);

    stats = {
      usersCount: usersCount?.toLocaleString() || "1,000+",
      advertisersCount: advertisersCount?.toLocaleString() || "100+",
    };
  } catch (error) {
    console.error("Failed to fetch stats:", error);
  }

  return (
    <div className="w-full bg-primary/40 animate-in fade-in">
      <div className="max-w-6xl mx-auto px-4 py-24 flex items-center gap-12 justify-between">
        <div className="max-w-xl animate-in fade-in slide-in-from-left-16 duration-700">
          <p className="text-2xl font-extrabold text-secondary">Mint</p>

          <h1 className="text-7xl font-bold tracking-tight mb-3">
            It's your money,
            <br />
            we grab it for you
          </h1>

          <p className="text-xl text-secondary font-bold">
            Get Cash Back at {stats.advertisersCount || "100+"} stores,
            restaurants, travel bookings and even more. Join and watch your
            rewards add up.
          </p>
        </div>

        <Card className="bg-white rounded-3xl p-8 shadow-lg w-md animate-in zoom-in-95 duration-700 fade-in">
          <CardContent className="p-0 justify-center">
            <h2 className="text-4xl font-bold mb-2">Ready to start saving?</h2>

            <p className="text-lg font-semibold mb-4">
              Join our community of{" "}
              <span className="text-secondary underline font-bold">
                {stats.usersCount || "1,000+"}
              </span>{" "}
              happy users and growing every day! 💸
            </p>

            <Button
              className="w-full text-lg py-6 rounded-full hover:scale-105 duration-300"
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
