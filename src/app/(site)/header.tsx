"use client";

import Link from "next/link";

import { LeafIcon, MenuIcon, UserIcon } from "lucide-react";

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
      <nav className="sticky top-0 z-50 bg-background border-b">
        <div className="container mx-auto px-4 flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <LeafIcon className="size-6 text-primary" />
              <span className="font-bold text-xl">Mint CashBack</span>
            </div>

            {!isMobile ? (
              <nav className="flex gap-8 px-8">
                {items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-foreground font-semibold hover:text-secondary/80 transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="h-10 w-10">
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
              className="text-foreground flex flex-row items-center gap-4 font-semibold hover:text-secondary/80 transition-colors duration-300"
            >
              My Account
              <UserIcon className="bg-muted size-11 rounded-full p-2 text-muted-foreground border" />
            </Link>
          ) : (
            <div className="flex gap-2">
              <Link href="/auth/login">
                <Button variant="outline" className="rounded-full px-6">
                  Log In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="rounded-full px-6">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
