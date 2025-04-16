import Link from "next/link";

const sections = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms-of-service", label: "Terms of Service" },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t bg-background">
      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-wrap max-w-3xl gap-8">
          <div className="flex flex-wrap w-full gap-12 md:w-auto">
            {sections.map((section) => (
              <div key={section.title} className="min-w-[100px]">
                <h3 className="mb-4 font-semibold">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm transition-colors text-muted-foreground hover:text-primary"
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
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 mt-8 border-t">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Mint CashBack. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
