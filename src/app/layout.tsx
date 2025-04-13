import type { Metadata } from "next";
import { Figtree } from "next/font/google";

import NextTopLoader from "nextjs-toploader";

import { ThemeProvider } from "@/lib/providers/theme-provider";
import { AuthProvider } from "@/lib/providers/auth-provider";
import { brand } from "@/lib/constants/brand";

import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

import { Header } from "./header";
import { Footer } from "./footer";

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
            <Header />
            {children}
            <Footer />
            <Toaster position="bottom-right" />
          </ThemeProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
