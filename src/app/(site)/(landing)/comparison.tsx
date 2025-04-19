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
}: {
  title: string;
  isHighlighted?: boolean;
  features: Feature[];
}) {
  return (
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
      <div className={`p-8 text-center ${isHighlighted ? "bg-primary/5" : ""}`}>
        <h3 className="text-xl font-medium text-card-foreground">{title}</h3>
      </div>
      {features.map((item) => (
        <div key={item.feature} className="px-8 py-4 border-t border-border">
          <div className="flex items-center justify-between gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-card-foreground cursor-help">
                  {item.feature}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs leading-tight">{item.description}</p>
              </TooltipContent>
            </Tooltip>
            {item[title.toLowerCase() as keyof Feature] ? (
              <Check className="w-5 h-5 text-primary" />
            ) : (
              <X className="w-5 h-5 text-destructive" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Comparison() {
  return (
    <div className="bg-muted font-figtree">
      <div className="container max-w-6xl px-4 py-24 mx-auto">
        <div className="mb-8 text-center sm:mb-10">
          <TextAnimate
            animation="slideUp"
            by="word"
            className="mb-4 text-3xl font-bold sm:text-4xl"
            delay={0.15}
            startOnView={true}
          >
            Here's How Mint Works
          </TextAnimate>

          <BlurFade delay={0.15} inView={true}>
            <p className="text-lg sm:text-xl">
              Get started in just{" "}
              <span className="font-bold text-primary">three simple steps</span>{" "}
              and start earning cashback today
            </p>
          </BlurFade>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <ComparisonColumn title="TopCashback" features={features} />
          <ComparisonColumn title="Mint" isHighlighted features={features} />
          <ComparisonColumn title="RebatesMe" features={features} />
        </div>
      </div>
    </div>
  );
}
