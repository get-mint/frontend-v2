import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

export default function About() {
  return (
    <article className="bg-background">
      {/* Step 1: The Core Insight */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-secondary rounded-3xl overflow-hidden">
          <div className="w-full text-white py-24 text-center px-16">
            <h1 className="text-5xl font-bold mb-6">Why does saving money online feel so unreliable?</h1>
            <p className="text-lg text-white/90">Over $35B is earned through affiliate links every year — yet most people never see a cent.</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4">
        {/* Step 2: Reframing the Obvious */}
        <section className="py-16 relative">
          <div className="flex flex-col items-center">
            <ChevronDown className="text-secondary/30 w-8 h-8 mb-8" />
            <div className="bg-secondary/5 rounded-3xl p-12 w-full">
              <h2 className="text-3xl font-bold text-secondary mb-6">If you're the one making the purchase… why aren't you earning?</h2>
              <p className="text-lg text-muted-foreground">
                This question led us to look more closely at how most online "rewards" actually work.
              </p>
            </div>
          </div>
        </section>

        {/* Step 3: The System Behind the Scenes */}
        <section className="py-16 relative">
          <div className="flex flex-col items-center">
            <ChevronDown className="text-secondary/30 w-8 h-8 mb-8" />
            <div>
              <h2 className="text-3xl font-bold text-secondary mb-6">It wasn't designed with the user in mind</h2>
              <p className="text-lg text-muted-foreground">
                Between hidden rules, inflated prices, and complex rewards systems, we found a pattern: these platforms were built to benefit companies — not consumers.
              </p>
            </div>
          </div>
        </section>

        {/* Step 4: A Different Approach */}
        <section className="py-16 relative">
          <div className="flex flex-col items-center">
            <ChevronDown className="text-secondary/30 w-8 h-8 mb-8" />
            <div>
              <h2 className="text-3xl font-bold text-secondary mb-6">We set out to design something better</h2>
              <p className="text-lg text-muted-foreground">
                Mint was built with a single principle: transparency. If a platform earns from your purchase, you should too. Our extension ensures users receive a fair share of the affiliate earnings — automatically and effortlessly.
              </p>
            </div>
          </div>
        </section>

        {/* Step 5: Who We Are */}
        <section className="py-16 relative">
          <div className="flex flex-col items-center">
            <ChevronDown className="text-secondary/30 w-8 h-8 mb-8" />
            <div>
              <h2 className="text-3xl font-bold text-secondary mb-6">A small team with a clear purpose</h2>
              <p className="text-lg text-muted-foreground mb-12">
                We're developers, students, and everyday shoppers — building a tool we wished existed. Independent, product-focused, and committed to simplicity and integrity.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#E6FFF6] to-[#D1FFE9] rounded-[2.5rem_1rem_2.5rem_1rem] group">
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-transparent opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-semibold text-xl text-secondary group-hover:text-white mb-2">Alexandros Lekkas</h3>
                    <p className="text-sm text-secondary/90 group-hover:text-white/90">University of Chicago</p>
                  </div>
                </div>

                <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#E6FFF6] to-[#D1FFE9] rounded-[2.5rem_1rem_2.5rem_1rem] group">
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-transparent opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-semibold text-xl text-secondary group-hover:text-white mb-2">Stelios Papapanagiotou</h3>
                    <p className="text-sm text-secondary/90 group-hover:text-white/90">Bentley University</p>
                  </div>
                </div>

                <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#E6FFF6] to-[#D1FFE9] rounded-[2.5rem_1rem_2.5rem_1rem] group">
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-transparent opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-semibold text-xl text-secondary group-hover:text-white mb-2">Ashwin Balamaran</h3>
                    <p className="text-sm text-secondary/90 group-hover:text-white/90">University of Chicago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step 6: Our Guiding Values */}
        <section className="py-16 relative">
          <div className="flex flex-col items-center">
            <ChevronDown className="text-secondary/30 w-8 h-8 mb-8" />
            <div>
              <h2 className="text-3xl font-bold text-secondary mb-12 text-center">What Mint stands for</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="border-2 border-secondary/10 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-secondary/5">
                  <CardContent className="pt-8 p-8">
                    <div className="mb-6">
                      <h3 className="text-2xl font-semibold text-secondary mb-3">Transparency</h3>
                      <div className="h-1 w-16 bg-secondary/20 rounded-full"></div>
                    </div>
                    <p className="text-lg text-muted-foreground">
                      Clear, honest communication about how we operate and how you earn.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-secondary/10 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-secondary/5">
                  <CardContent className="pt-8 p-8">
                    <div className="mb-6">
                      <h3 className="text-2xl font-semibold text-secondary mb-3">Simplicity</h3>
                      <div className="h-1 w-16 bg-secondary/20 rounded-full"></div>
                    </div>
                    <p className="text-lg text-muted-foreground">
                      A streamlined experience that works automatically in the background.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-secondary/10 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-secondary/5">
                  <CardContent className="pt-8 p-8">
                    <div className="mb-6">
                      <h3 className="text-2xl font-semibold text-secondary mb-3">Fairness</h3>
                      <div className="h-1 w-16 bg-secondary/20 rounded-full"></div>
                    </div>
                    <p className="text-lg text-muted-foreground">
                      Equal distribution of earnings between platform and users.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-secondary/10 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-secondary/5">
                  <CardContent className="pt-8 p-8">
                    <div className="mb-6">
                      <h3 className="text-2xl font-semibold text-secondary mb-3">Privacy First</h3>
                      <div className="h-1 w-16 bg-secondary/20 rounded-full"></div>
                    </div>
                    <p className="text-lg text-muted-foreground">
                      Your data remains yours, with no unnecessary tracking or sharing.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Step 7: Looking Ahead */}
        <section className="py-16 relative">
          <div className="flex flex-col items-center">
            <ChevronDown className="text-secondary/30 w-8 h-8 mb-8" />
            <div className="bg-secondary/5 rounded-3xl p-12 w-full">
              <h2 className="text-3xl font-bold text-secondary mb-6">A platform built to grow with its users</h2>
              <p className="text-lg text-muted-foreground">
                Mint is continually evolving — but our mission remains the same: to help people save more, with less friction, and more control.
              </p>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
