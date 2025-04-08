import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const extendedFaqItems = [
  {
    id: "0",
    question: "How does Mint make money?",
    answer: "Mint is free because we earn a commission from our partner stores when you make a purchase, and we share that with you as cashback.",
  },
  {
    id: "1",
    question: "How does Mint work?",
    answer: "Mint is a browser extension that automatically finds and applies cashback offers when you shop online. Just install the extension, shop as usual, and we'll handle the rest - finding deals and tracking your cashback.",
  },
  {
    id: "2",
    question: "Can I still use other discounts or student codes?",
    answer: "Absolutely. You can often stack Mint cashback with existing promo codes or student discounts. This means more savings for you!",
  },
  {
    id: "3",
    question: "How do you protect my data?",
    answer: "We use industry-standard encryption and never share or sell user data. Mint only tracks transactions on affiliate stores to confirm rewards. Your privacy and security are our top priorities.",
  },
  {
    id: "4",
    question: "What stores does Mint support?",
    answer: "We partner with thousands of top brands like Nike, Sephora, Adidas, and Apple. When you're on a supported store, Mint activates automatically. Our network is constantly growing!",
  },
  {
    id: "5",
    question: "Can I use Mint on my phone?",
    answer: "You can browse the site on mobile, but the extension works only on desktop browsers (for now). We're working on mobile solutions for the future.",
  },
  {
    id: "6",
    question: "How long does it take to get paid?",
    answer: "Most rewards are ready to withdraw within 3 days of store confirmation — way faster than other cashback tools that make you wait weeks or months.",
  },
  {
    id: "7",
    question: "What payment methods do you support?",
    answer: "We support various payment methods including PayPal, Venmo, and popular gift cards. You can choose what works best for you when you're ready to cash out.",
  },
  {
    id: "8",
    question: "Is there a minimum withdrawal amount?",
    answer: "Yes, the minimum withdrawal amount is $5. We keep it low so you can access your earnings faster and more frequently than other platforms.",
  },
  {
    id: "9",
    question: "How do I contact support?",
    answer: "You can reach our support team at support@mintcashback.com. We aim to respond to all inquiries within 24 hours during business days.",
  }
];

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-muted/5 py-16">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-secondary">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about using Mint
          </p>
        </div>

        <div className="bg-background rounded-xl p-6 shadow-sm">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {extendedFaqItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border rounded-lg px-4"
              >
                <AccordionTrigger className="text-lg font-semibold hover:no-underline cursor-pointer">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-md font-medium text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-8 text-muted-foreground">
          <p>Still have questions? Contact us at{" "}
            <a 
              href="mailto:support@mintcashback.com" 
              className="text-secondary hover:text-secondary/80 underline underline-offset-4"
            >
              support@mintcashback.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
} 