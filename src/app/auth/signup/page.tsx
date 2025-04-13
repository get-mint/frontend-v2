import { SignupForm } from "./form";

import { Card, CardContent } from "@/components/ui/card";

export default function SignupPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl animate-in fade-in slide-in-from-top-2 duration-500">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <SignupForm />
              <div className="relative hidden h-full bg-primary/40 md:block">
                <div className="absolute inset-0 h-full w-full flex items-center justify-center p-4">
                  <div className="flex flex-col gap-4 items-center">
                    <h2 className="text-3xl font-extrabold">
                      Ready to save money?
                    </h2>
                    <p className="text-lg text-balance font-semibold text-secondary text-center">
                      Join Mint today and start saving money on your favorite
                      brands. 💸
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
            By clicking continue, you agree to our{" "}
            <a href="/info/legal/terms-of-service">Terms of Service</a> and{" "}
            <a href="/info/legal/privacy-policy">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
