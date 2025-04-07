"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import { LogOutIcon, LayoutDashboardIcon } from "lucide-react";

import { useAuth } from "@/lib/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenu } from "@/components/ui/dropdown-menu";

const AuthNav = ({ authUser }: { authUser: any }) => {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div
      className={`border rounded-full bg-background flex items-center shadow-sm ${
        authUser ? "p-2" : "px-6 h-14"
      }`}
    >
      {authUser ? (
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
              <Avatar className="border size-10">
                <AvatarImage src={authUser.user_metadata?.avatar_url} />
                <AvatarFallback className="text-muted-foreground font-semibold">
                  {authUser.email?.[0].toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem>
                <LayoutDashboardIcon className="size-4 text-foreground" />
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleSignOut}
                className="cursor-pointer"
              >
                <LogOutIcon className="size-4 text-destructive" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex gap-2">
          <Link href="/auth/login">
            <Button variant="outline">Log In</Button>
          </Link>
          <Link href="/auth/signup">
            <Button>Sign Up</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

/**
 * Add routes where the header should not be sticky. I personally use this
 * for the landing page, but you can add more routes as needed.
 */
const nonStickyRoutes = ["/landing"];

const sections = [
  {
    title: "Product",
    links: [
      { href: "/download", label: "Download" },
      { href: "#features", label: "Features", isScroll: true },
      { href: "/info/security", label: "Security" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/info/company/about", label: "About Us" },
      { href: "/info/company/careers", label: "Careers" },
      { href: "/info/company/faq", label: "FAQ" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/info/legal/privacy-policy", label: "Privacy Policy" },
      { href: "/info/legal/terms-of-service", label: "Terms of Service" },
      { href: "/info/legal/cookie-policy", label: "Cookie Policy" },
    ],
  },
];

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const { authUser } = useAuth();

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <div className="py-6">
      <div className="container mx-auto">
        <div className="flex items-center justify-center gap-2">
          <div className="border rounded-full h-14 px-6 bg-background flex items-center shadow-sm">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center">
                <Logo />
              </Link>

              <nav className="flex gap-8">
                <Link
                  href="/"
                  className="text-foreground hover:text-foreground/80"
                >
                  HOME
                </Link>
                <Link
                  href="/about"
                  className="text-foreground hover:text-foreground/80"
                >
                  ABOUT
                </Link>
                <Link
                  href="/download"
                  className="text-foreground hover:text-foreground/80"
                >
                  DOWNLOAD
                </Link>
                <Link
                  href="/deals"
                  className="text-foreground hover:text-foreground/80"
                >
                  DEALS
                </Link>
              </nav>
            </div>
          </div>

          <AuthNav authUser={authUser} />
        </div>
      </div>
    </div>
  );
}
