"use client";

import { TextAnimate } from "@/components/magicui/text-animate";
import { BlurFade } from "@/components/magicui/blur-fade";

export function Hero() {
  return (
    <div className="w-full bg-gradient-to-br from-primary to-primary/70">
      <div className="container px-4 py-24 mx-auto text-center">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 text-5xl font-bold tracking-tight sm:text-7xl">
          <TextAnimate
            animation="slideUp"
            by="word"
            className="text-white"
            startOnView={false}
          >
            It started with one question:
          </TextAnimate>
          <TextAnimate
            animation="slideUp"
            by="word"
            className="text-white"
            startOnView={false}
          >
            "Why does saving money online feel so broken?"
          </TextAnimate>
        </div>

        <BlurFade delay={0.35}>
          <p className="max-w-3xl mx-auto text-xl font-bold text-white">
            Billions are earned from your purchases — yet you rarely see a fair
            share. We built Mint to change that. No points. No gimmicks. Just
            real cashback, finally done right.
          </p>
        </BlurFade>
      </div>
    </div>
  );
}
