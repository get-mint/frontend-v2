"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { MenuIcon, HomeIcon, BookIcon, UserIcon } from "lucide-react";

import { useIsMobile } from "@/lib/hooks/use-mobile";
import { useAuth } from "@/lib/hooks/use-auth";

import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/about", label: "About", icon: BookIcon },
];

export function SiteHeader() {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const { user } = useAuth();

  return (
    <Header>
      <div className="flex items-center gap-3 md:gap-6">
        {!isMobile && (
          <nav className="flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-semibold transition-all ${pathname === item.href ? "text-primary" : "hover:text-primary"
                  }`}
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
              <Button variant="outline">
                <UserIcon />
                My Account
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
              <DropdownMenuContent className="w-40 mr-4">
                {navItems.map((item) => (
                  <DropdownMenuItem
                    key={item.href}
                    asChild
                    className={`transition-all text-md cursor-point ${pathname === item.href ? "bg-primary/10" : ""
                      }`}
                  >
                    <Link href={item.href} className="flex items-center gap-2">
                      <item.icon
                        className={`size-5 ${pathname === item.href ? "text-primary" : ""
                          }`}
                      />
                      <span
                        className={
                          pathname === item.href
                            ? "text-primary font-medium"
                            : ""
                        }
                      >
                        {item.label}
                      </span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </Header>
  );
}
