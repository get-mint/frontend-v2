import { Suspense } from "react";

import { Brand } from "./brand";
import { Loader } from "@/components/ui/loader";

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
