import type { Metadata } from "next";
import Script from "next/script";
import { Figtree } from "next/font/google";

import NextTopLoader from "nextjs-toploader";

import { ThemeProvider } from "@/lib/providers/theme-provider";
import { AuthProvider } from "@/lib/providers/auth-provider";
import { brand } from "@/lib/constants/brand";

import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  title: brand.name,
  description: brand.description,
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

      <AuthProvider>
        <body className={`${figtree.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            forcedTheme="light"
            disableTransitionOnChange
            storageKey="theme-preference"
          >
            <NextTopLoader showSpinner={false} color="oklch(0.78 0.15 160)" />
            {children}
            <Toaster position="bottom-right" />
          </ThemeProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
