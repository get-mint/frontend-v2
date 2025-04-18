import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/magicui/blur-fade";
import { TextAnimate } from "@/components/magicui/text-animate";

export function Join() {
  return (
    <div className="bg-[#39d992]/5">
      <div className="container max-w-4xl px-4 py-24 mx-auto text-center">
        <TextAnimate
          animation="slideUp"
          by="word"
          className="mb-6 text-3xl font-bold sm:text-5xl"
          delay={0.55}
          startOnView={true}
        >
          Ready to start earning?
        </TextAnimate>

        <BlurFade delay={0.65}>
          <p className="mb-12 text-xl">
            Join thousands of smart shoppers who are earning real cash back with Mint.
            <br />No points, no complications — just money back in your pocket.
          </p>

          <Button size="lg" className="rounded-full px-8 py-6 text-lg" asChild>
            <Link href="https://chrome.google.com/webstore" target="_blank" className="flex items-center gap-2">
              Download Extension — It's Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </BlurFade>
      </div>
    </div>
  );
} 