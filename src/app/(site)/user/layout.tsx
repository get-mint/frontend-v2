"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LayoutDashboard, User, History } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CurrencySelect } from "@/components/currency-select";

const items = [
  { href: "/user", label: "Dashboard", icon: LayoutDashboard },
  { href: "/user/activity", label: "Activity", icon: History },
  { href: "/user/account", label: "Account", icon: User },
];

const pageTitles: Record<string, string> = {
  "/user": "Dashboard",
  "/user/activity": "Activity",
  "/user/account": "Account",
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const pageTitle = pageTitles[pathname] || "Dashboard";

  return (
    <div className="container min-h-screen px-6 py-6 mx-auto max-w-7xl">
      <nav className="flex flex-wrap gap-2 mb-4 sm:gap-3 sm:mb-6">
        {items.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant={pathname === item.href ? "default" : "outline"}
              className="px-8 rounded-full"
              size="lg"
            >
              <item.icon className="size-5" />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>

      <div className="flex flex-col items-start justify-between gap-4 mb-6 md:flex-row md:items-center">
        <h1 className="text-3xl font-bold">{pageTitle}</h1>
        <CurrencySelect triggerClassName="w-[180px]" />
      </div>

      {children}
    </div>
  );
}
