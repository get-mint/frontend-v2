// This file defines the API routes for handling network event-related operations.

import { NextRequest, NextResponse } from "next/server";
import { getRakutenEvents } from "./rakuten";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const network = searchParams.get("network");

  if (!network) {
    return NextResponse.json({ error: "Network is required" }, { status: 400 });
  }

  if (network === "rakuten") {
    return getRakutenEvents(request);
  } else {
    return NextResponse.json({ error: "Network not supported" }, { status: 400 });
  }
}

/**
 * THe api route will be api/events/networks=?
 * 
 * The query params will be the network that will be in the url
 * 
 * In rakuten,
 * Ill pull from DB the last update from DB
 * Then ill use that and query Rakuten events API, grabbing
 * from last update date to now. 
 * 
 * Now create a method to handle each separate transaction based on the network
 * In this method, we take the orderid, sku, and the sales amount(amount) 
 * and then we will insert this into DB. 
 * If the "is_event=n", we handle it as a balance transaction.
 * What does mean? This means that we will add the amount 
 * times the split rate as a balance to the user. 
 * 
 * If the user's bonus is not closed, we will add a entry
 * the rest of the comission to the affiliate.
 * The amount = comission > 0 ? min(0.5 * comission, 5 - bonus_balance) : 0.5 * comission
 * If the balance + 0.5 * comission > 5, close the bonus status.
 * 
 * Then we will update the user balance
 * 
 * Then we will repeat the process for all the transactions
 * 
 * Update the last update date for the network.
 */

