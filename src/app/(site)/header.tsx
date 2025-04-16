"use client";

import Link from "next/link";
import Image from "next/image";

import {
  MenuIcon,
  UserIcon,
  HomeIcon,
  ShirtIcon,
  NewspaperIcon,
  BookIcon,
} from "lucide-react";

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
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/about", label: "About", icon: BookIcon },
  { href: "/brands", label: "Brands", icon: ShirtIcon },
  { href: "/blog", label: "Blog", icon: NewspaperIcon },
];

export function Header() {
  const isMobile = useIsMobile();
  const { user } = useAuth();

  return (
    <div className="sticky top-0 z-50 border-b bg-white/85 backdrop-blur-md">
      <div className="container flex items-center justify-between h-16 px-6 mx-auto max-w-7xl">
        <Link href="/" className="transition-all hover:opacity-90">
          {isMobile ? (
            <Image
              src="/brand/mint.svg"
              alt="Mint Logo"
              width={65}
              height={28}
              priority
            />
          ) : (
            <Image
              src="/brand/mint-cashback.svg"
              alt="Mint Cashback Logo"
              width={175}
              height={28}
              priority
            />
          )}
        </Link>

        <div className="flex items-center gap-3 md:gap-6">
          {!isMobile && (
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
          )}

          <div className="flex items-center gap-3">
            {!user ? (
              <>
                <Link href="/auth/login" passHref>
                  <Button variant="outline">Log In</Button>
                </Link>

                <Link href="/auth/signup" passHref>
                  <Button className="font-semibold">Join Mint</Button>
                </Link>
              </>
            ) : (
              <Link href="/user" passHref>
                <Button variant="outline" size="icon" className="size-10">
                  <UserIcon className="size-5" />
                </Button>
              </Link>
            )}

            {isMobile && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="w-10 h-10">
                    <MenuIcon className="size-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-32 mr-4">
                  {items.map((item) => (
                    <DropdownMenuItem
                      key={item.href}
                      asChild
                      className="transition-all text-md cursor-point"
                    >
                      <Link href={item.href}>
                        <item.icon className="size-5 text-primary" />
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
