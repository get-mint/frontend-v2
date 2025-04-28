import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ERROR_MESSAGES = {
  token_validation: {
    title: "Invalid Confirmation Link",
    message: "The confirmation link you used is invalid or has expired.",
    action: "Please request a new confirmation email.",
  },
  otp_verification: {
    title: "Verification Failed",
    message: "We couldn't verify your email address. This may happen if the link has expired or was already used.",
    action: "Please try signing up again with the same email address.",
  },
  user_creation: {
    title: "Account Creation Failed",
    message: "We encountered an error while creating your account.",
    action: "Please try signing up again. If the problem persists, contact support.",
  },
  user_deletion: {
    title: "Cleanup Failed",
    message: "We encountered an error while cleaning up your account.",
    action: "Please contact support for assistance.",
  },
  default: {
    title: "Email Confirmation Failed",
    message: "We encountered an error while confirming your email address.",
    action: "Please try signing up again with the same email address.",
  },
} as const;

export default async function ConfirmationErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ 
    stage?: string; 
    error?: string; 
    code?: string;
    details?: string;
  }>;
}) {
  const params = await searchParams;
  const stage = params.stage as keyof typeof ERROR_MESSAGES | undefined;
  const errorMessage = params.error || "Unknown error";
  const errorCode = params.code || "No error code";
  const errorDetails = params.details || "No additional details available";

  const errorInfo = ERROR_MESSAGES[stage || "default"];

  return (
    <div className="flex flex-col items-center justify-center p-6 min-h-svh bg-muted md:p-10">
      <div className="w-full max-w-md">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-6 text-center">
              <h1 className="text-2xl font-bold">{errorInfo.title}</h1>
              <p className="text-balance text-muted-foreground">
                {errorInfo.message}
              </p>
              <p className="text-sm text-muted-foreground">
                {errorInfo.action}
              </p>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="error-details">
                  <AccordionTrigger className="text-sm">
                    Technical Details
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="p-3 text-sm text-left rounded-md bg-muted space-y-2">
                      <div>
                        <span className="font-semibold">Stage: </span>
                        <span className="text-muted-foreground">{stage || "unknown"}</span>
                      </div>
                      <div>
                        <span className="font-semibold">Error: </span>
                        <span className="text-muted-foreground">{errorMessage}</span>
                      </div>
                      <div>
                        <span className="font-semibold">Code: </span>
                        <span className="text-muted-foreground">{errorCode}</span>
                      </div>
                      <div className="mt-2">
                        <span className="font-semibold">Full Error Details:</span>
                        <pre className="mt-1 p-2 text-xs whitespace-pre-wrap break-all rounded bg-background text-muted-foreground">
                          {errorDetails}
                        </pre>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

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
