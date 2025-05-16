import { getAccessToken } from "@/app/api/networks/rakuten";

import { createAdminClient } from "@/lib/supabase/server/client";

import { Tables } from "@/types/supabase";

import { NextRequest, NextResponse } from "next/server";

function formatDateForRakuten(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return (
    date.getUTCFullYear() +
    "-" +
    pad(date.getUTCMonth() + 1) +
    "-" +
    pad(date.getUTCDate()) +
    "%20" +
    pad(date.getUTCHours()) +
    ":" +
    pad(date.getUTCMinutes()) +
    ":" +
    pad(date.getUTCSeconds())
  );
}

export async function getRakutenEvents(request: NextRequest) {
  const supabase = createAdminClient();
  const accessToken = await getAccessToken();

  const { data, error } = await supabase
    .from("networks")
    .select("*")
    .eq("id", "1")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const last_transaction_date = data.transactions_last_updated_at;
  const now = new Date();

  // Parse last_transaction_date from DB
  const lastTransactionDateObj = new Date(last_transaction_date);

  // Format both dates
  const formattedLastTransactionDate = formatDateForRakuten(lastTransactionDateObj);
  const formattedNow = formatDateForRakuten(new Date());

  console.log(formattedLastTransactionDate); // e.g. 2025-05-16%2000:48:00
  console.log(formattedNow); // e.g. 2024-06-13%2017:45:23

  try {
    const response = await fetch(
      `https://api.linksynergy.com/events/1.0/transactions?process_date_start=${formattedLastTransactionDate}&process_date_end=${formattedNow}`,
      {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
    );

    const data = await response.json();
    console.log(data);

    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}