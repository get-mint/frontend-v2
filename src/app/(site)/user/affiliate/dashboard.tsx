"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Tables } from "@/types/supabase";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AffiliateDashboardProps {
  affiliate: Tables<"affiliates">;
}

export default function AffiliateDashboard({
  affiliate,
}: AffiliateDashboardProps) {
  const [referralCodes, setReferralCodes] = useState<
    Tables<"affiliate_codes">[]
  >([]);
  const [rewardStages, setRewardStages] = useState<
    Tables<"affiliate_reward_stages">[]
  >([]);
  const [balanceEntries, setBalanceEntries] = useState<
    Tables<"affiliate_balance_entries">[]
  >([]);
  const [stats, setStats] = useState({
    referredUsers: 0,
    totalEarnings: 0,
    currentRewardPct: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAffiliateData() {
      const supabase = createClient();

      try {
        // Fetch referral codes
        const { data: codesData, error: codesError } = await supabase
          .from("affiliate_codes")
          .select("*")
          .eq("affiliate_id", affiliate.id)
          .order("created_at", { ascending: true });

        if (codesError) throw codesError;
        setReferralCodes(codesData || []);

        // Fetch reward stages
        const { data: stagesData, error: stagesError } = await supabase
          .from("affiliate_reward_stages")
          .select("*")
          .eq("affiliate_id", affiliate.id)
          .order("month", { ascending: true });

        if (stagesError) throw stagesError;
        setRewardStages(stagesData || []);

        // Fetch balance entries
        const { data: entriesData, error: entriesError } = await supabase
          .from("affiliate_balance_entries")
          .select("*")
          .eq("affiliate_id", affiliate.id)
          .order("created_at", { ascending: false });

        if (entriesError) throw entriesError;
        setBalanceEntries(entriesData || []);

        // Calculate total earnings
        const totalEarnings = entriesData
          ? entriesData.reduce((sum, entry) => sum + entry.amount, 0)
          : 0;

        // Get current reward percentage (latest applicable one)
        const currentRewardPct =
          stagesData && stagesData.length > 0 ? stagesData[0].reward_pct : 0;

        // Count referred users (done through RLS on Supabase)
        const { count, error: countError } = await supabase
          .from("users")
          .select("*", { count: "exact", head: true })
          .eq("referred_by_code", codesData?.[0]?.code || "");

        if (countError) throw countError;

        setStats({
          referredUsers: count || 0,
          totalEarnings,
          currentRewardPct,
        });
      } catch (error) {
        console.error("Error fetching affiliate data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAffiliateData();
  }, [affiliate.id]);

  const copyReferralCode = (code: string) => {
    navigator.clipboard.writeText(`mintcashback.com/refer?code=${code}`);
    // Could add toast notification here
  };

  if (loading) {
    return <div className="py-8 text-center">Loading affiliate data...</div>;
  }

  const mainReferralCode =
    referralCodes.length > 0 ? referralCodes[0].code : "No code available";

  return (
    <div className="space-y-6">
      {/* Profile Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            {affiliate.avatar_url && (
              <img
                src={affiliate.avatar_url}
                alt={affiliate.display_name}
                className="object-cover w-16 h-16 rounded-full"
              />
            )}
            <div>
              <h2 className="text-xl font-semibold">
                {affiliate.display_name}
              </h2>
              {affiliate.bio && (
                <p className="mt-1 text-muted-foreground">{affiliate.bio}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Referral Code Section */}
      <Card>
        <CardHeader>
          <CardTitle>Your Referral Link</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={`mintcashback.com/refer?code=${mainReferralCode}`}
              readOnly
              className="flex-1 p-2 border rounded-md bg-accent"
              aria-label="Your referral link"
            />
            <Button
              onClick={() => copyReferralCode(mainReferralCode)}
              variant="secondary"
            >
              Copy
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Section */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-sm font-medium text-muted-foreground">
              Referred Users
            </h3>
            <p className="mt-2 text-2xl font-bold">{stats.referredUsers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-sm font-medium text-muted-foreground">
              Total Earnings
            </h3>
            <p className="mt-2 text-2xl font-bold">
              ${stats.totalEarnings.toFixed(2)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-sm font-medium text-muted-foreground">
              Current Reward %
            </h3>
            <p className="mt-2 text-2xl font-bold">{stats.currentRewardPct}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Reward Schedule Table */}
      <Card>
        <CardHeader>
          <CardTitle>Reward Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          {rewardStages.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-muted-foreground">
                      Month
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-muted-foreground">
                      Reward %
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {rewardStages.map((stage) => (
                    <tr key={stage.id}>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        {stage.month}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        {stage.reward_pct}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="italic text-muted-foreground">
              No reward stages configured
            </p>
          )}
        </CardContent>
      </Card>

      {/* Earnings History */}
      <Card>
        <CardHeader>
          <CardTitle>Earnings History</CardTitle>
        </CardHeader>
        <CardContent>
          {balanceEntries.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-muted-foreground">
                      Date
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-muted-foreground">
                      Description
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase text-muted-foreground">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {balanceEntries.map((entry) => (
                    <tr key={entry.id}>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        {new Date(entry.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        {entry.note ||
                          `${
                            entry.type.charAt(0).toUpperCase() +
                            entry.type.slice(1)
                          }`}
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        <span
                          className={
                            entry.amount >= 0
                              ? "text-primary"
                              : "text-destructive"
                          }
                        >
                          {entry.amount >= 0 ? "+" : ""}
                          {entry.amount.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="italic text-muted-foreground">
              No earnings history yet
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
