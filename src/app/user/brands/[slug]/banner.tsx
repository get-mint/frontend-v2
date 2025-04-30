"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { BrandAndNetworkAndOffers } from "./types";

export default function Banner({ brand }: { brand: BrandAndNetworkAndOffers }) {
  const router = useRouter();
  return (
    <>
      <div className="relative flex flex-row items-center justify-center">
        <Button
          variant="default"
          onClick={() => router.back()}
          className="absolute left-0"
        >
          <ArrowLeft />
          Back
        </Button>

        <h1 className="text-4xl font-extrabold text-center">
          Earn up to {brand.offers[0].commission / 2}
          {brand.offers[0].type === "sale" ? "%" : "€"} cashback on {brand.name}
        </h1>
      </div>

      <div
        className="flex flex-col items-center justify-center w-full py-12 rounded-xl bg-muted"
        style={{ backgroundColor: brand.color ?? "" }}
      >
        <img
          src={brand.image_url ?? ""}
          alt={brand.name}
          height={300}
          width={300}
        />
      </div>
    </>
  );
}
