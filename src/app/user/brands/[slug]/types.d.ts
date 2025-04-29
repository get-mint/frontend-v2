import { Tables } from "@/types/supabase";

export interface BrandAndNetworkAndOffers extends Tables<"brands"> {
  network: Tables<"networks">;
  offers: {
    description: string;
    commission: number;
    type: string;
  }[];
}
