import type { Metadata } from "next";
import Script from "next/script";
import { Figtree } from "next/font/google";

import NextTopLoader from "nextjs-toploader";

import { ThemeProvider } from "@/lib/providers/theme-provider";
import { AuthProvider } from "@/lib/providers/auth-provider";

import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  title: "Mint CashBack",
  description: "It's your money, we help you grab it",
  keywords: ["cashback", "rewards", "money", "ecommerce", "savings", "mint"],
  authors: [{ name: "Mint CashBack Team" }],
  creator: "Mint CashBack",
  publisher: "Mint CashBack",
  metadataBase: new URL("https://mintcashback.com"),
  applicationName: "Mint CashBack",
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
    title: "Mint CashBack",
    description: "It's your money, we help you grab it",
    siteName: "Mint CashBack",
    images: ["https://mintcashback.com/og-cover.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mint CashBack",
    description: "It's your money, we help you grab it",
    images: ["https://mintcashback.com/og-cover.jpg"],
    creator: "@mintcashback",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: "#39d992",
  other: {
    "theme-color": "#39d992",
    "msapplication-TileColor": "#39d992",
    "og:color": "#39d992",
    "discord:color": "#39d992",
  },
  icons: {
    icon: "/favicon.ico",
  },
  category: "ecommerce",
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
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            forcedTheme="light"
            disableTransitionOnChange
            storageKey="theme-preference"
          >
            <main>
              <NextTopLoader showSpinner={false} color="#39d992" />
              <Toaster position="top-center" />

              {children}
            </main>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
