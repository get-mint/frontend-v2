"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LaunchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [countdown, setCountdown] = useState<number>(3);
  const [redirectUrl, setRedirectUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRedirectLink = async () => {
      const domain = searchParams.get("domain");
      const email = searchParams.get("email");

      if (!domain || !email) {
        console.error("Missing domain or email parameter");
        router.back();
        return;
      }

      const response = await fetch(
        `/api/brands/link?link=https://${domain}&email=${email}`
      );

      if (!response.ok) {
        console.error("Failed to get redirect link");
        router.back();
        return;
      }

      const data = await response.json();

      setRedirectUrl(data.link);
      setIsLoading(false);
    };

    fetchRedirectLink();
  }, [searchParams]);

  useEffect(() => {
    if (redirectUrl && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (redirectUrl && countdown === 0) {
      window.location.href = redirectUrl;
    }
  }, [redirectUrl, countdown]);

  return isLoading ? (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Loader className="mb-4 size-14 text-primary" />
      <p className="text-lg font-semibold text-muted-foreground">
        Preparing your link...
      </p>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="p-12 mx-auto my-8">
        <CardHeader>
          <CardTitle>Redirecting in {countdown}...</CardTitle>
          <CardDescription>
            You will be redirected shortly. If nothing happens, please click the
            button below.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <div className="font-bold text-primary text-7xl">{countdown}</div>
          <Button
            variant="default"
            onClick={() => (window.location.href = redirectUrl)}
          >
            Go Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
