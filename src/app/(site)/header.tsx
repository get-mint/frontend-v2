"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  MenuIcon,
  UserIcon,
  HomeIcon,
  ShirtIcon,
  BookIcon,
  LogOut,
  HistoryIcon,
  HandCoinsIcon,
} from "lucide-react";

import { useIsMobile } from "@/lib/hooks/use-mobile";
import { Header as BaseHeader } from "@/components/layout/header";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const nonAuthItems = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/about", label: "About", icon: BookIcon },
  { href: "/brands", label: "Brands", icon: ShirtIcon },
];

const authItems = [
  { href: "/user", label: "Account", icon: UserIcon },
  { href: "/user/activity", label: "Activity", icon: HistoryIcon },
  { href: "/user/affiliate", label: "Refer & Earn", icon: HandCoinsIcon },
];

export function SiteHeader() {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  
  // Determine if user is authenticated based on pathname
  const isAuthenticated = pathname.startsWith("/user");
  const items = isAuthenticated ? authItems : nonAuthItems;

  return (
    <BaseHeader>
      <div className="flex items-center gap-3 md:gap-6">
        {!isMobile && (
          <nav className="flex gap-6">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-semibold transition-all ${
                  pathname === item.href
                    ? "text-primary"
                    : "hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              <Link href="/auth/login" passHref>
                <Button variant="outline">Log In</Button>
              </Link>

              <Link href="/auth/signup" passHref>
                <Button className="font-semibold">Join Mint</Button>
              </Link>
            </>
          ) : (
            <>
              <Button
                variant="destructive"
                onClick={() => {
                  // Redirect to logout route instead of using auth hook
                  window.location.href = "/auth/logout";
                }}
                className="text-destructive"
              >
                <LogOut />
                <span>Log Out</span>
              </Button>
            </>
          )}

          {isMobile && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="w-10 h-10">
                  <MenuIcon className="size-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40 mr-4">
                {items.map((item) => (
                  <DropdownMenuItem
                    key={item.href}
                    asChild
                    className={`transition-all text-md cursor-point ${
                      pathname === item.href ? "bg-primary/10" : ""
                    }`}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center gap-2"
                    >
                      <item.icon
                        className={`size-5 ${
                          pathname === item.href ? "text-primary" : ""
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
    </BaseHeader>
  );
}
