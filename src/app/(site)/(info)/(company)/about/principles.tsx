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
    <div className="py-24 bg-muted/45">
      <div className="container px-4 mx-auto">
        <div className="text-center">
          <TextAnimate
            animation="slideUp"
            by="line"
            className="mb-10 text-3xl font-bold sm:text-4xl"
            delay={0.15}
            once
          >
            Our Non-Negotiable Principles
          </TextAnimate>

          <BlurFade delay={0.25} inView>
            <div className="grid max-w-5xl grid-cols-1 gap-6 mx-auto md:grid-cols-2">
              {principles.map((principle) => (
                <div
                  key={principle.title}
                  className="p-8 bg-white shadow-md rounded-xl"
                >
                  <h3 className="mb-4 text-2xl font-bold text-primary">
                    {principle.title}
                  </h3>
                  <p className="text-xl">{principle.description}</p>
                </div>
              ))}
            </div>
          </BlurFade>
        </div>
      </div>
    </div>
  );
}
