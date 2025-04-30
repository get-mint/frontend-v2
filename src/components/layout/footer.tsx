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
    <div className="py-12 mt-8 bg-neutral-900">
      <div className="px-6 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex items-start col-span-1">
            <img
              src="/brand/mint-cashback.svg"
              alt="Mint Cashback"
              className="h-12"
            />
          </div>

          {sections.map((section, index) => (
            <div key={index} className="col-span-1">
              <h3 className="mb-4 text-lg font-medium text-white">
                {section.title}
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col pt-8 mt-8 border-t border-white/20">
          <p className="py-2 text-sm text-white">
            © {new Date().getFullYear()} Mint Cashback
          </p>
        </div>
      </div>
    </div>
  );
}
