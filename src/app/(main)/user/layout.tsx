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
    <div className="container mx-auto py-8 px-4">
      <nav className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant={pathname === item.href ? "default" : "outline"}
              className="rounded-full px-8"
            >
              <item.icon className="size-4" />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
      {children}
    </div>
  );
}
