"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BlurFade } from "@/components/magicui/blur-fade";
import { TextAnimate } from "@/components/magicui/text-animate";

export function Hero() {
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        "Sephora haul.",
        "travel plans.",
        "everyday essentials.",
        "latest tech upgrade.",
        "new outfit drop.",
        "spontaneous weekend trip."
      ],
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 1500,
      loop: true,
      showCursor: false
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="w-full bg-gradient-to-br from-primary to-primary/70">
      <div className="flex flex-col items-center justify-between gap-6 px-6 py-10 mx-auto max-w-7xl sm:py-32 sm:flex-row sm:gap-12">
        <div className="max-w-xl text-left">
          <TextAnimate
            animation="slideUp"
            by="word"
            className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-7xl"
            startOnView={false}
          >
            Cashback, finally done right
          </TextAnimate>

          <BlurFade delay={0.35}>
            <h2 className="hero-subheading text-[1.5rem] font-medium text-white mt-4">
              Get rewarded for your... <span ref={typedRef} className="inline-block whitespace-nowrap text-black" />
            </h2>
          </BlurFade>
        </div>

        <BlurFade delay={0.1}>
          <Card className="p-8 bg-white rounded-3xl w-sm sm:w-lg">
            <CardContent className="justify-center p-0">
              <h2 className="mb-2 text-2xl font-bold sm:text-4xl">
                Join the Mint movement
              </h2>

              <p className="mb-5 font-semibold sm:text-lg">
              Save money where it matters — without changing how you shop. Click below to get started in seconds.
              </p>

              <Button className="w-full py-6 text-lg rounded-full" asChild>
                <Link href="https://chrome.google.com/webstore" target="_blank">
                  Download Extension — It's Free
                </Link>
              </Button>
            </CardContent>
          </Card>
        </BlurFade>
      </div>
    </div>
  );
}
