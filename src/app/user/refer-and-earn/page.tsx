"use client";

import { useEffect, useState } from "react";

import { useAuth } from "@/lib/hooks/use-auth";

import { Loader } from "@/components/ui/loader";

import { Banner } from "./banner";
import { Tables } from "@/types/supabase";
import { createClient } from "@/lib/supabase/client";

export default function ReferAndEarn() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [affiliate, setAffiliate] = useState<Tables<"affiliates"> | undefined>(
    undefined
  );

  useEffect(() => {
    if (!user?.auth_user_id) return;
    const fetchAffiliate = async () => {
      setLoading(true);

      const supabase = createClient();

      const { data, error } = await supabase
        .from("affiliates")
        .select("*")
        .eq("user_id", user?.auth_user_id)
        .maybeSingle();

      if (error) {
        console.error(error);
        return;
      }

      setAffiliate(data);

      setLoading(false);
    };

    fetchAffiliate();
  }, [user?.auth_user_id]);

  return loading ? (
    <div className="flex items-center justify-center h-[80vh]">
      <Loader className="size-12 text-primary" />
    </div>
  ) : (
    <>
      {affiliate ? (
        <div className="flex items-center justify-center h-[80vh]">
          <p className="text-2xl font-bold">You are already an affiliate.</p>
        </div>
      ) : (
        <Banner />
      )}
    </>
  );
}
