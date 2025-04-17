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
        answer: "Yes — your privacy is non-negotiable. Mint never collects personal data, sells your info, or tracks unrelated browsing. The extension only activates on supported stores to confirm purchases and issue cashback. We use industry-standard encryption, never store sensitive information, and keep our permissions limited to shopping sites. We're fully transparent and built with your safety in mind.",
      },
      {
        id: "core-2",
        question: "Do I need to give you my credit card info?",
        answer: "Nope — never. Mint doesn’t ask for or store your payment information. You shop directly on brand websites like usual. We simply track your eligible orders through affiliate links and give you your fair share of the commission — no credit card required.",
      },
      {
        id: "core-3",
        question: "What's the catch? Is Mint really free?",
        answer: "Yes — 100% free. There are no fees, no subscriptions, and no hidden terms. When you shop at a partnered store, the brand pays us a small commission — and we split it with you 50/50. That’s how you earn cash back, with zero cost to you.",
      },
      {
        id: "core-4",
        question: "What if I don't get my cashback?",
        answer: "It’s rare, but if something doesn’t track, we’ve got your back. Just email us at support@mintcashback.com with your order details. Our team will review it, work with the store if needed, and make sure you get the rewards you earned.",
      },
      {
        id: "core-5",
        question: "Why should I trust Mint over other cashback tools?",
        answer: "We finally decided it was time to make cashback right. Most platforms overcomplicate rewards with points, vague terms, and hidden catches. Mint is different — we built it to be transparent, trustworthy, and simple. We clearly show how everything works, split earnings 50/50, and never hide behind fine print. No tricks. Just real cash and a process you can trust.",
      }
    ]
  },
  {
    section: "How It Works",
    items: [
      {
        id: "how-1",
        question: "How does Mint work?",
        answer: "When you shop through Mint at a supported store, that brand pays us a small commission for referring you. We split that commission with you 50/50 — no points, no tricks, just real cash. Mint automatically pops up when cashback is available, so all you have to do is click and shop like normal. When you recieve your cashback, you can cash out to PayPal, Venmo, or gift cards.",
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
        answer: "Cashback typically becomes available 30 to 60 days after your purchase, depending on the store's return and verification policies. Once it’s approved, you can cash out instantly to PayPal, Venmo, or gift cards. We’ll always keep you updated on your cashback status — no surprises, no waiting games.",
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
                    <AccordionContent className="pb-4 text-lg font-medium">
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