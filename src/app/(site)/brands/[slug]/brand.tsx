import { notFound } from "next/navigation";
import Link from "next/link";

import { BlurFade } from "@/components/magicui/blur-fade";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { fetchBrand } from "./data";

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
            <div className="flex flex-col gap-4 p-6 rounded-2xl bg-muted">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Cashback Rate</h3>
                <p className="text-xl font-bold text-primary">
                  up to {brand.up_to_pct}% 💸
                </p>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Reward activation</h3>
                <p className="text-xl font-bold text-primary">1-click ⚡</p>
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={0.65}>
            <div className="flex flex-col items-end gap-3 p-6 border rounded-2xl">
              <TextAnimate
                animation="slideUp"
                by="word"
                className="text-2xl font-bold"
                delay={0.65}
              >
                {`Want to earn cashback on sites like ${brand.name}?`}
              </TextAnimate>

              <TextAnimate
                animation="slideUp"
                by="line"
                className="text-lg"
                delay={0.75}
              >
                Sign up for Mint and start earning cashback on your favorite
                brands.
              </TextAnimate>

              <BlurFade delay={0.75}>
                <Link href="/signup">
                  <Button className="px-8">Get Started</Button>
                </Link>
              </BlurFade>
            </div>
          </BlurFade>
        </div>
      </div>
    </>
  );
}
