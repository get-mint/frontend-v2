"use client";

import Link from "next/link";
import Image from "next/image";
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

import { useAuth } from "@/lib/hooks/use-auth";
import { useIsMobile } from "@/lib/hooks/use-mobile";

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
  { href: "/brands", label: "Brands", icon: ShirtIcon },
  { href: "/user/affiliate", label: "Refer & Earn", icon: HandCoinsIcon },

];

export function Header() {
  const isMobile = useIsMobile();
  const { user, logOut } = useAuth();
  const pathname = usePathname();

  const items = user ? authItems : nonAuthItems;

  return (
    <div className="sticky top-0 z-50 border-b bg-white/85 backdrop-blur-md">
      <div className="container flex items-center justify-between h-16 px-6 mx-auto max-w-7xl">
        <Link href={`${user ? "/user" : "/"}`} className="transition-all hover:opacity-90">
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="size-10">
                    <UserIcon className="size-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40 mr-4">
                  <DropdownMenuItem
                    asChild
                    className={`transition-all text-md cursor-point ${
                      pathname === "/user" ? "bg-primary/10" : ""
                    }`}
                  >
                    <Link href="/user" className="flex items-center gap-2">
                      <UserIcon
                        className={`size-4 ${
                          pathname === "/user" ? "text-primary" : ""
                        }`}
                      />
                      <span
                        className={
                          pathname === "/user" ? "text-primary font-medium" : ""
                        }
                      >
                        Account
                      </span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center gap-2 transition-all cursor-pointer text-destructive focus:text-destructive text-md"
                    onClick={() => logOut()}
                  >
                    <LogOut className="size-4" />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
      </div>
    </div>
  );
}
