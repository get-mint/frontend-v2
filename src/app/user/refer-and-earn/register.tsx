"use client";

import { useState } from "react";

import { toast } from "sonner";

import { useAuth } from "@/lib/hooks/use-auth";

import { Tables } from "@/types/supabase";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface RegisterProps {
  onSuccess: (affiliate: Tables<"affiliates">) => void;
}

export function Register({ onSuccess }: RegisterProps) {
  const { authUser } = useAuth();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegisterAsAffiliate = async () => {
    if (!agreedToTerms) {
      toast.error("You must agree to the Terms of Service to continue.");
      return;
    }

    if (!authUser?.id) {
      toast.error("You must be logged in to register as an affiliate.");
      return;
    }

    setIsRegistering(true);
    try {
      const response = await fetch("/api/affiliates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agreedToTerms,
          authUserId: authUser.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to register as affiliate");
      }

      toast.success(data.message || "You are now registered as an affiliate.");

      if (data.affiliate) {
        onSuccess(data.affiliate);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(
        error.message ||
          "There was an error registering you as an affiliate. Please try again."
      );
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="flex flex-col items-center max-w-md mx-auto mt-8 space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Become an Affiliate</h2>
        <p className="mt-2 text-lg text-muted-foreground">
          Register as an affiliate and start earning rewards for every friend
          you refer!
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={agreedToTerms}
          onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
        />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none cursor-pointer"
        >
          I agree to the{" "}
          <a href="#" className="underline text-primary">
            Terms of Service
          </a>{" "}
          for affiliates
        </label>
      </div>

      <Button
        onClick={handleRegisterAsAffiliate}
        disabled={!agreedToTerms || isRegistering}
        size="lg"
      >
        {isRegistering ? "Registering..." : "Register as Affiliate"}
      </Button>
    </div>
  );
}
