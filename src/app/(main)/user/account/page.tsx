"use client";

import { format } from "date-fns";
import { Info, LogOut } from "lucide-react";

import { useAuth } from "@/lib/hooks/use-auth";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const { user, authUser } = useAuth();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full sm:w-64 text-destructive">
            <LogOut />
            Log Out
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-medium text-muted-foreground">
                  Email
                </h2>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Email changes require support assistance to maintain
                        tracking accuracy. Please contact support if you need to
                        update your email.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-lg">{authUser?.email}</p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-muted-foreground">
                Member Since
              </h2>
              <p className="text-lg">
                {user?.created_at
                  ? format(new Date(user.created_at), "MMMM yyyy")
                  : "Loading..."}
              </p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-muted-foreground text-wrap">
                Tracking ID
              </h2>
              <p className="text-lg font-mono break-all">{user?.tracking_id}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
