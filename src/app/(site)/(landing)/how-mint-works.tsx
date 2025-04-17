import Image from "next/image";

import { TextAnimate } from "@/components/magicui/text-animate";
import { BlurFade } from "@/components/magicui/blur-fade";

const steps = [
  {
    title: "1. Add Mint — it's 100% free",
    description:
      "Install the Mint extension in seconds. No fees, no gimmicks — just enter your email and you're in.",
    image: "/placeholder.svg",
  },
  {
    title: "2. Shop like normal, Mint does the work",
    description:
      "When you're on a supported store, Mint pops up automatically and applies cashback. You shop, Mint tracks — no extra clicks.",
    image: "/placeholder.svg",
  },
  {
    title: "3. Sit back and relax",
    description:
      "As you shop, your cashback adds up. When it’s ready, redeem it through Venmo, PayPal, or gift cards. No points. No Coupons. Just real money.",
    image: "/images/how-mint-works/3.png",
  },
];

export function HowMintWorks() {
  return (
    <div className="py-16">
      <div className="mb-8 text-center sm:mb-10">
        <TextAnimate
          animation="slideUp"
          by="word"
          className="mb-4 text-2xl font-bold sm:text-4xl"
          delay={0.55}
          startOnView={false}
        >
          Here's How Mint Works
        </TextAnimate>

        <BlurFade delay={0.65}>
          <p className="text-lg">
            Get started in just{" "}
            <span className="font-bold text-primary">three simple steps</span>{" "}
            and start earning cashback today
          </p>
        </BlurFade>
      </div>

      <div className="flex flex-col max-w-6xl gap-8 px-4 mx-auto sm:grid sm:grid-cols-3">
        {steps.map((step, index) => (
          <BlurFade key={step.title} delay={0.35 + 0.1 * index} inView>
            <div className="relative w-full h-64 overflow-hidden bg-gradient-to-t from-primary to-primary/70 rounded-2xl">
              <Image
                src={step.image}
                alt={step.title}
                fill
                className="object-cover"
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
