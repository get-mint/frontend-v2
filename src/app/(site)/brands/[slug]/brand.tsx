import { notFound } from "next/navigation";

import { fetchBrand } from "./data";
import { BlurFade } from "@/components/magicui/blur-fade";
import { TextAnimate } from "@/components/magicui/text-animate";

export async function Brand({ slug }: { slug: string }) {
  const brand = await fetchBrand(slug);

  if (!brand) {
    notFound();
  }

  return (
    <>
      <div
        style={{ backgroundColor: `${brand.brand_hex_color}` }}
        className="flex flex-col items-center justify-center gap-8 py-16"
      >
        <BlurFade>
          <img
            src={brand.image_url || "/images/placeholder.svg"}
            alt={brand.name}
            className="w-48 h-full"
          />
        </BlurFade>

        <TextAnimate
          animation="slideUp"
          by="word"
          className="max-w-xl text-5xl font-bold text-center text-white"
        >
          {`Earn up to ${brand.up_to_pct ?? "0"}% cashback on ${
            brand.name
          } with Mint`}
        </TextAnimate>
      </div>

      <div className="flex flex-col gap-12 px-6 py-6 mx-auto sm:flex-row max-w-7xl">
        <div className="w-3/5">
          <div className="flex flex-col gap-4">
            <TextAnimate
              animation="slideUp"
              by="line"
              delay={0.25}
              className="text-4xl font-bold"
            >
              {`What is ${brand.name}?`}
            </TextAnimate>

            <TextAnimate
              animation="blurIn"
              by="line"
              delay={0.35}
              className="text-lg"
            >
              {`${brand.description}`}
            </TextAnimate>
          </div>
        </div>

        <div className="flex flex-col w-2/5 gap-6">
          <BlurFade delay={0.55}>
            <div className="flex flex-col p-6 rounded-2xl bg-muted">
              asdasd
            </div>
            </BlurFade>

          <TextAnimate
            animation="slideUp"
            by="word"
            className="text-2xl font-bold"
            delay={0.65}
          >
            {`Want to Earn Cashback on ${brand.name}?`}
          </TextAnimate>
        </div>
      </div>
    </>
  );
}
