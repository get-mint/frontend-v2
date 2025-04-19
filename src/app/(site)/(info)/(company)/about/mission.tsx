"use client";

import { TextAnimate } from "@/components/magicui/text-animate";
import { BlurFade } from "@/components/magicui/blur-fade";

export function Mission() {
  return (
    <div className="py-24 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="mb-16 text-center">
          <TextAnimate
            animation="slideUp"
            by="word"
            className="mb-4 text-3xl font-bold sm:text-4xl"
            delay={0.15}
            once
          >
            So we flipped the model.
          </TextAnimate>

          <BlurFade delay={0.25} inView>
            <div className="max-w-3xl mx-auto">
              <p className="mb-8 text-xl text-gray-600">
                We built Mint with one goal: put the user first.
              </p>
              <p className="mb-8 text-xl text-gray-600">
                No VC agendas. No corporate shortcuts. Just a fair, transparent
                system where you get half — always.
              </p>
              <p className="text-xl text-gray-600">
                We're not chasing hyper-growth or selling your data. We're
                building something sustainable, honest, and made to serve real
                people — not shareholders.
              </p>
            </div>
          </BlurFade>
        </div>
      </div>
    </div>
  );
}
