"use client";

import { useState } from "react";
import Image from "next/image";
import * as Slider from "@radix-ui/react-slider";

import { BlurFade } from "@/components/magicui/blur-fade";
import { TextAnimate } from "@/components/magicui/text-animate";

export function Calculator() {
  const [spend, setSpend] = useState(500);
  
  // Calculate cashback and coffee days
  const cashback = spend * 0.03; // 3% cashback
  const coffeeDays = Math.floor(cashback / 4.50); // $4.50 per coffee

  return (
    <div className="bg-gray-100 font-figtree">
      <div className="container max-w-4xl px-4 py-24 mx-auto">
        <div className="relative bg-white rounded-3xl p-8 sm:p-12 shadow-lg">
          {/* Logo */}
          <div className="absolute top-8 left-8">
            <Image
              src="/logo.svg"
              alt="Mint Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
          </div>

          {/* Content */}
          <div className="mt-16 sm:mt-8">
            <TextAnimate
              animation="slideUp"
              by="word"
              className="mb-12 text-2xl sm:text-3xl font-bold text-center"
              delay={0.55}
              startOnView={true}
            >
              Small savings. Real impact.
            </TextAnimate>

            <BlurFade delay={0.65}>
              <div className="space-y-8">
                {/* Slider Label */}
                <div className="text-center">
                  <p className="text-lg font-medium text-gray-600 mb-6">
                    How much do you spend online each month?
                  </p>
                </div>

                {/* Slider */}
                <div className="px-4">
                  <Slider.Root
                    className="relative flex items-center select-none touch-none w-full h-5"
                    defaultValue={[500]}
                    max={1000}
                    min={50}
                    step={10}
                    onValueChange={(value) => setSpend(value[0])}
                  >
                    <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                      <Slider.Range className="absolute bg-[#39d992] rounded-full h-full" />
                    </Slider.Track>
                    <Slider.Thumb
                      className="block w-6 h-6 bg-white shadow-lg rounded-full border-2 border-[#39d992] focus:outline-none focus:ring-2 focus:ring-[#39d992] focus:ring-offset-2"
                      aria-label="Spending amount"
                    />
                  </Slider.Root>
                </div>

                {/* Amount Display */}
                <div className="text-center">
                  <div className="inline-block bg-[#39d992]/5 rounded-full px-6 py-3 border border-[#39d992]/10">
                    <span className="text-2xl font-bold text-gray-900">${spend}</span>
                  </div>
                </div>

                {/* Result */}
                <div className="bg-gray-50 rounded-2xl p-6 text-center">
                  <p className="text-xl font-medium text-gray-900 mb-3">
                    That's <span className="text-[#39d992] font-bold">{coffeeDays} coffees</span> paid for by your cashback.
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mb-4">
                    That's the Mint effect.
                  </p>
                  <p className="text-sm text-gray-500">
                    Based on average cashback rates of 3% and a $4.50 coffee
                  </p>
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </div>
  );
} 