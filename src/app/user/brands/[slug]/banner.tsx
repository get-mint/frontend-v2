"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { ArrowLeftIcon, ExternalLinkIcon } from "lucide-react";

import { useAuth } from "@/lib/hooks/use-auth";

import { Button } from "@/components/ui/button";

import { BrandAndNetworkAndOffers } from "./types";

export default function Banner({ brand }: { brand: BrandAndNetworkAndOffers }) {
  const router = useRouter();

  const { authUser, selectedCurrency } = useAuth();

  return (
    <>
      <div className="relative flex flex-row items-center justify-center">
        <Button
          variant="default"
          onClick={() => router.back()}
          className="absolute left-0 hidden md:flex"
        >
          <ArrowLeftIcon />
          Back
        </Button>

        <h1 className="text-4xl font-extrabold text-center">
          Earn up to {brand.offers[0].commission / 2}
          {brand.offers[0].type === "sale"
            ? "%"
            : selectedCurrency?.symbol}{" "}
          cashback on {brand.name}
        </h1>

        <Link
          href={`/launch?domain=${brand.domain}&email=${authUser?.email}`}
          target="_blank"
          className="absolute right-0"
        >
          <Button variant="outline">
            Shop
            <ExternalLinkIcon />
          </Button>
        </Link>
      </div>

      <div
        className="flex flex-col items-center justify-center w-full py-12 rounded-xl bg-muted"
        style={{ backgroundColor: brand.color ?? "" }}
      >
        <Link href={`/launch?domain=${brand.domain}&email=${authUser?.email}`} target="_blank" passHref className="">

          <img
            src={brand.image_url ?? ""}
            alt={brand.name}
            height={300}
            width={300}
          />
        </Link>

      </div>
    </>
  );
}
