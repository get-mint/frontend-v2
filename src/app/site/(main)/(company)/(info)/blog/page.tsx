import { Suspense } from "react";
import { Metadata } from "next";

import { Separator } from "@/components/ui/separator";
import { Loader } from "@/components/ui/loader";
import { TextAnimate } from "@/components/magicui/text-animate";

import Posts from "./posts";

export const metadata: Metadata = {
  title: "Mint Cashback | Blog",
  description: "Mint Cashback's Blog",
};

export default function BlogPage() {
  return (
    <div className="px-6 py-6 mx-auto max-w-7xl">
      <TextAnimate
        animation="slideUp"
        by="line"
        className="text-5xl font-bold"
        startOnView={false}
      >
        Mint's Blog
      </TextAnimate>

      <Separator className="my-6" />

      <Suspense fallback={<Loader />}>
        <Posts />
      </Suspense>
    </div>
  );
}
