import { Brand } from "./brand";

export default async function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <Brand slug={slug} />;
}
