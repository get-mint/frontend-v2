import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

export default function About() {
  return (
    <article className="bg-background">
      {/* Step 1: The Core Insight */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-[#E6FFF6] rounded-3xl overflow-hidden">
          <div className="w-full text-secondary py-16 text-center px-16">
            <h1 className="text-5xl font-bold mb-6">Why does saving money online feel so unreliable?</h1>
            <p className="text-lg text-secondary/90">Over $35B is earned through affiliate links every year — yet most people never see a cent.</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4">
        {/* Step 2: Reframing the Obvious */}
        <section className="py-12 relative">
          <div className="flex flex-col items-center">
            <ChevronDown className="text-secondary/30 w-8 h-8 -mt-6 mb-12" />
            <div className="relative">
              <div className="bg-[#f5f5f5] rounded-[80px_80px_80px_80px] p-10 w-full text-center relative">
                <h2 className="text-3xl font-bold text-secondary mb-4">If you're the one making the purchase… why aren't you earning?</h2>
                <p className="text-lg text-muted-foreground">
                  This question led us to look more closely at how most online "rewards" actually work.
                </p>
              </div>
              {/* Thought bubble circles */}
              <div className="absolute -bottom-8 right-[30%] w-8 h-8 bg-[#f5f5f5] rounded-full"></div>
              <div className="absolute -bottom-16 right-[28%] w-6 h-6 bg-[#f5f5f5] rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Step 3: The System Behind the Scenes */}
        <section className="py-12 relative">
          <div className="flex flex-col items-center">
            <ChevronDown className="text-secondary/30 w-8 h-8 -mt-6 mb-12" />
            <div className="text-center">
              <h2 className="text-3xl font-bold text-secondary mb-4">It wasn't designed with the user in mind</h2>
              <p className="text-lg text-muted-foreground">
                Between hidden rules, inflated prices, and complex rewards systems, we found a pattern: these platforms were built to benefit companies — not consumers.
              </p>
            </div>
          </div>
        </section>

        {/* Step 4: A Different Approach */}
        <section className="py-12 relative">
          <div className="flex flex-col items-center">
            <ChevronDown className="text-secondary/30 w-8 h-8 -mt-6 mb-12" />
            <div className="text-center">
              <h2 className="text-3xl font-bold text-secondary mb-4">So, we flipped the model</h2>
              <p className="text-lg text-muted-foreground">
              Mint was built with a single principle: <span className="font-bold">transparency</span>. If a platform earns from your purchase, you should too. Our extension ensures users receive a fair share of affiliate earnings — automatically and effortlessly.

We created Mint as a small, independent team of tech-savvy users who were tired of watching big platforms keep all the affiliate revenue. We believed users deserve more — more transparency, more fairness, and more cash back for simply doing what they already do: shop online.

We're not backed by venture capital or owned by a giant corporation. We're product-obsessed, user-first, and building something we'd actually use ourselves — and already do.              </p>
            </div>
          </div>
        </section>

        {/* Step 5: Who We Are */}
        <section className="py-12 relative">
          <div className="flex flex-col items-center">
            <ChevronDown className="text-secondary/30 w-8 h-8 -mt-6 mb-12" />
            <div className="text-center">
              <h2 className="text-3xl font-bold text-secondary mb-4">A small team with a clear purpose</h2>
              <p className="text-lg text-muted-foreground mb-8">
                We're developers, students, and everyday shoppers — building a tool we wished existed. Independent, product-focused, and committed to simplicity and integrity.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        <section className="py-12 relative">
          <div className="flex flex-col items-center">
            <ChevronDown className="text-secondary/30 w-8 h-8 -mt-6 mb-12" />
            <div>
              <h2 className="text-3xl font-bold text-secondary mb-8 text-center">What Mint stands for</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-[#E6FFF6] to-[#D1FFE9] rounded-[2.5rem_1rem_2.5rem_1rem] p-10 group hover:shadow-lg transition-all duration-300">
                  <div className="text-center">
                    <h3 className="text-2xl font-semibold text-secondary mb-3">Transparency</h3>
                    <div className="h-1 w-16 bg-secondary/20 rounded-full mx-auto mb-4"></div>
                    <p className="text-lg text-secondary/80">
                      Clear, honest communication about how we operate and how you earn.
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#E6FFF6] to-[#D1FFE9] rounded-[2.5rem_1rem_2.5rem_1rem] p-10 group hover:shadow-lg transition-all duration-300">
                  <div className="text-center">
                    <h3 className="text-2xl font-semibold text-secondary mb-3">Simplicity</h3>
                    <div className="h-1 w-16 bg-secondary/20 rounded-full mx-auto mb-4"></div>
                    <p className="text-lg text-secondary/80">
                      A streamlined experience that works automatically in the background.
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#E6FFF6] to-[#D1FFE9] rounded-[2.5rem_1rem_2.5rem_1rem] p-10 group hover:shadow-lg transition-all duration-300">
                  <div className="text-center">
                    <h3 className="text-2xl font-semibold text-secondary mb-3">Fairness</h3>
                    <div className="h-1 w-16 bg-secondary/20 rounded-full mx-auto mb-4"></div>
                    <p className="text-lg text-secondary/80">
                      Equal distribution of earnings between platform and users.
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#E6FFF6] to-[#D1FFE9] rounded-[2.5rem_1rem_2.5rem_1rem] p-10 group hover:shadow-lg transition-all duration-300">
                  <div className="text-center">
                    <h3 className="text-2xl font-semibold text-secondary mb-3">Privacy First</h3>
                    <div className="h-1 w-16 bg-secondary/20 rounded-full mx-auto mb-4"></div>
                    <p className="text-lg text-secondary/80">
                      Your data remains yours, with no unnecessary tracking or sharing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step 7: Looking Ahead */}
        <section className="py-12 relative">
          <div className="flex flex-col items-center">
            <ChevronDown className="text-secondary/30 w-8 h-8 -mt-6 mb-12" />
            <div className="bg-secondary/5 rounded-3xl p-10 w-full text-center">
              <h2 className="text-3xl font-bold text-secondary mb-4">A platform built to grow with its users</h2>
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
