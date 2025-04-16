import { Metadata } from "next";

import { ArrowRightIcon } from "lucide-react";

import { TextAnimate } from "@/components/magicui/text-animate";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/magicui/blur-fade";

export const metadata: Metadata = {
  title: "Mint | Brands",
  description:
    "Mint automatically finds the best cashback offers for you on all of your favorite brands",
};

export default async function BrandsPage() {
  return (
    <>
      <div className="px-6 py-8 sm:py-20 bg-primary">
        <div className="flex flex-col items-center gap-4 sm:gap-8">
          <TextAnimate
            animation="slideUp"
            by="word"
            className="max-w-full text-5xl font-bold text-center text-white sm:max-w-3xl sm:text-6xl"
          >
            Earn cashback every time you shop — automatically!
          </TextAnimate>

          <TextAnimate
            animation="blurIn"
            by="line"
            delay={0.25}
            className="max-w-xl text-xl font-medium text-center text-white"
          >
            Mint automatically finds the best cashback offers for you on all of
            your favorite brands, so you don't have to.
          </TextAnimate>

          <BlurFade delay={0.5}>
            <Button className="border-2 border-white group animate-in">
              Discover Brands{" "}
              <ArrowRightIcon className="transition-transform group-hover:translate-x-0.5" />
            </Button>
          </BlurFade>
        </div>
      </div>

      <div className="flex flex-col items-center px-6 py-12 mx-auto max-w-7xl">
        <TextAnimate
          animation="slideUp"
          by="line"
          delay={0.25}
          className="text-3xl font-bold"
        >
          Featured Brands
        </TextAnimate>
      </div>
    </>
  );
}
