"use client";

import { useEffect, useState } from "react";

import { useAuth } from "@/lib/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";

import { Tables } from "@/types/supabase";

import { Loader } from "@/components/ui/loader";

import { Banner } from "./banner";
import { Register } from "./register";

export default function ReferAndEarn() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [affiliate, setAffiliate] = useState<Tables<"affiliates"> | undefined>(
    undefined
  );

  useEffect(() => {
    if (!user?.id) return;
    const fetchAffiliate = async () => {
      setLoading(true);

      const supabase = createClient();

      const { data, error } = await supabase
        .from("affiliates")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) {
        console.error(error);
        return;
      }

      setAffiliate(data);

      setLoading(false);
    };

    fetchAffiliate();
  }, [user?.id]);

  const handleRegistrationSuccess = (newAffiliate: Tables<"affiliates">) => {
    setAffiliate(newAffiliate);
  };

  return loading ? (
    <div className="flex items-center justify-center h-[80vh]">
      <Loader className="size-12 text-primary" />
    </div>
  ) : (
    <div className="space-y-8">
      {!affiliate && (
        <>
          <Banner />
          <Register onSuccess={handleRegistrationSuccess} />
        </>
      )}
    </div>
  );
}
