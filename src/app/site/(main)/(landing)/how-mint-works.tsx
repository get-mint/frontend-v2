import Image from "next/image";

import { TextAnimate } from "@/components/magicui/text-animate";
import { BlurFade } from "@/components/magicui/blur-fade";

const steps = [
  {
    title: "1. Join for free",
    description:
      "Add Mint to your browser and sign up with your email. No forms, no hassle — just one click and you’re ready to start earning.",
    image: "/images/how-mint-works/1.png",
  },
  {
    title: "2. Start earning cash back",
    description:
      "Browse your favorite stores like you always do. When Mint spots a cashback offer, it’ll pop up and let you activate it instantly.",
    image: "/images/how-mint-works/2.png",
  },
  {
    title: "3. Redeem your cash back",
    description:
      "Watch your cashback pile up as you shop. When you’re ready to cash out, claim it however you like — PayPal, Venmo, or a gift card. You’re in control.",
    image: "/images/how-mint-works/3.png",
  },
];

export function HowMintWorks() {
  return (
    <div className="py-24">
      <div className="mb-8 text-center sm:mb-10">
        <TextAnimate
          animation="slideUp"
          by="word"
          className="mb-4 text-3xl font-bold sm:text-4xl"
          delay={0.15}
          once
        >
          Here's How Mint Works
        </TextAnimate>

        <BlurFade delay={0.25} inView>
          <p className="text-lg sm:text-xl">
            Get started in just{" "}
            <span className="font-bold text-primary">three simple steps</span>{" "}
            and start earning cashback today
          </p>
        </BlurFade>
      </div>

      <div className="flex flex-col items-center justify-center gap-8 px-4 mx-auto max-w-7xl lg:grid lg:grid-cols-3">
        {steps.map((step, index) => (
          <BlurFade key={step.title} delay={0.15 * index} inView>
            <div className="relative w-full h-56 overflow-hidden bg-gradient-to-t from-primary to-primary/70 rounded-2xl">
              <Image
                src={step.image}
                alt={step.title}
                fill
                className="object-contain p-4"
              />
            </div>

            <h3 className="mt-4 mb-1 text-xl font-bold leading-tight">
              {step.title}
            </h3>
            <p className="font-medium leading-tight text-muted-foreground">
              {step.description}
            </p>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}
