import { SignupForm } from "./form";

import { Card, CardContent } from "@/components/ui/card";

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center p-6 min-h-svh bg-muted md:p-10">
      <div className="w-full max-w-sm duration-500 md:max-w-3xl animate-in fade-in slide-in-from-top-2">
        <div className="flex flex-col gap-6">
          <Card className="p-0 overflow-hidden">
            <CardContent className="grid p-0 md:grid-cols-2">
              <SignupForm />
              <div className="relative hidden h-full bg-gradient-to-br from-primary to-primary/70 md:block">
                <div className="absolute inset-0 flex items-center justify-center w-full h-full p-4">
                  <div className="flex flex-col items-center gap-4">
                    <h2 className="text-3xl font-extrabold text-white">
                      Ready to save money?
                    </h2>
                    <p className="text-lg font-semibold text-center text-white text-balance">
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
            <a href="/terms">Terms and Conditions</a> and{" "}
            <a href="/privacy">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
