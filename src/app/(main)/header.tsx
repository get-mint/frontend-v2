"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { LogOutIcon, LayoutDashboardIcon } from "lucide-react";

import { useAuth } from "@/lib/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";

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
    <div
      className={`border rounded-full bg-background flex items-center shadow-sm ${
        authUser ? "p-2" : "px-3 h-14"
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
        <div className="flex gap-1">
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
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-foreground font-semibold hover:text-secondary/80"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          <AuthNav authUser={authUser} />
        </div>
      </div>
    </div>
  );
}
