"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/user", label: "Profile" },
  { href: "/user/activity", label: "Activity" },
];

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="container mx-auto py-8">
      <nav className="flex gap-3 mb-6">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant={pathname === item.href ? "default" : "outline"}
              className="rounded-full px-8"
            >
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
      {children}
    </div>
  );
}
