import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

const faqItems = [
  {
    id: "0",
    question: "Is Mint safe to use?",
    answer:
      "Yes. Mint does not collect personal data, sell your info, or track unrelated browsing. We only activate on supported stores to confirm purchases and issue your cashback. Privacy is non-negotiable.",
  },
  {
    id: "1",
    question: "Do I need to give you my credit card info?",
    answer:
      "No. Mint doesn't ask for or store your payment information. You shop directly on brand websites like normal — we just track eligible orders through affiliate links.",
  },
  {
    id: "2",
    question: "What's the catch? Is Mint really free?",
    answer:
      "Yes, Mint is 100% free. When you shop at a partnered store, the brand pays us a small commission. We split that with you — no fees, no subscriptions, and no hidden terms.",
  },
  {
    id: "3",
    question: "What if I don't get my cashback?",
    answer:
      "If something didn't track, contact us with your order details. We'll review it manually and help resolve it. Our goal is to make sure you always get what you earned.",
  },
  {
    id: "4",
    question: "Why should I trust Mint over other cashback tools?",
    answer:
      "Most platforms complicate rewards with points, delays, or vague payout terms. Mint is simple: real money, transparent earnings, and payouts in days — not months. We're here to save you money without the noise.",
  },
];

export default function FAQ() {
  return (
    <div className="bg-muted/55">
      <div className="container max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-secondary">
            Got Questions? We've Got Answers
          </h2>
          <p className="text-muted-foreground text-base">
            Find quick answers to common questions about Mint
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqItems.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="border rounded-lg px-4 bg-background"
            >
              <AccordionTrigger className="text-base font-semibold hover:no-underline cursor-pointer">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-sm font-medium">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-8">
          <p className="text-muted-foreground text-base">
            Still have doubts? Click{" "}
            <Link
              href="/info/company/faq"
              className="inline-block text-secondary hover:text-secondary/80 underline underline-offset-4 transition-colors"
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
