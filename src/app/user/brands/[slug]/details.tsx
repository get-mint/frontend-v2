"use client";

import Link from "next/link";

import { useAuth } from "@/lib/hooks/use-auth";

import { BrandAndNetworkAndOffers } from "./types";

import { Badge } from "@/components/ui/badge";
import { InfoIcon } from "lucide-react";

export function Details({ brand }: { brand: BrandAndNetworkAndOffers }) {
  const { selectedCurrency, authUser } = useAuth();

  return (
    <div className="flex flex-col gap-8 sm:flex-row">
      <div className="flex flex-col gap-3 flex-2">
        <h1 className="text-3xl font-bold">{brand.name}</h1>
        <p className="mb-3 text-lg font-medium text-justify">
          {brand.description}
        </p>

        <h1 className="text-3xl font-bold">How to Earn Cashback 💸</h1>
        <p className="text-lg font-medium text-justify">
          To earn cashback, you either need to click{" "}
          <Link href={`/launch?domain=${brand.domain}&email=${authUser?.email}`} target="_blank" passHref className="font-bold underline text-primary">
            here
          </Link>
          {" "}to be launched in a new tab (where Mint Cashback will already be tracking your purchase to your email) or{" "}
          <Link href="/download" passHref className="font-bold underline text-primary">
            download
          </Link>
          {" "}the Mint Cashback extension, which will automatically pop up, allowing you to earn cashback in one click when you shop on partnered brands.
        </p>
      </div>

      <div className="flex flex-col flex-1 gap-3">
        <h1 className="text-3xl font-bold">Earn Cashback</h1>

        {brand.offers
          .filter((offer) => offer.commission > 0)
          .map((offer) => (
            <Link key={offer.description}
              href={`/launch?domain=${brand.domain}&email=${authUser?.email}`} target="_blank" passHref className="">
              <div
                className="flex flex-col justify-center w-full gap-2 px-6 py-4 transition-all bg-muted rounded-xl hover:ring-2 hover:ring-primary"
              >
                <h1 className="text-xl font-bold">
                  <span className="text-primary">
                    {offer.commission / 2}
                    {offer.type === "sale" ? "%" : selectedCurrency?.symbol}{" "}
                  </span>
                  cashback
                </h1>
                <p className="text-sm font-medium leading-6 text-muted-foreground">
                  {offer.description.split(/(\[[^\]]+\])/g).map((part, i) =>
                    part.match(/^\[.*\]$/) ? (
                      <Badge key={i} variant="secondary" className="mx-1">
                        {part.replace(/\[|\]/g, "")}
                      </Badge>
                    ) : (
                      part
                    )
                  )}
                </p>
              </div>
            </Link>
          ))}

        <div className="flex flex-row items-center w-full gap-3 p-4 border rounded-xl">
          <InfoIcon className="w-5 h-5 text-muted-foreground shrink-0" />

          <span className="flex text-sm font-medium text-muted-foreground">
            The green number shows your cashback rate. The description below shows the original offer from the brand - we split this 50/50 with you for complete transparency.
          </span>
        </div>
      </div>
    </div>
  );
}
