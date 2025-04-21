"use client";

import * as React from "react";
import { useAuth } from "@/lib/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";
import { Tables } from "@/types/supabase";
import { useState, useEffect } from "react";

import AffiliateOnboarding from "./affiliate-onboarding";
import AffiliateDashboard from "./affiliate-dashboard";

export default function AffiliatePage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [affiliate, setAffiliate] = useState<Tables<"affiliates"> | null>(null);
  
  useEffect(() => {
    async function checkAffiliateStatus() {
      if (!user) return;
      
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("affiliates")
          .select("*")
          .eq("user_id", user.id)
          .single();
        
        if (error) {
          console.error("Error checking affiliate status:", error);
        } else {
          setAffiliate(data);
        }
      } catch (error) {
        console.error("Error fetching affiliate data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    checkAffiliateStatus();
  }, [user]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]">Loading...</div>;
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      {!affiliate ? (
        <AffiliateOnboarding onSuccess={(newAffiliate: Tables<"affiliates">) => setAffiliate(newAffiliate)} />
      ) : (
        <AffiliateDashboard affiliate={affiliate} />
      )}
    </div>
  );
}

