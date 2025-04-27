"use client";

import { TextAnimate } from "@/components/magicui/text-animate";
import { BlurFade } from "@/components/magicui/blur-fade";

export function Story() {
  return (
    <div className="py-24 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center">
          <TextAnimate
            animation="slideUp"
            by="word"
            className="text-3xl font-bold sm:text-4xl"
            delay={0.15}
            once
          >
            Cashback That Just Works
          </TextAnimate>

          <BlurFade delay={0.25} inView>
            <p className="max-w-2xl mx-auto mt-4 text-xl">
              We started Mint Cashback because we were tired of platforms that
              felt like black boxes: delays, point systems, and hoops to jump
              through. So we asked: what if cashback was rebuilt by people who
              actually use it? That idea became Mint Cashback — a simpler,
              smarter way to save.
            </p>
          </BlurFade>
        </div>
      </div>
    </div>
  );
}
