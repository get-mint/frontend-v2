import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BlurFade } from "@/components/magicui/blur-fade";
import { TextAnimate } from "@/components/magicui/text-animate";

const items = [
  {
    question: "Is Mint safe to use?",
    answer:
      "Yes. Mint does not collect personal data, sell your info, or track unrelated browsing. We only activate on supported stores to confirm purchases and issue your cashback. Privacy is non-negotiable.",
  },
  {
    question: "Do I need to give you my credit card info?",
    answer:
      "No. Mint doesn't ask for or store your payment information. You shop directly on brand websites like normal — we just track eligible orders through affiliate links.",
  },
  {
    question: "What's the catch? Is Mint really free?",
    answer:
      "Yes, Mint is 100% free. When you shop at a partnered store, the brand pays us a small commission. We split that with you — no fees, no subscriptions, and no hidden terms.",
  },
  {
    question: "What if I don't get my cashback?",
    answer:
      "If something didn't track, contact us with your order details. We'll review it manually and help resolve it. Our goal is to make sure you always get what you earned.",
  },
  {
    question: "Why should I trust Mint over other cashback tools?",
    answer:
      "Most platforms complicate rewards with points, delays, or vague payout terms. Mint is simple: real money, transparent earnings, and payouts in days — not months. We're here to save you money without the noise.",
  },
];

export function Faq() {
  return (
    <div className="bg-muted/55">
      <div className="container max-w-6xl px-4 py-24 mx-auto">
        <div className="mb-8 text-center sm:mb-10">
          <h2 className="mb-4 text-2xl font-bold sm:text-4xl">
            Got Questions?
          </h2>

          <p className="text-lg">
            Get started in just{" "}
            <span className="font-bold text-primary">three simple steps</span>{" "}
            and start earning cashback today
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {items.map((item) => (
            <AccordionItem
              key={item.question}
              value={item.question}
              className="px-4 border rounded-lg bg-background"
            >
              <AccordionTrigger className="text-base font-semibold cursor-pointer hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-sm font-medium">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-8 text-center">
          <p className="text-base text-muted-foreground">
            Still have doubts? Click{" "}
            <Link
              href="/info/company/faq"
              className="inline-block underline transition-colors text-secondary hover:text-secondary/80 underline-offset-4"
            >
              here
            </Link>{" "}
            to explore our most common questions — quick, clear, and no fluff.
          </p>
        </div>
      </div>
    </div>
  );
}
