"use client";

import { useEffect, useState } from "react";

import { useAuth } from "@/lib/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";

import { Tables } from "@/types/supabase";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Codes({
  affiliate,
}: {
  affiliate: Tables<"affiliates">;
}) {
  const [codes, setCodes] = useState<Tables<"affiliate_codes">[]>([]);

  useEffect(() => {
    if (!affiliate) return;

    const fetchCodes = async () => {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("affiliate_codes")
        .select("*")
        .eq("affiliate_id", affiliate.id);

      if (error) {
        console.error(error);
        return;
      }

      setCodes(data);
    };

    fetchCodes();
  }, [affiliate]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>

      <CardContent></CardContent>
    </Card>
  );
}
