"use client";

import { useAuth } from "@/lib/hooks/use-auth";

import { Button } from "@/components/ui/button";

import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export function BottomBanner() {
  const { selectedCurrency } = useAuth();

  return (
    <div className="grid grid-cols-1 gap-8 p-6 mt-16 sm:grid-cols-2 rounded-xl bg-muted">
      <div className="flex flex-col gap-3">
        <h2 className="text-3xl font-extrabold">
          Refer your friends and earn up to {selectedCurrency?.symbol}5
        </h2>

        <p className="text-lg font-bold text-muted-foreground">
          We match the cashback your friends earn on Mint Cashback up to their first {selectedCurrency?.symbol}5 and you get {selectedCurrency?.symbol}5 in return.
        </p>

        <Link href="/user/refer-and-earn" passHref>
          <Button variant="outline">
            Refer friends now
            <ArrowRightIcon />
          </Button>
        </Link>

        <div className="w-full p-6 mt-2 rounded-xl bg-gradient-to-br from-blue-300 to-blue-500">
          <h1 className="text-5xl font-extrabold leading-tight text-white">
            Refer friends and earn up to {selectedCurrency?.symbol}5 💰
          </h1>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-3xl font-extrabold">
          Install the Mint Cashback extension
        </h2>

        <p className="text-lg font-bold text-muted-foreground">
          Install the Mint Cashback extension and start earning cashback on your purchases, with just a click of a button.
        </p>

        <Link href="/download" passHref>
          <Button variant="outline">
            Install now
            <ArrowRightIcon />
          </Button>
        </Link>

        <div className="w-full p-6 mt-2 rounded-xl bg-gradient-to-tl from-pink-400 to-purple-500">
          <h1 className="text-5xl font-extrabold leading-tight text-white">
            Install the Mint Cashback extension 🔌
          </h1>
        </div>
      </div>
    </div>
  )
}