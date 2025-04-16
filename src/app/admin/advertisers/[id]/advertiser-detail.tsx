"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, LoaderCircle } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Advertiser,
  AdvertiserForm,
  Network,
  Currency,
} from "./advertiser-form";

interface AdvertiserDetailProps {
  id: string;
}

export function AdvertiserDetail({ id }: AdvertiserDetailProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [advertiser, setAdvertiser] = useState<Advertiser | null>(null);
  const [networks, setNetworks] = useState<Network[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch advertiser data
        const { data: advertiserData, error: advertiserError } = await supabase
          .from("advertisers")
          .select("*")
          .eq("id", id)
          .single();

        if (advertiserError) {
          throw advertiserError;
        }

        // Fetch networks and currencies
        const [networksResult, currenciesResult] = await Promise.all([
          supabase.from("networks").select("id, name").order("name"),
          supabase.from("currencies").select("id, name, acronym").order("name"),
        ]);

        if (networksResult.data) setNetworks(networksResult.data);
        if (currenciesResult.data) setCurrencies(currenciesResult.data);

        if (advertiserData) {
          setAdvertiser(advertiserData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated && id) {
      fetchData();
    }
  }, [isAuthenticated, id, supabase]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <LoaderCircle className="animate-spin size-8" />
      </div>
    );
  }

  if (!advertiser) {
    return <div>Advertiser not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-4xl font-bold">Edit {advertiser.name}</h1>
      </div>

      <AdvertiserForm
        advertiserId={id}
        advertiser={advertiser}
        networks={networks}
        currencies={currencies}
      />
    </div>
  );
} 