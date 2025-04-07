"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { LogoBanner } from "./logo-banner";

export default function LandingPage() {
  const [browser, setBrowser] = useState<"chrome" | "edge" | "other">("other");

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes("edg")) {
      setBrowser("edge");
    } else if (userAgent.includes("chrome")) {
      setBrowser("chrome");
    }
  }, []);

  const getButtonText = () => {
    switch (browser) {
      case "chrome":
        return "Add to Chrome — It's Free";
      case "edge":
        return "Add to Edge — It's Free";
      default:
        return "Download Extension — It's Free";
    }
  };

  return (
    <>
      <div className="w-full bg-primary/40">
        <div className="max-w-6xl mx-auto px-4 py-24 flex items-center gap-12 justify-between">
          <div className="max-w-xl">
            <p className="text-2xl font-extrabold text-secondary">Mint</p>

            <h1 className="text-7xl font-bold tracking-tight mb-3">
              It's your money,
              <br />
              we grab it for you
            </h1>

            <p className="text-xl text-secondary font-bold">
              Get Cash Back at 100+ stores, thousands of restaurants, on travel
              bookings and even more. Join and watch your Cash Back add up.
            </p>
          </div>

          <Card className="bg-white rounded-3xl p-8 shadow-lg w-md">
            <CardContent className="p-0 justify-center">
              <h2 className="text-4xl font-bold mb-2">
                Ready to start saving?
              </h2>
              <p className="text-lg font-semibold mb-4">
                We've already helped our community earn{" "}
                <span className="text-secondary underline font-bold">$2M+</span>{" "}
                in cash back, with over{" "}
                <span className="text-secondary underline font-bold">
                  1,000+
                </span>{" "}
                happy users and growing every day! 💸
              </p>

              <Button
                className="w-full text-lg py-6 rounded-full"
                variant="secondary"
                asChild
              >
                <Link href="https://chrome.google.com/webstore" target="_blank">
                  {getButtonText()}
                </Link>
              </Button>

              <div className="flex items-center justify-center w-full mt-4">
                <div className="flex">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </div>
                <span className="ml-2 text-sm">100+ Chrome Store reviews</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <LogoBanner />
    </>
  );
}
