"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { LogOutIcon, LayoutDashboardIcon, MenuIcon } from "lucide-react";

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
  { href: "/about", label: "About" },
  { href: "/download", label: "Download" },
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
            <DropdownMenuContent className="animate-in fade-in slide-in-from-top-2 bg-background/40 backdrop-blur-md">
              <DropdownMenuItem className="hover:bg-secondary/10 transition-colors duration-300">
                <LayoutDashboardIcon className="size-4 text-foreground" />
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleSignOut}
                className="cursor-pointer hover:bg-destructive/10 transition-colors duration-300"
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
  const { authUser } = useAuth();
  const isMobile = useIsMobile();

  return (
    <div className="sticky top-0 z-50 bg-background border-b">
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-5">
          <div className="flex items-center">
            <div className="pl-6 pr-3">
              <Link href="/" className="flex items-center">
                <Logo />
              </Link>
            </div>

            {!isMobile && (
              <>
                <div className="h-6 w-px bg-border/50" />

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
            <div className="px-4">
              <AuthNav authUser={authUser} />
            </div>

            {isMobile && (
              <>
                <div className="h-6 w-px bg-border/50" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-10 w-10">
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
