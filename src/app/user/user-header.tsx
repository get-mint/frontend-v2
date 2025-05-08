"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  UserIcon,
  HandCoinsIcon,
  HistoryIcon,
  LogOutIcon,
  ChevronDownIcon,
  LayoutDashboardIcon,
} from "lucide-react";

import { useIsMobile } from "@/lib/hooks/use-mobile";
import { useAuth } from "@/lib/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function UserHeader() {
  const router = useRouter();
  const isMobile = useIsMobile();

  const { user, selectedCurrency, logOut } = useAuth();

  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    if (!user || !selectedCurrency) {
      return;
    }

    const fetchBalance = async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("user_balance_entries")
        .select("balance")
        .eq("user_id", user?.id)
        .eq("currency_id", selectedCurrency?.id)
        .order("created_at", { ascending: false })
        .limit(1);

      if (error) {
        console.error(error);
        return;
      }

      if (data.length === 0) {
        setBalance(0);
        return;
      }

      setBalance(data[0].balance);
    };

    fetchBalance();
  }, [user, selectedCurrency]);


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-row items-center justify-center p-2 transition-all bg-white border rounded-full cursor-pointer hover:border-primary hover:ring-1 hover:ring-primary">
          {!isMobile && (
            <Button size="icon" className="mr-3">
              <UserIcon className="size-5" />
            </Button>
          )}

          <span className="mr-1 font-semibold">
            {selectedCurrency?.symbol}
            {balance.toFixed(2)}
          </span>
          <ChevronDownIcon className="mr-1 size-5" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 p-0 mt-1 rounded-t-none z-49">
        <div className="p-4 border-b">
          <span className="text-lg font-bold">My Account</span>
        </div>

        <Link href="/user/dashboard" passHref>
          <DropdownMenuItem className="p-4 font-medium rounded-none cursor-pointer text-md">
            <LayoutDashboardIcon className="size-5 text-foreground" />
            Dashboard
          </DropdownMenuItem>
        </Link>

        <Link href="/user/activity" passHref>
          <DropdownMenuItem className="p-4 font-medium rounded-none cursor-pointer text-md">
            <HistoryIcon className="size-5 text-foreground" />
            Activity
          </DropdownMenuItem>
        </Link>

        <Link href="/user/refer-and-earn" passHref>
          <DropdownMenuItem className="p-4 font-medium rounded-none cursor-pointer text-md">
            <HandCoinsIcon className="size-5 text-foreground" />
            Refer & Earn
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem
          className="p-4 font-medium rounded-none cursor-pointer text-md text-destructive"
          onClick={async () => {
            await logOut();
            router.push("/auth/login");
          }}
        >
          <LogOutIcon className="size-5 text-destructive" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
