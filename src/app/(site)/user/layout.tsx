"use client";

import { usePathname } from "next/navigation";

import { CurrencySelect } from "@/components/currency-select";

const pageTitles: Record<string, string> = {
  "/user": "Account",
  "/user/activity": "Activity",
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const pageTitle = pageTitles[pathname] || "Dashboard";

  return (
    <div className="container px-6 py-6 mx-auto max-w-7xl">
      <div className="flex flex-col items-start justify-between gap-4 mb-6 md:flex-row md:items-center">
        <h1 className="text-3xl font-bold">{pageTitle}</h1>
        <CurrencySelect triggerClassName="w-[180px]" />
      </div>

      {children}
    </div>
  );
}
