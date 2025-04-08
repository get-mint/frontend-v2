import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/*
FAQ - Common questions before registration
Is your hosting really free?
How long does it takes to setup my account?
For how long is the free hosting valid?
Why do you provide free hosting?
Can I get a free subdomain?
Can I host my own domains?
Will you put ads on my site?
Is InfinityFree a demo, trial or sample for premium hosting?
*/

const faqItems = [
  {
    id: "1",
    question: "How does Mint work?",
    answer:
      "Mint is a browser extension that automatically finds and applies cashback offers when you shop online. Just install the extension, shop as usual, and we'll handle the rest - finding deals and tracking your cashback.",
  },
  {
    id: "2",
    question: "Is Mint really free?",
    answer:
      "Yes, Mint is completely free to use! We earn a commission from our partner stores when you make a purchase, and we share that with you as cashback. There are no hidden fees or subscriptions.",
  },
  {
    id: "3",
    question: "How do I get my cashback?",
    answer:
      "Once your cashback is confirmed (usually after the return period), you can redeem it through various methods including PayPal, Venmo, or gift cards. The minimum payout amount is $10.",
  },
  {
    id: "4",
    question: "Which stores work with Mint?",
    answer:
      "We partner with thousands of popular stores including Amazon, Walmart, Target, and many more. Our extension will automatically notify you when cashback is available at your favorite stores.",
  },
  {
    id: "5",
    question: "Is my data safe with Mint?",
    answer:
      "Absolutely. We take your privacy seriously. We only track your shopping activity to find cashback opportunities and never sell your personal information. You can read more in our Privacy Policy.",
  },
];

export function Faq() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-2xl sm:text-3xl font-bold text-left mb-2 text-secondary">
        Still have doubts?
      </h2>
      <p className="text-muted-foreground text-lg text-left mb-6">
        We've got you covered.
      </p>

      <Accordion type="single" collapsible className="w-full space-y-3">
        {faqItems.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className="border rounded-lg px-4"
          >
            <AccordionTrigger className="text-lg font-semibold hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
