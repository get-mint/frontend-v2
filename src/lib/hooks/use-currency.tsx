"use client";

import * as React from "react";

import { CurrencyContext } from "@/lib/providers/currency-provider";

export function useCurrency() {
  const context = React.useContext(CurrencyContext);

  if (!context) {
    throw new Error("useCurrency must be used within an CurrencyProvider");
  }

  return context;
}
