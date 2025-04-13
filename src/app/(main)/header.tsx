"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { LogOutIcon, LayoutDashboardIcon, MenuIcon, User } from "lucide-react";

import { useAuth } from "@/lib/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";
import { useIsMobile } from "@/lib/hooks/use-mobile";

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

const navItems = [
  { href: "/", label: "Home" },
  { href: "/info/company/about", label: "About Us" },
  { href: "/download", label: "Download" },
  { href: "/blog", label: "Blog" },
];

const AuthNav = ({ authUser }: { authUser: any }) => {
  const router = useRouter();

  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div className="flex items-center">
      {authUser ? (
        <>
          <Link
            key="about"
            href="/user"
            className="text-foreground flex flex-row items-center gap-4 font-semibold hover:text-secondary/80 transition-colors duration-300"
          >
            My Account
            <User className="bg-muted size-11 rounded-full p-2 text-muted-foreground border" />
          </Link>
        </>
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
  );
};

export function Header() {
  const isMobile = useIsMobile();

  const { authUser } = useAuth();

  return (
    <div className="sticky top-0 z-50 bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-5">
          <div className="flex items-center">
            <div className="pr-3">
              <Link href="/" className="flex items-center">
                <Logo size="md" />
              </Link>
            </div>

            {!isMobile && (
              <>
                <nav className="flex gap-8 px-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-foreground font-semibold hover:text-secondary/80 transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            <AuthNav authUser={authUser} />

            {isMobile && (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="h-10 w-10">
                      <MenuIcon className="size-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    {navItems.map((item) => (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href} className="cursor-pointer">
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
