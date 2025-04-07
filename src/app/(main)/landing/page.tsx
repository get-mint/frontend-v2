import Link from "next/link";

import { brand } from "@/lib/constants/brand";

import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="w-full bg-primary/25">
      <div className="max-w-6xl mx-auto px-4 py-24 flex items-center gap-12 justify-between">
        <div className="max-w-2xl">
          <h1 className="text-7xl font-bold tracking-tight mb-4">
            It's your money,
            <br />
            we grab it for you
          </h1>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm w-md">
          <h2 className="text-3xl font-bold mb-4">Ready to start saving?</h2>
          <p className="text-xl text-gray-600 mb-2">Join 1202 others saving with mint</p>
          <p className="text-xl text-gray-600 mb-6">We've grabbed over $2m for users</p>
          
          <Button className="bg-secondary w-full text-lg py-6 rounded-full" asChild>
            <Link href="https://chrome.google.com/webstore" target="_blank">
              Install on Chrome
            </Link>
          </Button>

          <div className="flex items-center justify-center mt-4 text-gray-600">
            <span>★★★★★</span>
            <span className="ml-2 text-sm">141,786 Chrome Store reviews</span>
          </div>
        </div>
      </div>
    </div>
  );
}
