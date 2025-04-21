"use client";

import { useState, useEffect } from "react";

import { createClient } from "@/lib/supabase/client";
import { useCurrency } from "@/lib/providers/currency-provider";

import { Tables } from "@/types/supabase";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader";

interface RewardStage extends Tables<"affiliate_reward_stages"> {
  referral_count: number; // Added this to match updated database schema
}

export default function Dashboard({
  affiliate,
}: {
  affiliate: Tables<"affiliates">;
}) {
  const { currency } = useCurrency();

  const [referralCodes, setReferralCodes] = useState<
    Tables<"affiliate_codes">[]
  >([]);
  const [rewardStages, setRewardStages] = useState<RewardStage[]>([]);
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
        const { data: codesData, error: codesError } = await supabase
          .from("affiliate_codes")
          .select("*")
          .eq("affiliate_id", affiliate.id)
          .order("created_at", { ascending: true });

        if (codesError) throw codesError;
        setReferralCodes(codesData || []);

        const { data: stagesData, error: stagesError } = await supabase
          .from("affiliate_reward_stages")
          .select("*")
          .eq("affiliate_id", affiliate.id)
          .order("referral_count", { ascending: true });

        if (stagesError) throw stagesError;
        setRewardStages((stagesData as RewardStage[]) || []);

        const { data: entriesData, error: entriesError } = await supabase
          .from("affiliate_balance_entries")
          .select("*")
          .eq("affiliate_id", affiliate.id)
          .order("created_at", { ascending: false });

        if (entriesError) throw entriesError;
        setBalanceEntries(entriesData || []);

        const totalEarnings = entriesData
          ? entriesData.reduce((sum, entry) => sum + entry.amount, 0)
          : 0;

        const { count, error: countError } = await supabase
          .from("users")
          .select("*", { count: "exact", head: true })
          .eq("referred_by_code", codesData?.[0]?.code || "");

        if (countError) throw countError;

        let currentRewardPct = 0;
        if (stagesData && stagesData.length > 0) {
          const applicableStage = (stagesData as RewardStage[]).find(
            (stage) => count !== null && count >= stage.referral_count
          );
          currentRewardPct = applicableStage
            ? applicableStage.reward_pct
            : (stagesData as RewardStage[])[0].reward_pct;
        }

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

  const mainReferralCode =
    referralCodes.length > 0 ? referralCodes[0].code : "No code available";

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency?.acronym || "USD",
    }).format(amount);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="space-y-6">
      {/* Stats Section Moved to Top */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Referred Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.referredUsers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {formatCurrency(stats.totalEarnings)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Current Reward %</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.currentRewardPct}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Profile and Referral Code in 2 columns */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
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

        <Card>
          <CardHeader>
            <CardTitle>Your Referral Code</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={mainReferralCode}
                readOnly
                className="flex-1 p-2 border rounded-md bg-accent"
                aria-label="Your referral code"
              />
              <Button
                onClick={() => navigator.clipboard.writeText(mainReferralCode)}
                variant="secondary"
              >
                Copy
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

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
                          {formatCurrency(entry.amount)}
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
