"use client";

import { TextAnimate } from "@/components/magicui/text-animate";
import { BlurFade } from "@/components/magicui/blur-fade";

export function Hero() {
  return (
    <div className="w-full bg-gradient-to-br from-primary to-primary/70">
      <div className="container max-w-4xl px-6 py-24 mx-auto text-center">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 text-5xl font-bold tracking-tight sm:text-7xl">
          <TextAnimate
            animation="slideUp"
            by="word"
            className="text-white"
            once
            delay={0.15}
          >
            Why does saving money online feel so broken?
          </TextAnimate>
        </div>

        <BlurFade delay={0.35}>
          <p className="max-w-3xl mx-auto text-2xl font-bold text-white">
            Billions are earned from your purchases — but too often, you're left
            out of the loop. Mint was built to flip the script. No points. No
            confusion. Just real cashback, made refreshingly simple.
          </p>
        </BlurFade>
      </div>
    </div>
  );
}
