"use client";

import Link from "next/link";
import Image from "next/image";

import { MenuIcon, UserIcon } from "lucide-react";

import { useAuth } from "@/lib/hooks/use-auth";
import { useIsMobile } from "@/lib/hooks/use-mobile";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const items = [
  { href: "/", label: "Home" },
  { href: "/brands", label: "Brands" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  const isMobile = useIsMobile();
  const { authUser } = useAuth();

  return (
    <div className="sticky top-0 z-50 border-b bg-white/85 backdrop-blur-md">
      <div className="container flex items-center justify-between h-16 px-6 mx-auto max-w-7xl">
        <Link href="/">
          <span className="text-2xl font-extrabold transition-all text-primary hover:text-primary/90">
            mint cashback
          </span>
        </Link>

        <div className="flex items-center gap-3 md:gap-6 lg:gap-8">
          {!isMobile ? (
            <nav className="flex gap-6">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-semibold transition-all hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="w-10 h-10">
                  <MenuIcon className="size-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {items.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className="cursor-pointer">
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <div className="flex items-center gap-2">
            {!authUser ? (
              <>
                <Button variant="outline">Log In</Button>
                <Button className="font-semibold">Join Mint</Button>
              </>
            ) : (
              <Button variant="outline" size="icon" className="w-10 h-10">
                <UserIcon className="size-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
