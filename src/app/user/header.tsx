import Link from "next/link";

import {
  SearchIcon,
  UserIcon,
  HandCoinsIcon,
  HistoryIcon,
  LogOutIcon,
  ChevronDownIcon,
  LayoutDashboardIcon,
} from "lucide-react";

import { Header } from "@/components/layout/header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserHeader() {
  return (
    <Header>
      <div className="flex flex-row items-center justify-center flex-1 gap-3 p-2 transition-all bg-white border rounded-full border-border hover:border-primary hover:ring-1 hover:ring-primary focus-within:ring-1 focus-within:border-primary focus-within:ring-primary">
        <Input
          placeholder="Search for brands"
          className="w-full h-full pl-3 m-0 text-lg font-medium bg-transparent border-none rounded-none shadow-none appearance-none focus:ring-0 focus:outline-none focus:border-none focus-visible:ring-0 focus-visible:outline-none focus-visible:border-none active:ring-0 active:outline-none active:border-none hover:ring-0 hover:outline-none hover:border-none"
        />
        <Button size="icon">
          <SearchIcon className="size-5" />
        </Button>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex flex-row items-center justify-center p-2 transition-all border rounded-full cursor-pointer hover:border-primary hover:ring-1 hover:ring-primary">
            <Button size="icon" className="mr-3">
              <UserIcon className="size-5" />
            </Button>

            <span className="mr-1 font-semibold">$24.00</span>
            <ChevronDownIcon className="mr-1 size-5" />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-64 p-0 mt-1 rounded-t-none z-49">
          <div className="p-4 border-b">
            <span className="text-lg font-bold">My Account</span>
          </div>

          <DropdownMenuItem className="p-4 font-medium rounded-none cursor-pointer text-md">
            <LayoutDashboardIcon className="size-5 text-foreground" />
            Dashboard
          </DropdownMenuItem>

          <DropdownMenuItem className="p-4 font-medium rounded-none cursor-pointer text-md">
            <HistoryIcon className="size-5 text-foreground" />
            Activity
          </DropdownMenuItem>

          <DropdownMenuItem className="p-4 font-medium rounded-none cursor-pointer text-md">
            <HandCoinsIcon className="size-5 text-foreground" />
            Refer & Earn
          </DropdownMenuItem>

          <DropdownMenuItem className="p-4 font-medium rounded-none cursor-pointer text-md text-destructive">
            <LogOutIcon className="size-5 text-destructive" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Header>
  );
}
