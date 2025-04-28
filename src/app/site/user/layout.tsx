"use client";

import { usePathname } from "next/navigation";

import { CurrencySelect } from "@/components/app/currency/currency-select";

const items: { label: string; href: string }[] = [
  {
    label: "Account",
    href: "/user",
  },
  {
    label: "Activity",
    href: "/user/activity",
  },
  {
    label: "Refer & Earn",
    href: "/user/affiliate",
  },
];

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const item = items.find((item) => item.href === pathname);

  return (
    <div className="container px-6 py-6 mx-auto max-w-7xl">
      <div className="flex flex-col justify-between gap-4 mb-6 items-starts md:flex-row md:items-end">
        <h1 className="text-3xl font-bold">{item?.label}</h1>

        <CurrencySelect triggerClassName="w-[180px]" />
      </div>

      {children}
    </div>
  );
}
