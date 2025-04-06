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
    <div className="flex items-center gap-4">
      {authUser ? (
        <div className="flex items-center gap-4">
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
    <header
      className={`border-b bg-background ${
        !nonStickyRoutes.includes(pathname) ? "sticky top-0" : ""
      } z-50`}
    >
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              {sections.map((section) => (
                <NavigationMenuItem key={section.title}>
                  <NavigationMenuTrigger>{section.title}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-2">
                      {section.links.map((link) => (
                        <li key={link.href}>
                          <NavigationMenuLink asChild>
                            <a
                              href={link.href}
                              onClick={(e) => handleClick(e, link.href)}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              target={
                                link.href.startsWith("/info/")
                                  ? "_blank"
                                  : undefined
                              }
                              rel={
                                link.href.startsWith("/info/")
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                            >
                              <div className="text-sm font-medium leading-none">
                                {link.label}
                              </div>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <AuthNav authUser={authUser} />
        </div>
      </div>
    </header>
  );
}
