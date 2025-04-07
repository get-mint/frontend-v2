"use client";

import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";
import { Marquee } from "@/components/magicui/marquee";

import { Database } from "@/types/supabase";

type Advertiser = Database["public"]["Tables"]["advertisers"]["Row"];

export function LogoBanner() {
  const [advertisers, setAdvertisers] = useState<Advertiser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdvertisers = async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("advertisers")
        .select("*")
        .eq("active", true)
        .neq("showcase_image_url", null)
        .neq("showcase_image_url", "")
        .order("name");

      if (error) {
        console.error("Error fetching advertisers:", error);
        return;
      }

      setAdvertisers(data || []);
      setLoading(false);
    };

    fetchAdvertisers();
  }, []);

  return (
    <div className="w-full bg-secondary">
      <Marquee className="h-16 w-full" pauseOnHover>
        {!loading &&
          advertisers.map((advertiser) => (
            <div
              key={advertiser.id}
              className="flex items-center justify-center min-w-[100px] h-full px-3"
            >
              <img
                src={advertiser.showcase_image_url!}
                alt={advertiser.name}
                width={120}
                height={40}
                className="object-contain h-10"
              />
            </div>
          ))}
      </Marquee>
    </div>
  );
}
