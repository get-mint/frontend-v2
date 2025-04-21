"use client";

import { useState } from "react";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "@/lib/hooks/use-auth";
import { createClient, getJwt } from "@/lib/supabase/client";

import { Tables } from "@/types/supabase";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  displayName: z.string().min(1, "Display name is required"),
  bio: z.string().optional(),
});

export function Onboarding({
  onSuccess,
}: {
  onSuccess: (affiliate: Tables<"affiliates">) => void;
}) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: "",
      bio: "",
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const jwt = await getJwt(supabase);

      if (!jwt) {
        setError("Authentication required");
        return;
      }

      const response = await fetch("/api/affiliate/init", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          display_name: values.displayName,
          bio: values.bio || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Failed to create affiliate account"
        );
      }

      const { data: affiliateData, error: fetchError } = await supabase
        .from("affiliates")
        .select("*")
        .eq("user_id", user?.user_id)
        .single();

      if (fetchError) {
        throw new Error("Failed to fetch affiliate data after creation");
      }

      onSuccess(affiliateData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Onboarding</CardTitle>
        <CardDescription>
          Please fill out the following information to onboard as an affiliate.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {error && (
          <div className="p-3 mb-4 rounded-md text-destructive bg-destructive/10">
            {error}
          </div>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your display name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about yourself"
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A short description that will be visible on your profile.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating..." : "Create Affiliate Account"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
