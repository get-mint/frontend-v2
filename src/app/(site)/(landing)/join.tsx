import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/magicui/blur-fade";
import { TextAnimate } from "@/components/magicui/text-animate";

export function Join() {
  return (
    <div className="bg-gradient-to-t from-primary to-primary/70">
      <div className="container max-w-4xl px-4 py-24 mx-auto text-center">
        <TextAnimate
          animation="slideUp"
          by="word"
          className="mb-6 text-3xl font-bold text-white sm:text-5xl"
          delay={0.15}
          startOnView={true}
        >
          Ready to start earning?
        </TextAnimate>

        <BlurFade delay={0.15} inView={true}>
          <p className="mb-8 text-xl font-semibold text-white">
            Join thousands of smart shoppers who are earning real cash back with
            Mint.
            <br />
            No points, no complications — just money back in your pocket.
          </p>

          <Link href="/download" passHref>
            <Button
              size="lg"
              variant="ghost"
              className="px-8 py-6 text-lg text-white bg-transparent border-2 border-white rounded-full hover:bg-transparent hover:text-white"
              asChild
            >
              <span className="flex items-center gap-2">
                Download Extension — It's Free
                <ArrowRight />
              </span>
            </Button>
          </Link>
        </BlurFade>
      </div>
    </div>
  );
}
