import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const aboutSections = [
  {
    id: "who-we-are",
    title: "Who we are",
    content: [
      {
        id: "our-story",
        question: "Our Story",
        answer: "We started Mint with a simple mission: make earning cashback effortless. Born from the frustration of complicated reward programs, we built what we wished existed — a straightforward way to save money while shopping online.",
      },
      {
        id: "our-values",
        question: "Our Values",
        answer: "Transparency, simplicity, and trust are at our core. We believe saving money shouldn't require a manual or a calculator. That's why we keep everything clear: real cash, not points, and straightforward terms anyone can understand.",
      },
      {
        id: "our-team",
        question: "Our Team",
        answer: "We're a team of shoppers, savers, and tech enthusiasts who believe everyone deserves to get the most value from their purchases. Together, we're building the most user-friendly cashback platform.",
      },
    ],
  },
  {
    id: "how-we-work",
    title: "How we work",
    content: [
      {
        id: "our-technology",
        question: "Our Technology",
        answer: "Our browser extension uses smart technology to automatically find and apply the best cashback rates. No copying codes, no checking multiple sites — just instant savings while you shop normally.",
      },
      {
        id: "our-partnerships",
        question: "Our Partnerships",
        answer: "We partner directly with thousands of top brands to negotiate the best cashback rates. When brands pay us a commission for sending shoppers their way, we share that commission with you as cashback.",
      },
      {
        id: "our-process",
        question: "Our Process",
        answer: "Everything happens automatically in the background. Shop as usual, and we'll track your eligible purchases, confirm them with retailers, and process your cashback — typically within just 3 days.",
      },
    ],
  },
  {
    id: "our-impact",
    title: "Our impact",
    content: [
      {
        id: "customer-savings",
        question: "Customer Savings",
        answer: "Our users have earned millions in cashback, with average savings of $300 annually. We're proud to help people save on everything from everyday essentials to special purchases.",
      },
      {
        id: "retail-innovation",
        question: "Retail Innovation",
        answer: "We're reshaping how people shop online by making cashback seamless and automatic. Our platform helps retailers connect with savvy shoppers while providing real value to customers.",
      },
      {
        id: "future-goals",
        question: "Future Goals",
        answer: "We're constantly expanding our network of partner stores and developing new features to make saving even easier. Our vision is to make Mint the standard way people shop online.",
      },
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-muted/5">
      <div className="container max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-secondary">
            About Mint
          </h1>
          <p className="text-muted-foreground text-lg">
            Making cashback universal, simple, and automatic
          </p>
        </div>

        <div className="space-y-16">
          {/* Who We Are Section */}
          <section className="bg-background rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-secondary mb-6">Who We Are</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground text-lg leading-relaxed">
                Founded by three graduates from the <span className="text-[#800000] font-medium">University of Chicago</span> and <span className="text-[#003478] font-medium">Bentley University</span>, Mint emerged from a shared frustration with complicated reward systems and a vision for something better.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We're a tech-focused, design-driven team obsessed with making cashback accessible to everyone. As online shoppers ourselves, we wanted a tool that would work seamlessly in the background — no complex rules, no points systems, just straightforward savings. So we built exactly what we wanted to use ourselves.
              </p>
            </div>
          </section>

          {/* Our Mission Section */}
          <section className="bg-background rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-secondary mb-6">Our Mission</h2>
            <div className="space-y-4">
              <p className="text-xl font-semibold text-secondary">
                To make cashback universal.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We believe everyone should benefit from cashback rewards, regardless of their shopping habits or technical expertise. No more clipping coupons, hunting for promo codes, or navigating complex reward systems.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Our vision is a world where earning cashback is as natural as making the purchase itself — completely automatic and universally accessible.
              </p>
            </div>
          </section>

          {/* Our Impact Section */}
          <section className="bg-background rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-secondary mb-6">Our Impact</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground text-lg leading-relaxed">
                Over $1 billion in affiliate rewards goes unclaimed annually — money that should be back in shoppers' pockets. At Mint, we're changing this reality by automatically capturing these rewards and returning them to our users.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Every time you shop online, there's potential for savings. Our technology works silently in the background to ensure you never miss out on cashback opportunities, transforming the way people think about online shopping rewards.
              </p>
              <div className="mt-6 bg-muted/10 rounded-lg p-6">
                <p className="text-secondary font-semibold">
                  We're building the future of shopping rewards — one where everyone gets their fair share, automatically.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

