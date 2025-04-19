"use client";

import { TextAnimate } from "@/components/magicui/text-animate";
import { BlurFade } from "@/components/magicui/blur-fade";

export function Vision() {
  return (
    <div className="py-24 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center">
          <TextAnimate
            animation="slideUp"
            by="word"
            className="mb-4 text-3xl font-bold sm:text-4xl"
            delay={0.15}
            once
          >
            Redefining how people earn online.
          </TextAnimate>

          <BlurFade delay={0.25} inView>
            <div className="max-w-3xl mx-auto mt-12">
              <p className="mb-8 text-xl text-gray-600">
                We're not just building a cashback tool — we're building a shift
                in how value is shared.
              </p>
              <p className="mb-8 text-xl text-gray-600">
                Our vision is simple: if brands profit from your purchase, you
                should too.
              </p>
              <p className="mb-8 text-xl text-gray-600">
                We're here to make that the new normal.
              </p>
              <p className="text-xl text-gray-600">
                Join us in creating a more transparent, rewarding future for
                online shopping.
              </p>
            </div>
          </BlurFade>
        </div>
      </div>
    </div>
  );
}
