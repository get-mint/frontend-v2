"use client";

import { useState } from "react";
import * as Slider from "@radix-ui/react-slider";

export function Calculator() {
  const [spend, setSpend] = useState(500);
  
  // Calculate cashback and number of coffees
  const cashbackEarned = spend * 0.03; // Cashback earned = monthly spend × 0.03
  const numberOfCoffees = Math.floor(cashbackEarned / 4.5); // Number of coffees = cashback earned ÷ 4.5

  return (
    <div className="bg-gray-50 font-figtree">
      <div className="container max-w-3xl px-4 py-12 mx-auto">
        <div className="relative bg-white rounded-[32px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
          {/* Content */}
          <div>
            <h2 className="mb-8 text-3xl font-bold text-center">
              Small savings. Real impact.
            </h2>

            {/* Slider Label */}
            <p className="text-lg text-gray-600 text-center mb-6">
              How much do you spend online each month?
            </p>

            {/* Slider */}
            <div className="px-4 mb-6">
              <Slider.Root
                className="relative flex items-center select-none touch-none w-full h-5"
                defaultValue={[500]}
                max={1000}
                min={50}
                step={10}
                onValueChange={(value) => setSpend(value[0])}
              >
                <Slider.Track className="bg-gray-100 relative grow rounded-full h-1.5">
                  <Slider.Range className="absolute bg-[#39d992] rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb
                  className="block w-7 h-7 bg-white shadow-[0_2px_6px_rgba(57,217,146,0.12)] rounded-full border-2 border-[#39d992] focus:outline-none hover:shadow-[0_2px_8px_rgba(57,217,146,0.2)] transition-shadow"
                  aria-label="Spending amount"
                />
              </Slider.Root>
            </div>

            {/* Amount Display */}
            <div className="text-center mb-6">
              <div className="inline-block bg-[#39d992]/5 rounded-2xl px-6 py-2">
                <span className="text-2xl font-bold text-gray-900">${spend}</span>
              </div>
            </div>

            {/* Result */}
            <div className="text-center">
              <p className="text-xl text-gray-900 mb-1.5">
                That's <span className="text-[#39d992] font-bold">{numberOfCoffees} coffees</span> paid for by your cashback.
              </p>
              <p className="text-2xl font-bold text-gray-900 mb-1.5">
                That's the Mint effect.
              </p>
              <p className="text-sm text-gray-500">
                Based on average cashback rates of 3% and a $4.50 coffee
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 