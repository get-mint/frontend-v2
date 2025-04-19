"use client";

import { TextAnimate } from "@/components/magicui/text-animate";
import { BlurFade } from "@/components/magicui/blur-fade";

export function AboutHero() {
  return (
    <div className="w-full bg-gradient-to-br from-primary to-primary/70">
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="flex flex-wrap justify-center items-center gap-2 mb-6 text-5xl font-bold tracking-tight sm:text-7xl">
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
          <p className="text-xl font-bold text-white max-w-3xl mx-auto">
            Billions are earned from your purchases — yet you rarely see a fair share. We built Mint to change that. No points. No gimmicks. Just real cashback, finally done right.
          </p>
        </BlurFade>
      </div>
    </div>
  );
} 