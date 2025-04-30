import { Footer } from "@/components/layout/footer";

import { UserHeader } from "./header";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserHeader />

      <div className="container px-6 py-6 mx-auto space-y-6 max-w-7xl">{children}</div>

      <Footer />
    </>
  );
}
