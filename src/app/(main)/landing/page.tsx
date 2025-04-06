import Link from "next/link";

import { brand } from "@/lib/constants/brand";

import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center gap-8 py-32">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome to {brand.name}</h1>
        <span className="text-muted-foreground max-w-md">
          {brand.description} Check out the README to get started.
        </span>
      </div>

      <div className="flex gap-4">
        <Button asChild>
          <Link href="/auth/signup">Sign Up</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/auth/login">Login</Link>
        </Button>
      </div>

      <div className="mt-8 text-sm text-muted-foreground">
        <p>
          Need help getting started? Check out the{" "}
          <Link
            href="https://github.com/alexandros-lekkas/next-supa-shad-boilerplate/blob/main/README.md"
            className="underline hover:text-foreground"
          >
            README
          </Link>
        </p>
      </div>
    </div>
  );
}
