"use client";

import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Tables } from "@/types/supabase";

import { createClient } from "@/lib/supabase/client";

import { UsersTable } from "./users-table";

type User = Tables<"users"> & {
  is_admin: boolean;
  email: string;
};

export default function AdministratorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data: usersData, error: usersError } = await supabase
        .from("users")
        .select("*");

      if (usersError) throw usersError;

      // Check admin status for each user
      const usersWithAdminStatus = await Promise.all(
        usersData.map(async (user) => {
          const { data: isAdmin } = await supabase.rpc("is_admin", {
            user_id: user.id,
          });
          return { ...user, is_admin: isAdmin };
        })
      );

      // Get session token
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.access_token) {
        throw new Error("No session token available");
      }

      // Fetch emails for each user
      const usersWithEmails = await Promise.all(
        usersWithAdminStatus.map(async (user) => {
          try {
            const response = await fetch(`/api/users/email?userId=${user.id}`, {
              headers: {
                Authorization: `Bearer ${session.access_token}`,
              },
            });

            if (!response.ok) {
              let errorData;
              try {
                errorData = await response.json();
              } catch (e) {
                errorData = {
                  error: "Failed to parse error response",
                  details: `Server returned status ${response.status}`,
                  code: "PARSE_ERROR",
                };
              }

              console.error(
                `Error fetching email for user ${user.id}:`,
                JSON.stringify(errorData, null, 2)
              );

              return {
                ...user,
                email: `Error: ${errorData.error}${
                  errorData.details ? ` (${errorData.details})` : ""
                }`,
              };
            }

            const data = await response.json();
            return { ...user, email: data.email };
          } catch (error) {
            console.error(
              `Error processing email fetch for user ${user.id}:`,
              error instanceof Error ? error.message : "Unknown error"
            );
            return {
              ...user,
              email: `Error: ${
                error instanceof Error ? error.message : "Failed to fetch email"
              }`,
            };
          }
        })
      );

      setUsers(usersWithEmails);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleAdminStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        throw new Error("No session token available");
      }

      const response = await fetch("/api/users/toggle-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to toggle admin status");
      }

      const { is_admin } = await response.json();

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, is_admin } : user
        )
      );
    } catch (error) {
      console.error("Error toggling admin status:", error);
    }
  };

  if (loading) {
    return <div className="container mx-auto py-6">Loading...</div>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold">Administrators</h1>
      <Card>
        <CardContent>
          <UsersTable
            users={users}
            searchQuery={searchQuery}
            onSearchChange={handleSearch}
            onToggleAdmin={toggleAdminStatus}
          />
        </CardContent>
      </Card>
    </>
  );
}
