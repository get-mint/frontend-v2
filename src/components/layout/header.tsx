"use client";

import Link from "next/link";
import Image from "next/image";

import { useIsMobile } from "@/lib/hooks/use-mobile";
import { useAuth } from "@/lib/hooks/use-auth";

export function Header({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  const isMobile = useIsMobile();

  return (
    <div className="sticky top-0 z-50 border-b bg-white/85 backdrop-blur-md">
      <div className="container flex items-center justify-between h-16 gap-8 px-6 mx-auto max-w-7xl">
        <Link
          href={`${user ? "/user" : "/"}`}
          className="transition-all hover:opacity-90"
        >
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

        {children}
      </div>
    </div>
  );
}
