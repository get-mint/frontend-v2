"use client";

import { useEffect, useState } from "react";

import { LoaderCircle } from "lucide-react";

import { useAuth } from "@/lib/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
export default function DashboardPage() {
  const { user, authUser, isAuthenticated } = useAuth();

  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: "N/A",
    totalTransactions: "N/A",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);

      const supabase = createClient();

      const { count, error } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true });

      if (error) {
        console.error("Error fetching user count:", error);
        return;
      }

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const thirtyDaysAgoISOString = thirtyDaysAgo.toISOString();

      const { count: activeCount, error: activeError } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true })
        .gte("last_active_at", thirtyDaysAgoISOString);

      if (activeError) {
        console.error("Error fetching active user count:", activeError);
      }

      setStats({
        totalUsers: count || 0,
        activeUsers: activeError
          ? "Error loading"
          : (activeCount || 0).toString(),
        totalTransactions: "N/A (placeholder)",
      });

      setIsLoading(false);
    };

    if (isAuthenticated) {
      fetchStats();
    }
  }, [isAuthenticated]);

  return isLoading ? (
    <LoaderCircle className="animate-spin size-12" />
  ) : (
    <>
      <h1 className="text-4xl font-bold">Admin</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="animate-in fade-in zoom-in-95">
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
            <CardDescription>All registered users</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalUsers}</p>
          </CardContent>
        </Card>

        <Card className="animate-in fade-in zoom-in-95">
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
            <CardDescription>Users active in last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.activeUsers}</p>
          </CardContent>
        </Card>

        <Card className="animate-in fade-in zoom-in-95">
          <CardHeader>
            <CardTitle>Total Transactions</CardTitle>
            <CardDescription>All processed transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalTransactions}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-5">
        <Card className="animate-in fade-in zoom-in-95">
          <CardHeader>
            <CardTitle>User Information</CardTitle>
            <CardDescription>
              Currently authenticated user details
            </CardDescription>
          </CardHeader>
          <CardContent>
            {user && authUser ? (
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">User ID:</span> {user.user_id}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {authUser.email}
                </p>
                <p>
                  <span className="font-semibold">Created:</span>{" "}
                  {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>
            ) : (
              <p>Not authenticated or user data unavailable</p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
