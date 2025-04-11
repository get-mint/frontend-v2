import Link from "next/link";

import { Button } from "@/components/ui/button";

export function About() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-16">
      <div className="flex flex-col items-center">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-secondary">
            About Mint
          </h2>
          <p className="text-muted-foreground text-lg">
            When we started Mint, we had one question.
          </p>
        </div>

        <div className="bg-muted max-w-2xl p-8 rounded-lg">
          <p className="text-2xl text-secondary font-medium italic mb-4">
            "Why does saving money online feel like a scam?"
          </p>
          <p className="text-lg text-muted-foreground">
            This question kept coming up in our conversations.
          </p>
        </div>

        <Link href="/info/company/about" passHref>
          <Button className="mt-8">Learn More</Button>
        </Link>
      </div>
    </div>
  );
}
