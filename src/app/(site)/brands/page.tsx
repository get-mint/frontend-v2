import { Suspense } from "react";
import { Metadata } from "next";

import { TextAnimate } from "@/components/magicui/text-animate";
import { Loader } from "@/components/loader";

import Brands from "./brands";

export const metadata: Metadata = {
  title: "Mint | Brands",
  description:
    "Mint automatically finds the best cashback offers for you on all of your favorite brands",
};

export default async function BrandsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = parseInt(searchParams.page || "1", 10);

  return (
    <>
      <div className="px-6 py-8 sm:py-20 bg-gradient-to-br from-primary to-primary/70 page-header">
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
          by="character"
          delay={0.35}
          className="mb-4 text-4xl font-bold brands-title"
        >
          Featured Brands
        </TextAnimate>

        <TextAnimate
          animation="blurIn"
          by="line"
          delay={0.5}
          className="mb-12 text-xl font-medium text-center"
        >
          Tap into the best cashback offers for you on all of your favorite
          brands
        </TextAnimate>

        <Suspense fallback={<Loader />}>
          <Brands page={currentPage} />
        </Suspense>
      </div>
    </>
  );
}
