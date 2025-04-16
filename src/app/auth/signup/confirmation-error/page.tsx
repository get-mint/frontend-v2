import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ConfirmationErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center p-6 min-h-svh bg-muted md:p-10">
      <div className="w-full max-w-md">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-6 text-center">
              <h1 className="text-2xl font-bold">Email Confirmation Failed</h1>
              <p className="text-balance text-muted-foreground">
                We encountered an error while confirming your email address.
                This may happen if the confirmation link is invalid or expired.
              </p>
              <p className="text-sm text-muted-foreground">
                Please try signing up again with the same email address.
              </p>
              <Button asChild className="w-full">
                <Link href="/auth/signup">Sign up again</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
