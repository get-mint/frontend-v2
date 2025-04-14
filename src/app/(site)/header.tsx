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
  { href: "/info/company/about", label: "About Us" },
  { href: "/download", label: "Download" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  const isMobile = useIsMobile();
  const { authUser } = useAuth();

  return (
    <header>
      <nav className="sticky top-0 z-50 border-b bg-background">
        <div className="container flex items-center justify-between h-20 px-4 mx-auto">
          <div className="flex items-center gap-4">
            <Link href="/">
              <div className="flex items-center gap-2">
                <Image
                  src="/logo.png"
                  alt="Mint Cashback Logo"
                  width={32}
                  height={32}
                />
                <span className="text-lg font-bold sm:text-xl">
                  Mint CashBack
                </span>
              </div>
            </Link>

            {!isMobile ? (
              <nav className="flex gap-8 px-8">
                {items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="font-semibold transition-colors duration-300 text-foreground hover:text-secondary/80"
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
          </div>

          {authUser ? (
            <Link
              key="about"
              href="/user"
              className="flex flex-row items-center gap-4 font-semibold transition-colors duration-300 text-foreground hover:text-secondary/80"
            >
              My Account
              <UserIcon className="p-2 border rounded-full bg-muted size-11 text-muted-foreground" />
            </Link>
          ) : (
            <div className="flex gap-2">
              <Link href="/auth/login">
                <Button variant="outline" className="px-6 rounded-full">
                  Log In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="px-6 rounded-full">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
