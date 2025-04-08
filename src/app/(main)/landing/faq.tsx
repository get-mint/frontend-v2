import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    id: "0",
    question: "How does Mint make money?",
    answer:
      "Mint is free because we earn a commission from our partner stores when you make a purchase, and we share that with you as cashback.",
  },
  {
    id: "1",
    question: "How does Mint work?",
    answer:
      "Mint is a browser extension that automatically finds and applies cashback offers when you shop online. Just install the extension, shop as usual, and we'll handle the rest - finding deals and tracking your cashback.",
  },
  {
    id: "2",
    question: "How do I get my cashback?",
    answer:
      "Once your cashback is confirmed (usually after the return period), you can redeem it through various methods including PayPal, Venmo, or gift cards. The minimum payout amount is $5.",
  },
  {
    id: "3",
    question: "How do I get started?",
    answer:
      "Just install the extension, shop as usual, and we'll handle the rest - finding deals and tracking your cashback.",
  },
  {
    id: "4",
    question: "Is Mint safe to use?",
    answer: "Yes! We don't track your personal browsing history or sell your data. Mint only activates on supported shopping sites to confirm eligible purchases.",
  },
  {
    id: "5",
    question: "Do I need to give you my credit card info?",
    answer: "Nope. We don't collect any payment details. All purchases happen directly through the stores you shop at.",
  },
  {
    id: "6",
    question: "Can I still use other discounts or student codes?",
    answer: "Absolutely. You can often stack Mint cashback with existing promo codes or student discounts.",
  },
  {
    id: "7",
    question: "How do you protect my data?",
    answer: "We use encryption and never share or sell user data. Mint only tracks transactions on affiliate stores to confirm rewards.",
  },
  {
    id: "8",
    question: "What stores does Mint support?",
    answer: "We partner with thousands of top brands like Nike, Sephora, Adidas, and Apple. When you're on a supported store, Mint activates automatically.",
  },
  {
    id: "9",
    question: "What's the catch? Is Mint really free?",
    answer: "Yes — Mint is 100% free. We make money through affiliate commissions, and we share half with you. No subscriptions, no fees.",
  },
  {
    id: "10",
    question: "Why should I trust Mint over other cashback tools?",
    answer: "We're built for simplicity and transparency — no fake points, confusing tiers, or slow payouts. Just real cashback, fast.",
  },
  {
    id: "11",
    question: "Can I use Mint on my phone?",
    answer: "You can browse the site on mobile, but the extension works only on desktop browsers (for now).",
  },
  {
    id: "12",
    question: "What if I don't get my cashback?",
    answer: "If you made a qualifying purchase but didn't get credit, reach out to support@mintcashback.com and we'll help fix it.",
  },
  {
    id: "13",
    question: "How long does it take to get paid?",
    answer: "Most rewards are ready to withdraw within 3 days of store confirmation — way faster than other cashback tools.",
  },
];

export function Faq() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-secondary">
          Still have doubts?
        </h2>
        <p className="text-muted-foreground text-lg">
          We've got you covered.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-3">
        {faqItems.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className="border rounded-lg px-4"
          >
            <AccordionTrigger className="text-lg font-semibold hover:no-underline cursor-pointer">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-md font-medium">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
