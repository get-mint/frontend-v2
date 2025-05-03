import { createAdminClient } from "@/lib/supabase/server/client";

import { Tables } from "@/types/supabase";

async function fetchNetworks() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("networks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data as Tables<"networks">[];
}

export default async function Networks() {
  const networks = await fetchNetworks();

  return (
    <>
      <h1 className="text-4xl font-bold">Networks</h1>

      <div className="flex flex-wrap gap-3">
        {networks.map((network) => (
          <div
            key={network.id}
            className="flex items-center gap-2 p-3 rounded-lg bg-muted"
          >
            <span className="text-lg font-bold">{network.name}</span>

            <span>{network.domain}</span>
          </div>
        ))}
      </div>
    </>
  );
}
