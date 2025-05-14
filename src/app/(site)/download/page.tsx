"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function DownloadPage() {
  return (
    <div className="container px-4 py-16 mx-auto max-w-7xl">
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-5xl font-bold">How Mint works</h1>
        <p className="text-xl text-muted-foreground">Get cashback from your favorite stores with just a few simple steps</p>
      </div>

      {/* Horizontal Steps */}
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
        {/* Step 1 */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center w-20 h-20 mb-6 text-4xl font-bold rounded-full bg-primary text-primary-foreground">
            1
          </div>
          <h2 className="mb-3 text-2xl font-bold">Install the extension</h2>
          <p className="mb-6 text-muted-foreground">Just one click & enter your email</p>
          <div className="w-full">
            <div className="relative overflow-hidden bg-gradient-to-t from-primary to-primary/70 rounded-2xl">
              <img
                src="/images/how-mint-works/1.png"
                alt="Install extension screenshot"
                className="object-contain w-full p-4 mx-auto"
              />
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center w-20 h-20 mb-6 text-4xl font-bold rounded-full bg-primary text-primary-foreground">
            2
          </div>
          <h2 className="mb-3 text-2xl font-bold">Claim cashback</h2>
          <p className="mb-6 text-muted-foreground">When Mint pops up on partnered websites</p>
          <div className="w-full">
            <div className="relative overflow-hidden bg-gradient-to-t from-primary to-primary/70 rounded-2xl">
              <img
                src="/images/how-mint-works/2.png"
                alt="Claim cashback screenshot"
                className="object-contain w-full p-4 mx-auto"
              />
            </div>
          </div>
        </div>

        {/* Step 3 (Combined) */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center w-20 h-20 mb-6 text-4xl font-bold rounded-full bg-primary text-primary-foreground">
            3
          </div>
          <h2 className="mb-3 text-2xl font-bold">Register & withdraw earnings</h2>
          <p className="mb-6 text-muted-foreground">Verify your email and track your cashback history</p>
          <div className="flex flex-col w-full gap-4">
            <div className="relative overflow-hidden bg-gradient-to-t from-primary to-primary/70 rounded-2xl">
              <img
                src="/images/how-mint-works/3.png"
                alt="Registration and cashback tracking"
                className="object-contain w-full p-4 mx-auto"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center mt-20">
        <h3 className="mb-8 text-3xl font-bold">Ready to start earning cashback?</h3>
        <Button size="lg" className="h-auto px-10 py-6 text-xl">
          <CheckCircle className="w-6 h-6 mr-2" />
          Download Mint Extension
        </Button>
        <p className="mt-4 text-muted-foreground">Available for Chrome, Firefox, and Edge browsers</p>
      </div>
    </div>
  );
}