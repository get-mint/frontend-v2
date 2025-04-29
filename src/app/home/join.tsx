import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/magicui/blur-fade";
import { TextAnimate } from "@/components/magicui/text-animate";

export function Join() {
  return (
    <div className="bg-primary/10">
      <div className="container max-w-4xl px-4 py-16 mx-auto text-center sm:py-24">
        <TextAnimate
          animation="slideUp"
          by="word"
          className="mb-6 text-3xl font-semibold text-primary sm:text-4xl"
          delay={0.15}
          startOnView={true}
          once={true}
        >
          Ready to start earning?
        </TextAnimate>

        <BlurFade delay={0.15} inView={true}>
          <p className="mb-6 text-lg font-medium text-primary">
            Join thousands of smart shoppers who are earning real cash back with
            Mint.
            <br />
            No points, no complications — just money back in your pocket.
          </p>

          <Link href="/download" passHref>
            <Button
              size="lg"
              variant="ghost"
              className="px-8 py-6 text-lg transition-colors duration-200 bg-transparent border-2 rounded-full text-primary border-primary hover:text-primary hover:bg-transparent"
              asChild
            >
              <span className="flex items-center gap-2">
                Download Extension — It's Free
                <ArrowRight className="w-5 h-5 opacity-70" />
              </span>
            </Button>
          </Link>
        </BlurFade>
      </div>
    </div>
  );
}
