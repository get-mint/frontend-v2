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
