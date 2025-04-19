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
          isHighlighted ? "border-2 border-primary -mt-4 relative" : ""
        }`}
      >
        {isHighlighted && (
          <div className="absolute px-4 py-1 text-sm -translate-x-1/2 rounded-full -top-4 left-1/2 bg-primary text-primary-foreground">
            Most Trusted
          </div>
        )}
        <div
          className={`p-6 text-center ${isHighlighted ? "bg-primary/5" : ""}`}
        >
          <h3 className="text-xl font-medium text-card-foreground">{title}</h3>
        </div>
        {features.map((item, featureIndex) => (
          <div key={item.feature} className="px-4 py-4 border-t border-border">
            <div className="flex items-center justify-between gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-card-foreground cursor-help">
                    {item.feature}
                  </span>
                </TooltipTrigger>
                <TooltipContent
                  className="border shadow-lg backdrop-blur-md bg-background/80 text-foreground"
                  sideOffset={4}
                >
                  <p className="text-xs leading-tight">{item.description}</p>
                </TooltipContent>
              </Tooltip>
              {item[title.toLowerCase() as keyof Feature] ? (
                <Check className="flex-shrink-0 w-5 h-5 text-primary" />
              ) : (
                <X className="flex-shrink-0 w-5 h-5 text-destructive" />
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
      <div className="container max-w-6xl px-4 py-24 mx-auto">
        <div className="mb-16 text-center sm:mb-20">
          <TextAnimate
            animation="slideUp"
            by="word"
            className="mb-6 text-3xl font-bold sm:text-4xl"
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

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
          <ComparisonColumn title="TopCashback" features={features} index={0} />
          <ComparisonColumn
            title="Mint"
            isHighlighted
            features={features}
            index={1}
          />
          <ComparisonColumn title="RebatesMe" features={features} index={2} />
        </div>
      </div>
    </div>
  );
}
