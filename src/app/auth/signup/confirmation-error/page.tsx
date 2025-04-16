import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ConfirmationErrorPage({
  searchParams,
}: {
  searchParams: { error?: string; details?: string };
}) {
  const [showDetails, setShowDetails] = useState(false);
  const errorMessage = searchParams.error || "Unknown error";
  const errorDetails = searchParams.details || "No additional details available";

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
              
              <Collapsible
                className="w-full border rounded-md p-2"
                open={showDetails}
                onOpenChange={setShowDetails}
              >
                <CollapsibleTrigger className="flex w-full items-center justify-between text-sm">
                  <span>Technical Details</span>
                  {showDetails ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                  <div className="rounded-md bg-muted p-3 text-left text-sm">
                    <p className="font-semibold">Error: {errorMessage}</p>
                    {errorDetails && (
                      <p className="mt-2 text-xs text-muted-foreground whitespace-pre-wrap">
                        {errorDetails}
                      </p>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
              
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
