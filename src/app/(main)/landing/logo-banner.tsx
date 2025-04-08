import { createClient } from "@/lib/supabase/server/server";

import { Marquee } from "@/components/magicui/marquee";

import { Database } from "@/types/supabase";

type Advertiser = Database["public"]["Tables"]["advertisers"]["Row"];

export async function LogoBanner() {
  const supabase = await createClient();

  const { data: advertisers, error } = await supabase
    .from("advertisers")
    .select("*")
    .eq("active", true)
    .neq("showcase_image_url", null)
    .neq("showcase_image_url", "")
    .order("name");

  if (error) {
    console.error("Error fetching advertisers:", error);
    return null;
  }

  return (
    <div className="w-full bg-secondary animate-in fade-in">
      <Marquee className="h-20 w-full" pauseOnHover>
        {advertisers?.map((advertiser: Advertiser) => (
          <div
            key={advertiser.id}
            className="flex items-center justify-center h-full"
          >
            <img
              src={advertiser.showcase_image_url!}
              alt={advertiser.name}
              width={120}
              height={40}
              className="object-contain h-16"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
}
