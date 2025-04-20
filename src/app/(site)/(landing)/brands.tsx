import Link from "next/link";
import { BlurFade } from "@/components/magicui/blur-fade";
import { TextAnimate } from "@/components/magicui/text-animate";
import Brands from "../brands/brands";

export function Brands() {
  return (
    <div id="brands" className="bg-muted/30 py-24">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <TextAnimate
            animation="slideUp"
            by="word"
            className="mb-4 text-3xl font-bold sm:text-4xl"
            delay={0.15}
            once
          >
            Shop and Save at 50+ Top Brands
          </TextAnimate>

          <BlurFade delay={0.25}>
            <p className="text-lg sm:text-xl text-gray-600">
              From everyday essentials to luxury finds, earn cashback on all your favorite brands.
            </p>
          </BlurFade>
        </div>

        <Brands />

        <div className="text-center mt-8">
          <Link 
            href="/brands"
            className="text-primary hover:text-primary/90 font-medium inline-flex items-center gap-1 transition-colors"
          >
            View all brands →
          </Link>
        </div>
      </div>
    </div>
  );
} 