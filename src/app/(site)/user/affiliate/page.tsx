"use client";

import { useEffect, useState } from "react";

import { useAuth } from "@/lib/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";

import { Tables } from "@/types/supabase";
import { Loader } from "@/components/loader";

import { Onboarding } from "./onboarding";
import AffiliateDashboard from "./dashboard";

export default function UserAffiliatePage() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [affiliate, setAffiliate] = useState<Tables<"affiliates"> | null>(null);

  async function checkAffiliateStatus() {
    if (!user) return;

    setLoading(true);

    const supabase = createClient();

    const { data, error } = await supabase
      .from("affiliates")
      .select("*")
      .eq("user_id", user.user_id)
      .maybeSingle();

    if (error) {
      console.error("Error checking affiliate status:", error);
    }

    if (data) {
      setAffiliate(data);
    }

    setLoading(false);
  }

  useEffect(() => {
    checkAffiliateStatus();
  }, [user]);

  return loading ? (
    <Loader />
  ) : (
    <>
      {!affiliate ? (
        <Onboarding onSuccess={setAffiliate} />
      ) : (
        <AffiliateDashboard affiliate={affiliate} />
      )}
    </>
  );
}
