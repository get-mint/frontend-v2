"use client";

import { TextAnimate } from "@/components/magicui/text-animate";
import { BlurFade } from "@/components/magicui/blur-fade";

export function AboutStory() {
  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <TextAnimate
            animation="slideUp"
            by="word"
            className="mb-4 text-3xl font-bold sm:text-4xl"
            delay={0.15}
            once
          >
            Most cashback platforms weren't built for you.
          </TextAnimate>

          <BlurFade delay={0.25} inView>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-12">
              We weren't looking to reinvent affiliate marketing — we were just trying to get our own cashback to work. But what we found instead was a system full of delays, vague points, and platforms that felt rigged against users. That frustration led to an idea: What if cashback was built by people who actually use it?
            </p>
          </BlurFade>
        </div>
      </div>
    </div>
  );
} 