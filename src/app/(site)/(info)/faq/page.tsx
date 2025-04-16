import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const extendedFaqItems = [
  {
    section: "Core Questions",
    items: [
      {
        id: "core-1",
        question: "Is Mint safe to use?",
        answer: "Yes, Mint is completely safe to use. We use industry-standard encryption, never store sensitive information, and our extension has limited permissions that only activate on shopping sites. We're transparent about our data practices and never sell user information.",
      },
      {
        id: "core-2",
        question: "Do I need to give you my credit card info?",
        answer: "No, you never need to provide your credit card information to Mint. We simply track your purchases through affiliate links and pay you your share of the commission - no financial information needed.",
      },
      {
        id: "core-3",
        question: "What's the catch? Is Mint really free?",
        answer: "Yes, Mint is completely free! There's no catch. We make money by earning commission from stores when you shop, and we split that commission with you 50/50. We never charge fees or hide costs.",
      },
      {
        id: "core-4",
        question: "What if I don't get my cashback?",
        answer: "While rare, if you don't receive your expected cashback, our support team is here to help. We can track your purchase and work with the store to ensure you get your rewards. Just reach out to support@mintcashback.com.",
      },
      {
        id: "core-5",
        question: "Why should I trust Mint over other cashback tools?",
        answer: "Mint is built differently - we're independent, transparent about how we make money, and focused on simplicity. We split earnings 50/50, have faster payouts, and don't overcomplicate the process with points or complex rules.",
      }
    ]
  },
  {
    section: "How It Works",
    items: [
      {
        id: "how-1",
        question: "How does Mint work?",
        answer: "Mint is a browser extension that automatically finds and applies cashback offers when you shop online. Just install the extension, shop as usual, and we'll handle the rest - finding deals and tracking your cashback.",
      },
      {
        id: "how-2",
        question: "What stores does Mint support?",
        answer: "We partner with thousands of top brands like Nike, Sephora, Adidas, and Apple. When you're on a supported store, Mint activates automatically. Our network is constantly growing!",
      },
      {
        id: "how-3",
        question: "Can I use Mint on my phone?",
        answer: "You can browse the site on mobile, but the extension works only on desktop browsers (for now). We're working on mobile solutions for the future.",
      }
    ]
  },
  {
    section: "Payments & Rewards",
    items: [
      {
        id: "pay-1",
        question: "How long does it take to get paid?",
        answer: "Most rewards are ready to withdraw within 3 days of store confirmation — way faster than other cashback tools that make you wait weeks or months.",
      },
      {
        id: "pay-2",
        question: "What payment methods do you support?",
        answer: "We support various payment methods including PayPal, Venmo, and popular gift cards. You can choose what works best for you when you're ready to cash out.",
      },
      {
        id: "pay-3",
        question: "Is there a minimum withdrawal amount?",
        answer: "Yes, the minimum withdrawal amount is $5. We keep it low so you can access your earnings faster and more frequently than other platforms.",
      }
    ]
  },
  {
    section: "Privacy & Support",
    items: [
      {
        id: "privacy-1",
        question: "How do you protect my data?",
        answer: "We use industry-standard encryption and never share or sell user data. Mint only tracks transactions on affiliate stores to confirm rewards. Your privacy and security are our top priorities.",
      },
      {
        id: "privacy-2",
        question: "How do I contact support?",
        answer: "You can reach our support team at support@mintcashback.com. We aim to respond to all inquiries within 24 hours during business days.",
      }
    ]
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

        <div className="grid gap-6">
          {extendedFaqItems.map((section) => (
            <div key={section.section} className="bg-white rounded-lg p-6 shadow-sm border">
              <h2 className="text-2xl font-semibold mb-6 text-secondary">{section.section}</h2>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {section.items.map((item) => (
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
          ))}
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