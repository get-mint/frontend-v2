"use client";

import { TextAnimate } from "@/components/magicui/text-animate";
import { BlurFade } from "@/components/magicui/blur-fade";

export function Story() {
  return (
    <div className="py-24 bg-white">
      <div className="container px-4 mx-auto">
        <div className="mb-16 text-center">
          <TextAnimate
            animation="slideUp"
            by="word"
            className="mb-3 text-3xl font-bold sm:text-4xl"
            delay={0.15}
            once
          >
            Most cashback platforms weren't built for you.
          </TextAnimate>

          <BlurFade delay={0.25} inView>
            <p className="max-w-2xl mx-auto mt-12 text-xl">
              We weren't looking to reinvent affiliate marketing — we were just
              trying to get our own cashback to work. But what we found instead
              was a system full of delays, vague points, and platforms that felt
              rigged against users. That frustration led to an idea: What if
              cashback was built by people who actually use it?
            </p>
          </BlurFade>
        </div>
      </div>
    </div>
  );
}
