"use client";

import { TextAnimate } from "@/components/magicui/text-animate";
import { BlurFade } from "@/components/magicui/blur-fade";

const principles = [
  {
    title: "Transparency",
    description:
      "No more black boxes. See exactly how much you earn and why — every single time.",
  },
  {
    title: "Simplicity",
    description:
      "Install once, earn forever. We handle the complex stuff while you shop normally.",
  },
  {
    title: "Fairness",
    description:
      "A true 50/50 split on every deal. Your purchase, your earnings — shared fairly.",
  },
  {
    title: "Privacy First",
    description:
      "Shop freely without being tracked. We only collect what's needed, nothing more.",
  },
];

export function Principles() {
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
            Our non-negotiables
          </TextAnimate>

          <BlurFade delay={0.25} inView>
            <div className="grid max-w-4xl grid-cols-1 gap-6 mx-auto mt-16 md:grid-cols-2">
              {principles.map((principle) => (
                <div
                  key={principle.title}
                  className="bg-white rounded-[32px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_32px_rgba(0,0,0,0.08)] transition-shadow"
                >
                  <h3 className="mb-4 text-xl font-medium text-primary">
                    {principle.title}
                  </h3>
                  <div className="h-[1px] w-8 bg-primary/20 mb-4 mx-auto"></div>
                  <p className="text-lg text-gray-600">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </BlurFade>
        </div>
      </div>
    </div>
  );
}
