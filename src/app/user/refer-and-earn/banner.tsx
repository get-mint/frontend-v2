"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/hooks/use-auth";
import { ArrowRightIcon, DollarSignIcon } from "lucide-react";

export function Banner() {
  const { selectedCurrency } = useAuth();

  return (
    <div className="relative flex flex-col items-center justify-center w-full gap-3 p-8 text-white rounded-lg bg-gradient-to-r from-primary to-secondary">
      <h1 className="text-4xl font-extrabold sm:text-6xl">
        Earn up to {selectedCurrency?.symbol}5
      </h1>
      <p className="text-2xl font-bold sm:text-4xl">for every friend you refer</p>

      <Button className="w-48 h-12 mt-1 text-xl bg-transparent border-2 border-white hover:bg-transparent group">
        Learn More
        <ArrowRightIcon className="transition-all size-5 group-hover:translate-x-1" />
      </Button>

      <DollarSignIcon className="absolute top-0 hidden opacity-25 md:flex right-10 size-50" />
      <DollarSignIcon className="absolute hidden opacity-25 md:flex top-5 right-55 size-32" />

      <DollarSignIcon className="absolute top-0 hidden opacity-25 md:flex left-2 size-53" />
      <DollarSignIcon className="absolute top-0 hidden opacity-25 md:flex left-50 size-34" />
    </div>
  );
}
