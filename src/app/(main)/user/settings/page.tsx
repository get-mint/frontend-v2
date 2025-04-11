"use client";

import { useAuth } from "@/lib/hooks/use-auth";

import { LogOut } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function UserSettingsPage() {
  const { logOut } = useAuth();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>

        <CardContent>
          <Button
            variant="outline"
            className="w-full sm:w-auto text-destructive"
            onClick={() => logOut()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
