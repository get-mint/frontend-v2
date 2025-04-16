import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

export default function About() {
  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-24 pb-32">
        <div className="max-w-[90rem] mx-auto">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-balance">
            <span className="text-[#39d992]">Why does saving money online feel so unreliable?</span>
          </h1>
          <p className="text-xl sm:text-2xl text-secondary/80 max-w-3xl mt-8">
            Over $35B is earned through affiliate links every year — yet most people never see a cent.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Thought Bubble Section */}
        <section className="py-16 relative">
          <div className="flex flex-col items-center">
            <ChevronDown className="text-secondary w-12 h-12 -mt-6 mb-12 animate-bounce" />
            <div className="relative w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-[3rem] blur-2xl transform -rotate-1"></div>
              <div className="bg-white rounded-[3rem] p-12 w-full text-center relative shadow-xl">
                <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-6">
                  If you're the one making the purchase… why aren't you earning?
                </h2>
                <p className="text-xl text-muted-foreground">
                  This question led us to look more closely at how most online "rewards" actually work.
                </p>
              </div>
              {/* Enhanced thought bubbles */}
              <div className="absolute -bottom-8 right-[30%] w-12 h-12 bg-white rounded-full shadow-lg"></div>
              <div className="absolute -bottom-16 right-[28%] w-8 h-8 bg-white rounded-full shadow-md"></div>
              <div className="absolute -bottom-22 right-[26%] w-6 h-6 bg-white rounded-full shadow-sm"></div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-16 relative">
          <div className="flex flex-col items-center">
            <ChevronDown className="text-secondary w-12 h-12 -mt-6 mb-12 animate-bounce" />
            <Card className="w-full bg-gradient-to-br from-white to-primary/5 shadow-xl">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-6">
                  It wasn't designed with the user in mind
                </h2>
                <p className="text-xl text-muted-foreground">
                  Between hidden rules, inflated prices, and complex rewards systems, we found a pattern: these platforms were built to benefit companies — not consumers.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-16 relative">
          <div className="flex flex-col items-center">
            <ChevronDown className="text-secondary w-12 h-12 -mt-6 mb-12 animate-bounce" />
            <Card className="w-full bg-gradient-to-br from-white to-primary/5 shadow-xl">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-6">
                  So, we flipped the model
                </h2>
                <p className="text-xl text-muted-foreground">
                  Mint was built with a single principle: <span className="font-bold text-secondary">transparency</span>. If a platform earns from your purchase, you should too. Our extension ensures users receive a fair share of affiliate earnings — automatically and effortlessly.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 relative">
          <div className="flex flex-col items-center">
            <ChevronDown className="text-secondary w-12 h-12 -mt-6 mb-12 animate-bounce" />
            <Card className="w-full bg-gradient-to-br from-white to-primary/5 shadow-xl">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-6">
                  A small team with a clear purpose
                </h2>
                <p className="text-xl text-muted-foreground">
                  We're developers, students, and everyday shoppers — building a tool we wished existed. Independent, product-focused, and committed to simplicity and integrity.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 relative">
          <div className="flex flex-col items-center">
            <ChevronDown className="text-secondary w-12 h-12 -mt-6 mb-12 animate-bounce" />
            <div className="w-full">
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-12 text-center">
                What Mint stands for
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Transparency",
                    description: "Clear, honest communication about how we operate and how you earn."
                  },
                  {
                    title: "Simplicity",
                    description: "A streamlined experience that works automatically in the background."
                  },
                  {
                    title: "Fairness",
                    description: "Equal distribution of earnings between platform and users."
                  },
                  {
                    title: "Privacy First",
                    description: "Your data remains yours, with no unnecessary tracking or sharing."
                  }
                ].map((value, index) => (
                  <div 
                    key={value.title}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2rem] blur-lg transform group-hover:scale-105 transition-transform duration-300"></div>
                    <div className="relative bg-white rounded-[2rem] p-10 text-center shadow-lg group-hover:transform group-hover:scale-[1.02] transition-all duration-300">
                      <h3 className="text-2xl font-bold text-secondary mb-4">{value.title}</h3>
                      <div className="h-1 w-16 bg-secondary/20 rounded-full mx-auto mb-6"></div>
                      <p className="text-lg text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-16 relative">
          <div className="flex flex-col items-center">
            <ChevronDown className="text-secondary w-12 h-12 -mt-6 mb-12 animate-bounce" />
            <div className="relative w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-[2rem] blur-2xl"></div>
              <Card className="relative bg-white/80 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-6">
                    A platform built to grow with its users
                  </h2>
                  <p className="text-xl text-muted-foreground">
                    Mint is continually evolving — but our mission remains the same: to help people save more, with less friction, and more control.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
