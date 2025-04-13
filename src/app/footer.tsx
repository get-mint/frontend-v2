"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import {
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
  Twitch,
} from "lucide-react";

import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

const sections = [
  {
    title: "Company",
    links: [
      { href: "/info/company/about", label: "About Us" },
      { href: "/info/company/faq", label: "FAQ" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/info/legal/privacy-policy", label: "Privacy Policy" },
      { href: "/info/legal/terms-of-service", label: "Terms of Service" },
    ],
  },
];

const socialIcons = {
  github: <Github className="size-5" />,
  twitter: <Twitter className="size-5" />,
  linkedin: <Linkedin className="size-5" />,
  instagram: <Instagram className="size-5" />,
  facebook: <Facebook className="size-5" />,
  youtube: <Youtube className="size-5" />,
  twitch: <Twitch className="size-5" />,
};

export function Footer() {
  const router = useRouter();
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <footer className="border-t bg-background mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-8 max-w-3xl">
          <div className="hidden md:block md:w-auto md:min-w-[200px] mr-12">
            <Logo />

            <p className="mt-1 text-sm text-muted-foreground mb-4">
              "asdasdasd"
            </p>

            <div className="flex items-center gap-8">

            </div>
          </div>

          <div className="flex flex-wrap gap-12 w-full md:w-auto">
            {sections.map((section) => (
              <div key={section.title} className="min-w-[100px]">
                <h3 className="font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={(e) => handleClick(e, link.href)}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                        target={
                          link.href.startsWith("/info/") ? "_blank" : undefined
                        }
                        rel={
                          link.href.startsWith("/info/")
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t mt-8 pt-8">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Mint CashBack. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
