import * as React from "react";
import Link from "next/link";

const sections = [
  {
    title: "About",
    links: [
      { label: "About", href: "/about" },
      { label: "Download", href: "/download" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
  {
    title: "Get in touch",
    links: [
      { label: "Contact us", href: "/contact-us" },
      { label: "Give us feedback", href: "/give-us-feedback" },
      { label: "Help Center", href: "/help-center" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="py-12 mx-auto mt-12 bg-foreground/97 dark:bg-background text-background dark:text-foreground dark:border-t">
      <div className="px-6 mx-auto max-w-7xl">
        <div className="flex flex-wrap gap-x-12 gap-y-6">
          <div className="mr-6">
            <img
              src="/brand/mint-cashback.svg"
              alt="Mint Cashback"
              className="h-12"
            />
          </div>
          
          {sections.map((section, index) => (
            <div key={index}>
              <h4 className="pb-2 font-semibold">{section.title}</h4>

              <ul className="space-y-1">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href}>
                      <span className="font-medium transition-all text-md text-neutral-400 hover:text-neutral-300 hover:underline">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-row justify-between mt-12 pt-12 pb-[150px] border-t border-t-accent/40 dark:border-t-border/40">
          <p className="font-medium text-md text-neutral-400">
            © {new Date().getFullYear()} Mint Cashback - All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
