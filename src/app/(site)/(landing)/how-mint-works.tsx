import Image from "next/image";

import { TextAnimate } from "@/components/magicui/text-animate";
import { BlurFade } from "@/components/magicui/blur-fade";

const steps = [
  {
    title: "1. Join for free",
    description:
      "Install Mint, enter your email, and start shopping. Mint will pop up whenever cashback is available.",
    image: "/placeholder.svg",
  },
  {
    title: "2. Start earning cash back",
    description:
      "Shop at your favorite stores and earn cash back. Mint is always on, so you'll never miss a deal.",
    image: "/placeholder.svg",
  },
  {
    title: "3. Redeem your cash back",
    description:
      "Redeem your cash back for rewards in the form of gift cards, PayPal, Venmo & more.",
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
          <BlurFade key={step.title} delay={0.65 + 0.1 * index}>
            <div className="relative w-full h-64 overflow-hidden bg-gradient-to-t from-primary to-primary/70 rounded-xl">
              <Image
                src={step.image}
                alt={step.title}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="mt-4 mb-1 text-xl font-semibold leading-tight">
              {step.title}
            </h3>
            <p className="leading-tight text-muted-foreground">
              {step.description}
            </p>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}
