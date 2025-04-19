"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, User, History, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/user", label: "Dashboard", icon: LayoutDashboard },
  { href: "/user/activity", label: "Activity", icon: History },
  { href: "/user/account", label: "Account", icon: User },
];

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="container min-h-screen px-6 py-6 mx-auto max-w-7xl">
      <nav className="flex flex-wrap gap-2 mb-4 sm:gap-3 sm:mb-6">
        {navItems.map((item) => (
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
      {children}
    </div>
  );
}
