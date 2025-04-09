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

export default function About() {
  return (
    <div className="min-h-screen bg-muted/5">
      <div className="container max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-secondary">
            About Mint
          </h1>
          <p className="text-muted-foreground text-lg">
            Making cashback universal, automatic, and radically transparent.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-secondary mb-6">Who We Are</h2>
          <div className="space-y-4 text-muted-foreground max-w-2xl mx-auto text-center">
            <p className="text-lg">
              Mint was founded by three students who were tired of watching brands pocket billions in affiliate rewards that never reached consumers. So we built something better: a transparent cashback tool that gives you your fair share — automatically.
            </p>
            <p className="text-lg">
              But Mint is more than a browser extension. We're building a platform where transparency is standard — and where people always get their fair share.
            </p>
            <p className="text-lg">
              Born in dorm rooms at the University of Chicago and Bentley University, Mint is powered by students, shoppers, and builders who believe cashback shouldn't be a mystery. It should be effortless, honest, and built for everyone.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-secondary mb-6">Our Values</h2>
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-start max-w-md w-full">
                <span className="mr-4 text-2xl">💡</span>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-secondary">Clarity</h3>
                  <p className="text-muted-foreground">No gimmicks. No complicated reward rules. Just straightforward savings.</p>
                </div>
              </div>
              <div className="flex items-start max-w-md w-full">
                <span className="mr-4 text-2xl">🔐</span>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-secondary">Privacy</h3>
                  <p className="text-muted-foreground">Your data is yours. We never sell it. Period.</p>
                </div>
              </div>
              <div className="flex items-start max-w-md w-full">
                <span className="mr-4 text-2xl">💸</span>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-secondary">Fairness</h3>
                  <p className="text-muted-foreground">We split our earnings with you 50/50 — every time.</p>
                </div>
              </div>
              <div className="flex items-start max-w-md w-full">
                <span className="mr-4 text-2xl">📢</span>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-secondary">Transparency</h3>
                  <p className="text-muted-foreground">We show you exactly what we make and what you get. No hidden margins.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-secondary mb-6">Our Impact</h2>
          <div className="space-y-4 text-muted-foreground max-w-2xl mx-auto">
            <p className="text-lg">
              Over $1 billion in affiliate commissions go unclaimed each year — money that should go back into shoppers' pockets. Mint is here to change that.
            </p>
            <p className="text-lg">
              We automatically capture cashback that would otherwise be lost and return it to users — fairly and transparently. No buttons to press. No hoops to jump through. Just effortless earnings.
            </p>
            <p className="text-lg italic text-secondary">
              Mint is transforming how people think about shopping online — making cashback as seamless as the purchase itself.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-secondary mb-6">Meet the Founders</h2>
          <div className="space-y-4 max-w-2xl mx-auto">
            <p className="text-muted-foreground text-lg">
              Mint is proudly built by:
            </p>
            <div className="space-y-2">
              <p className="text-lg text-muted-foreground">[Founder 1 Full Name], University of Chicago</p>
              <p className="text-lg text-muted-foreground">[Founder 2 Full Name], Bentley University</p>
              <p className="text-lg text-muted-foreground">[Founder 3 Full Name], University of Chicago</p>
            </div>
            <p className="text-muted-foreground text-lg mt-4">
              What began as a dorm room idea is now a mission-driven company helping people everywhere earn more — by doing less.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
