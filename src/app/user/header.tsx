"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { SearchIcon } from "lucide-react";

import { Header } from "@/components/layout/header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserHeader as UserProfileHeader } from "./user-header";

export function UserHeader() {
  const router = useRouter();

  const [search, setSearch] = useState<string>("");

  const handleSearch = () => {
    router.push(`/user/brands?search=${search}`);
  };

  return (
    <Header>
      <div className="flex flex-row items-center justify-center flex-1 gap-3 p-2 transition-all bg-white border rounded-full border-border hover:border-primary hover:ring-1 hover:ring-primary focus-within:ring-1 focus-within:border-primary focus-within:ring-primary">
        <Input
          placeholder="Search for brands"
          className="w-full h-full pl-3 m-0 text-lg font-medium bg-transparent border-none rounded-none shadow-none appearance-none focus:ring-0 focus:outline-none focus:border-none focus-visible:ring-0 focus-visible:outline-none focus-visible:border-none active:ring-0 active:outline-none active:border-none hover:ring-0 hover:outline-none hover:border-none"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <Button size="icon" onClick={handleSearch}>
          <SearchIcon className="size-5" />
        </Button>
      </div>

      <UserProfileHeader />
    </Header>
  );
}
