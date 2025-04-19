"use client";

import { TextAnimate } from "@/components/magicui/text-animate";
import { BlurFade } from "@/components/magicui/blur-fade";

const team = [
  {
    name: "Alexandros Lekkas",
    role: "University of Chicago"
  },
  {
    name: "Ashwin Balaraman",
    role: "University of Chicago"
  },
  {
    name: "Stelios Papapanagiotou",
    role: "Bentley University"
  }
];

const principles = [
  {
    title: "Transparency",
    description: "No more black boxes. See exactly how much you earn and why — every single time."
  },
  {
    title: "Simplicity",
    description: "Install once, earn forever. We handle the complex stuff while you shop normally."
  },
  {
    title: "Fairness",
    description: "A true 50/50 split on every deal. Your purchase, your earnings — shared fairly."
  },
  {
    title: "Privacy First",
    description: "Shop freely without being tracked. We only collect what's needed, nothing more."
  }
];

export default function About() {
  return (
    <div className="min-h-screen font-figtree">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-br from-primary to-primary/70">
        <div className="container mx-auto px-4 py-24 text-center">
          <div className="flex flex-wrap justify-center items-center gap-2 mb-6 text-5xl font-bold tracking-tight sm:text-7xl">
            <TextAnimate
              animation="slideUp"
              by="word"
              className="text-black"
              startOnView={false}
            >
              It started with one question:
            </TextAnimate>
            <TextAnimate
              animation="slideUp"
              by="word"
              className="text-white"
              startOnView={false}
            >
              "Why does saving money online feel so broken?"
            </TextAnimate>
          </div>

          <BlurFade delay={0.35}>
            <p className="text-xl font-bold text-white max-w-3xl mx-auto">
            Billions are earned from your purchases — yet you rarely see a fair share. We built Mint to change that. No points. No gimmicks. Just real cashback, finally done right.


            </p>
          </BlurFade>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <TextAnimate
              animation="slideUp"
              by="word"
              className="mb-4 text-3xl font-bold sm:text-4xl"
              delay={0.55}
              startOnView={true}
            >
              Most cashback platforms weren't built for you.
            </TextAnimate>

            <BlurFade delay={0.65}>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-12">
                We weren't looking to reinvent affiliate marketing — we were just trying to get our own cashback to work. But what we found instead was a system full of delays, vague points, and platforms that felt rigged against users. That frustration led to an idea: What if cashback was built by people who actually use it?
              </p>
            </BlurFade>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <TextAnimate
              animation="slideUp"
              by="word"
              className="mb-4 text-3xl font-bold sm:text-4xl"
              delay={0.55}
              startOnView={true}
            >
              So we flipped the model.
            </TextAnimate>

            <BlurFade delay={0.65}>
              <div className="max-w-3xl mx-auto">
                <p className="text-xl text-gray-600 mb-8">
                  We built Mint with one goal: put the user first.
                </p>
                <p className="text-xl text-gray-600 mb-8">
                  No VC agendas. No corporate shortcuts. Just a fair, transparent system where you get half — always.
                </p>
                <p className="text-xl text-gray-600">
                  We're not chasing hyper-growth or selling your data. We're building something sustainable, honest, and made to serve real people — not shareholders.
                </p>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <TextAnimate
              animation="slideUp"
              by="word"
              className="mb-4 text-3xl font-bold sm:text-4xl"
              delay={0.55}
              startOnView={true}
            >
              Meet the team
            </TextAnimate>

            <BlurFade delay={0.65}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
                {team.map((member) => (
                  <div 
                    key={member.name} 
                    className="group relative h-[400px] bg-[#39d992]/5 hover:bg-[#39d992]/10 rounded-[32px] p-6 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#39d992]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[32px]" />
                    <div className="absolute bottom-6 left-6 right-6 text-center">
                      <h3 className="text-xl font-medium text-[#39d992] mb-1">{member.name}</h3>
                      <p className="text-gray-600 text-base">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </BlurFade>
          </div>
        </div>
      </div>

      {/* Principles Section */}
      <div className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <TextAnimate
              animation="slideUp"
              by="word"
              className="mb-4 text-3xl font-bold sm:text-4xl"
              delay={0.55}
              startOnView={true}
            >
              Our non-negotiables
            </TextAnimate>

            <BlurFade delay={0.65}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 max-w-4xl mx-auto">
                {principles.map((principle) => (
                  <div 
                    key={principle.title} 
                    className="bg-white rounded-[32px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_32px_rgba(0,0,0,0.08)] transition-shadow"
                  >
                    <h3 className="text-xl font-medium text-[#39d992] mb-4">{principle.title}</h3>
                    <div className="h-[1px] w-8 bg-[#39d992]/20 mb-4 mx-auto"></div>
                    <p className="text-gray-600 text-lg">{principle.description}</p>
                  </div>
                ))}
              </div>
            </BlurFade>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <TextAnimate
              animation="slideUp"
              by="word"
              className="mb-4 text-3xl font-bold sm:text-4xl"
              delay={0.55}
              startOnView={true}
            >
              Redefining how people earn online.
            </TextAnimate>

            <BlurFade delay={0.65}>
              <div className="mt-12 max-w-3xl mx-auto">
                <p className="text-xl text-gray-600 mb-8">
                  We're not just building a cashback tool — we're building a shift in how value is shared.
                </p>
                <p className="text-xl text-gray-600 mb-8">
                  Our vision is simple: if brands profit from your purchase, you should too.
                </p>
                <p className="text-xl text-gray-600 mb-8">
                  We're here to make that the new normal.
                </p>
                <p className="text-xl text-gray-600">
                  Join us in creating a more transparent, rewarding future for online shopping.
                </p>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </div>
  );
}
