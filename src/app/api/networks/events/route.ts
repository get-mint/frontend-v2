// This file defines the API routes for handling network event-related operations.

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Hello, world!" });
}