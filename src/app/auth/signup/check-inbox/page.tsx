"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CheckInboxPage({
  searchParams,
}: {
  searchParams: { email?: string };
}) {
  const email = searchParams.email;

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-md">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center gap-6">
              <h1 className="text-2xl font-bold">Check your inbox</h1>
              <p className="text-balance text-muted-foreground">
                We've sent a confirmation email to{" "}
                <span className="font-semibold">{email}</span>. Please check
                your inbox and click the link to verify your email address.
              </p>
              <p className="text-sm text-muted-foreground">
                Didn't receive the email? Check your spam folder or contact
                support.
              </p>
              <Button asChild className="w-full">
                <Link href="/auth/login">Back to login</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
