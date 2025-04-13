import Link from "next/link";

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

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-8 max-w-3xl">
          <div className="flex flex-wrap gap-12 w-full md:w-auto">
            {sections.map((section) => (
              <div key={section.title} className="min-w-[100px]">
                <h3 className="font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
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

        <div className="border-t mt-8 pt-8">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Mint CashBack. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
