"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/hooks/use-auth";
import { Tables } from "@/types/supabase";
import { Session } from "@supabase/supabase-js";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AffiliateOnboardingProps {
  onSuccess: (affiliate: Tables<"affiliates">) => void;
}

export default function AffiliateOnboarding({ onSuccess }: AffiliateOnboardingProps) {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  // Get Supabase session for authentication
  useEffect(() => {
    async function getSession() {
      const supabase = createClient();
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    }
    
    getSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) {
      setError("Display name is required");
      return;
    }

    if (!session?.access_token) {
      setError("Authentication required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/affiliate/init", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          display_name: displayName,
          bio: bio || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create affiliate account");
      }

      const data = await response.json();
      
      // Refetch the affiliate data to ensure we have the complete record
      const supabase = createClient();
      const { data: affiliateData, error: fetchError } = await supabase
        .from("affiliates")
        .select("*")
        .eq("user_id", user!.id)
        .single();
      
      if (fetchError) {
        throw new Error("Failed to fetch affiliate data after creation");
      }
      
      onSuccess(affiliateData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Become an Affiliate</CardTitle>
        <CardDescription>
          Join our affiliate program to earn rewards for referring new users.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {error && (
          <div className="p-3 mb-4 rounded-md text-destructive bg-destructive/10">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="displayName" className="block text-sm font-medium">
              Display Name *
            </label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="bio" className="block text-sm font-medium">
              Bio (Optional)
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              rows={4}
            />
          </div>
          
          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? "Creating..." : "Create Affiliate Account"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 