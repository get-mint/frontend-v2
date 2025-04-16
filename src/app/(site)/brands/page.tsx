import { Metadata } from "next";

import { TextAnimate } from "@/components/magicui/text-animate";

export const metadata: Metadata = {
  title: "Mint | Brands",
  description:
    "Mint automatically finds the best cashback offers for you on all of your favorite brands",
};

export default async function BrandsPage() {
  return (
    <>
      <div className="px-6 py-8 sm:py-20 bg-gradient-to-b from-primary to-primary/70">
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
