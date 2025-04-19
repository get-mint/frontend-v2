import { Check, X } from "lucide-react";

import { BlurFade } from "@/components/magicui/blur-fade";
import { TextAnimate } from "@/components/magicui/text-animate";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Feature {
  feature: string;
  description: string;
  mint: boolean;
  topcashback: boolean;
  rebatesme: boolean;
}

const features: Feature[] = [
  {
    feature: "Real cash, no points",
    description:
      "Get paid in real money directly, without any point system conversions",
    mint: true,
    topcashback: true,
    rebatesme: true,
  },
  {
    feature: "Low minimum payout",
    description: "Cash out your earnings with a low minimum threshold",
    mint: true,
    topcashback: true,
    rebatesme: false,
  },
  {
    feature: "Transparent 50/50 split",
    description: "We share half of what we earn with you, always",
    mint: true,
    topcashback: false,
    rebatesme: false,
  },
  {
    feature: "Simple, modern UI",
    description: "Clean, intuitive interface that's easy to use",
    mint: true,
    topcashback: false,
    rebatesme: false,
  },
  {
    feature: "Privacy-first design",
    description: "Your data stays private and secure",
    mint: true,
    topcashback: false,
    rebatesme: false,
  },
];

function ComparisonColumn({
  title,
  isHighlighted,
  features,
  index,
}: {
  title: string;
  isHighlighted?: boolean;
  features: Feature[];
  index: number;
}) {
  return (
    <BlurFade delay={0.15 + index * 0.1} inView>
      <div
        className={`bg-card border shadow-sm rounded-xl ${
          isHighlighted ? "border-2 border-primary md:-mt-4 relative" : ""
        }`}
      >
        {isHighlighted && (
          <div className="absolute hidden px-4 py-1 text-sm -translate-x-1/2 rounded-full -top-4 left-1/2 bg-primary text-primary-foreground md:block">
            Most Trusted
          </div>
        )}
        <div
          className={`p-4 md:p-6 text-center ${
            isHighlighted ? "bg-primary/5" : ""
          }`}
        >
          <h3 className="text-xl font-medium text-card-foreground">{title}</h3>
        </div>
        {features.map((item, featureIndex) => (
          <div
            key={item.feature}
            className="px-3 py-3 border-t md:px-4 md:py-4 border-border"
          >
            <div className="flex items-center justify-between gap-2 md:gap-4">
              <span className="text-sm text-card-foreground md:text-base">
                {item.feature}
              </span>
              {item[title.toLowerCase() as keyof Feature] ? (
                <Check className="flex-shrink-0 w-4 h-4 md:w-5 md:h-5 text-primary" />
              ) : (
                <X className="flex-shrink-0 w-4 h-4 md:w-5 md:h-5 text-destructive" />
              )}
            </div>
          </div>
        ))}
      </div>
    </BlurFade>
  );
}

export function Comparison() {
  return (
    <div className="bg-muted/45 font-figtree">
      <div className="container flex flex-col max-w-6xl gap-6 px-12 py-16 mx-auto sm:px-16 sm:gap-14 md:px-6 md:py-24">
        <div className="text-center">
          <TextAnimate
            animation="slideUp"
            by="word"
            className="mb-4 text-3xl font-bold sm:text-4xl"
            delay={0.15}
            once
          >
            Here's How Mint Works
          </TextAnimate>

          <BlurFade delay={0.25} inView>
            <p className="text-lg sm:text-xl">
              Get started in just{" "}
              <span className="font-bold text-primary">three simple steps</span>{" "}
              and start earning cashback today
            </p>
          </BlurFade>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          <ComparisonColumn title="Honey" features={features} index={0} />
          <ComparisonColumn
            title="Mint"
            isHighlighted
            features={features}
            index={1}
          />
          <ComparisonColumn title="TopCashback" features={features} index={2} />
        </div>
      </div>
    </div>
  );
}
