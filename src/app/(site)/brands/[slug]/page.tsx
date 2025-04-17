import { Suspense } from "react";

import { Brand } from "./brand";

export default async function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="min-h-screen gap-12">
      <Suspense fallback={undefined}>
        <Brand slug={slug} />
      </Suspense>
    </div>
  );
}
