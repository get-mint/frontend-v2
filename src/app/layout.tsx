import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Figtree } from "next/font/google";

import { ThemeProvider } from "@/lib/providers/theme";
import { AuthProvider } from "@/lib/providers/auth";
import { CurrencyProvider } from "@/lib/providers/currency";

import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  title: "Mint Cashback",
  description: "Cashback, finally done right",
  keywords: ["cashback", "rewards", "money", "ecommerce", "savings", "mint"],
  authors: [{ name: "Mint Cashback Team" }],
  creator: "Mint Cashback",
  publisher: "Mint Cashback",
  metadataBase: new URL("https://mintcashback.com"),
  applicationName: "Mint Cashback",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mintcashback.com",
    title: "Mint Cashback",
    description: "Cashback, finally done right",
    siteName: "Mint Cashback",
    images: ["https://mintcashback.com/og-cover.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mint Cashback",
    description: "Cashback, finally done right",
    images: ["https://mintcashback.com/og-cover.jpg"],
    creator: "@mintcashback",
  },
  other: {
    "msapplication-TileColor": "#39d992",
    "og:color": "#39d992",
    "discord:color": "#39d992",
  },
  icons: {
    icon: "/favicon.ico",
  },
  category: "ecommerce",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-V4ZR8V1YG3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-V4ZR8V1YG3');
          `}
        </Script>
      </head>

      <body className={`${figtree.className} antialiased`}>
        <AuthProvider>
          <CurrencyProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              forcedTheme="light"
              disableTransitionOnChange
              storageKey="theme-preference"
            >
              <main>
                <Toaster position="top-center" />

                {children}
              </main>
            </ThemeProvider>
          </CurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
