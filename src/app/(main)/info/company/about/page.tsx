import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <article className="bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section - More subtle and editorial */}
        <header className="max-w-3xl mx-auto mb-24">
          <h1 className="text-5xl font-bold text-secondary mb-8">About Us</h1>
          <div className="prose prose-lg">
            <p className="text-3xl font-medium text-secondary leading-snug mb-8">
              A Smarter Way to Save — Powered by People, Not Points.
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We're Mint — a cashback browser extension designed to make saving effortless and transparent. No gimmicks, no gamified points, no mystery. Just a clean 50/50 split on affiliate rewards, so when you shop online and we earn a commission, you get half. Real money, straight to you.
            </p>
          </div>
        </header>

        {/* The Team - More personal */}
        <section className="max-w-3xl mx-auto mb-24">
          <h2 className="text-3xl font-bold text-secondary mb-10">The Team</h2>
          <div className="prose prose-lg mb-12">
            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
              We're designers, developers, and everyday online shoppers.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              What we have in common? We care about building something useful, honest, and sustainable — something that works quietly in the background to put money back in your hands.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#E6FFF6] rounded-[2.5rem_1rem_2.5rem_1rem] group">
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-secondary/20 to-transparent opacity-75"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                <h3 className="font-semibold text-lg text-white mb-1">Alexandros Lekkas</h3>
                <p className="text-sm text-white/90">University of Chicago</p>
              </div>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden bg-[#E6FFF6] rounded-[2.5rem_1rem_2.5rem_1rem] group">
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-secondary/20 to-transparent opacity-75"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                <h3 className="font-semibold text-lg text-white mb-1">Ashwin Balamaran</h3>
                <p className="text-sm text-white/90">University of Chicago</p>
              </div>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden bg-[#E6FFF6] rounded-[2.5rem_1rem_2.5rem_1rem] group">
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-secondary/20 to-transparent opacity-75"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                <h3 className="font-semibold text-lg text-white mb-1">Stelios Papapanagiotou</h3>
                <p className="text-sm text-white/90">Bentley University</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story - More narrative and engaging */}
        <section className="max-w-3xl mx-auto mb-24">
          <h2 className="text-3xl font-bold text-secondary mb-10">Our Story</h2>
          <div className="prose prose-lg space-y-8">
            <div className="bg-muted/30 p-8 rounded-lg">
              <p className="text-2xl text-secondary font-medium italic mb-4">
                "Why does saving money online feel like a scam?"
              </p>
              <p className="text-lg text-muted-foreground">
                This question kept coming up in our conversations.
              </p>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Between fake discounts, sketchy coupon sites, and rewards platforms that overcomplicate everything, we realized the system just wasn't built for people — it was built for companies to win.
            </p>
            
            <p className="text-2xl font-medium text-secondary">
              So, we flipped the model.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Mint was created by a small team of tech-savvy friends who were tired of watching big platforms keep all the affiliate revenue. We believed that users deserve more — more transparency, more fairness, and more cash back for simply… doing what they already do: shopping online.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              We're not backed by venture capital or owned by a giant corporation. We're independent, product-obsessed, and building something we'd actually use ourselves — and already do.
            </p>
          </div>
        </section>

        {/* What We Stand For - Card-based layout */}
        <section className="max-w-4xl mx-auto mb-24">
          <h2 className="text-3xl font-bold text-secondary mb-12 text-center">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-2 border-secondary/10 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-semibold text-secondary mb-3">Transparency</h3>
                  <div className="h-1 w-16 bg-secondary/20 rounded-full"></div>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  You'll always know how much you're earning — and how we're earning too. No hidden agendas.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-secondary/10 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-semibold text-secondary mb-3">Simplicity</h3>
                  <div className="h-1 w-16 bg-secondary/20 rounded-full"></div>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Install the extension. Shop as usual. Earn automatically. That's it.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-secondary/10 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-semibold text-secondary mb-3">Fairness</h3>
                  <div className="h-1 w-16 bg-secondary/20 rounded-full"></div>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We split earnings 50/50. Always. No tiers. No bait-and-switch.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-secondary/10 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-semibold text-secondary mb-3">Privacy First</h3>
                  <div className="h-1 w-16 bg-secondary/20 rounded-full"></div>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Your data belongs to you. We'll never sell it or use it to track you around the internet.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Where We're Going - More vision-focused */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-secondary mb-10">Where We're Going</h2>
          <div className="prose prose-lg">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Mint is still growing — and we like it that way. Every feature we build is focused on one thing: helping people save without needing to change their habits. Whether you're ordering food, buying shoes, or booking flights, Mint works silently in the background — always on your side.
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}
