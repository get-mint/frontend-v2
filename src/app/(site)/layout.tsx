import { Footer } from "@/components/layout/footer";
import { SiteHeader } from "./header";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      {children}
      <Footer />
    </>
  );
}
