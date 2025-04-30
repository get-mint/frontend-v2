"use client";

import { useAuth } from "@/lib/hooks/use-auth";

import { BrandAndNetworkAndOffers } from "./types";

export function Details({ brand }: { brand: BrandAndNetworkAndOffers }) {
  const { selectedCurrency } = useAuth();

  return (
    <div className="flex flex-col gap-8 sm:flex-row">
      <div className="flex flex-col gap-3 flex-2">
        <h1 className="text-3xl font-bold">{brand.name}</h1>
        <p className="mb-3 text-lg font-medium text-justify">
          {brand.description}
        </p>

        <h1 className="text-3xl font-bold">Cashback Offers</h1>
        <p className="text-lg font-medium text-justify">
          We've found {brand.offers.filter((offer) => offer.commission > 0).length} cashback offers for {brand.name}.
        </p>
        <div className="flex flex-wrap gap-3">
          {brand.offers
            .filter((offer) => offer.commission > 0)
            .map((offer) => (
              <div
                key={offer.description}
                className="flex flex-col justify-center gap-2 px-6 py-4 transition-all bg-muted rounded-xl max-w-96 hover:ring-2 hover:ring-primary"
              >
                <h1 className="text-xl font-bold">
                  <span className="text-primary">
                    {offer.commission / 2}
                    {offer.type === "sale"
                      ? "%"
                      : selectedCurrency?.symbol}{" "}
                  </span>
                  cashback
                </h1>
                <p className="text-sm font-medium text-muted-foreground">
                  {offer.description}
                </p>
              </div>
            ))}
        </div>
      </div>

      <div className="flex flex-col flex-1 gap-3">
        <h1 className="text-3xl font-bold">Earn Cashback</h1>
      </div>
    </div>
  );
}
