"use client";

import { useAuth } from "@/lib/hooks/use-auth";
import { useIsMobile } from "@/lib/hooks/use-mobile";

const items = [
  { href: "/", label: "Home" },
  { href: "/info/company/about", label: "About Us" },
  { href: "/download", label: "Download" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  const isMobile = useIsMobile();
  const { authUser } = useAuth();

  return (
    <header>
      <div className="container mx-auto px-4">

      </div>

      <nav className="container mx-auto px-4">
      </nav>
    </header>
  );
}
