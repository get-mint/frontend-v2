import { Suspense } from "react";
import { Metadata } from "next";

import { Separator } from "@/components/ui/separator";
import { Loader } from "@/components/loader";

import Posts from "./posts";

export const metadata: Metadata = {
  title: "Mint Cashback | Blog",
  description: "Mint Cashback's Blog",
};

export default function BlogPage() {
  return (
    <div className="px-6 py-6 mx-auto max-w-7xl">
      <h1 className="text-5xl font-bold">Mint's Blog</h1>
      <Separator className="my-6" />

      <Suspense fallback={<Loader />}>
        <Posts />
      </Suspense>
    </div>
  );
}
