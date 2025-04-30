import { Suspense } from "react";

import { Loader } from "@/components/ui/loader";

import { Brand } from "./brand";

export default async function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center w-full h-[80vh]">
          <Loader className="size-16 text-primary" />
        </div>
      }
    >
      <Brand slug={slug} />
    </Suspense>
  );
}
