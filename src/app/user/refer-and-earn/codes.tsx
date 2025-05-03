"use client";

import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";

import { Tables } from "@/types/supabase";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import CreateCodeDialog from "./create-code-dialog";

export function Codes({
  affiliate,
}: {
  affiliate: Tables<"affiliates">;
}) {
  const [codes, setCodes] = useState<Tables<"affiliate_codes">[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCodes = async () => {
    if (!affiliate) return;

    setIsLoading(true);
    const supabase = createClient();

    const { data, error } = await supabase
      .from("affiliate_codes")
      .select("*")
      .eq("affiliate_id", affiliate.id);

    if (error) {
      console.error(error);
      return;
    }

    setCodes(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCodes();
  }, [affiliate]);

  const handleCodeCreated = () => {
    fetchCodes();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Your Referral Codes</CardTitle>
        <CreateCodeDialog
          affiliate={affiliate}
          onCodeCreated={handleCodeCreated}
          existingCodesCount={codes.length}
        />
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="flex flex-col gap-4">
            <Skeleton className="w-full h-8 rounded" />
            <Skeleton className="w-full h-8 rounded" />
          </div>
        ) : codes.length > 0 ? (
          <div className="flex flex-col gap-4">
            {codes.map((code) => (
              <div
                key={code.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <span className="font-medium">{code.code}</span>
                <span className="text-sm text-muted-foreground">
                  Created on {new Date(code.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              You don't have any referral codes yet.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
