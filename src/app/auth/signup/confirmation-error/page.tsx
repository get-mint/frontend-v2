"use client";

import { useState } from "react";
import Link from "next/link";

import { ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
                className="w-full p-2 border rounded-md"
                open={showDetails}
                onOpenChange={setShowDetails}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full text-sm">
                  <span>Technical Details</span>
                  {showDetails ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                  <div className="p-3 text-sm text-left rounded-md bg-muted">
                    <p className="font-semibold">Error: {errorMessage}</p>
                    {errorDetails && (
                      <p className="mt-2 text-xs whitespace-pre-wrap text-muted-foreground">
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
