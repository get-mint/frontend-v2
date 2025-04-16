import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default async function ConfirmationErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; details?: string }>;
}) {
  const params = await searchParams;

  const errorMessage = params.error || "Unknown error";
  const errorDetails = params.details || "No additional details available";

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

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="error-details">
                  <AccordionTrigger className="text-sm">
                    Technical Details
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="p-3 text-sm text-left rounded-md bg-muted">
                      <p className="font-semibold">Error: {errorMessage}</p>
                      {errorDetails && (
                        <p className="mt-2 text-xs whitespace-pre-wrap text-muted-foreground">
                          {errorDetails}
                        </p>
                      )}
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
