"use client";

import { createContext, useEffect, useState } from "react";

import { User as AuthUser } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/client";

import { Tables } from "@/types/supabase";

export const AuthContext = createContext<
  | {
      authUser: AuthUser | undefined;
      user: Tables<"users"> | undefined;
      logIn: (email: string, password: string) => any;
      logOut: () => any;
      refreshUser: () => any;
      selectedCurrency: Tables<"currencies"> | undefined;
    }
  | undefined
>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authUser, setAuthUser] = useState<AuthUser | undefined>(undefined);
  const [user, setUser] = useState<Tables<"users"> | undefined>(undefined);
  const [selectedCurrency, setSelectedCurrency] = useState<
    Tables<"currencies"> | undefined
  >(undefined);

  const fetchAuthUser = async () => {
    const supabase = createClient();

    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error("Failed to fetch auth user:", error);
      setAuthUser(undefined);
      return;
    }

    setAuthUser(session?.user || undefined);
  };

  useEffect(() => {
    fetchAuthUser();
  }, []);

  const fetchUser = async () => {
    if (!authUser?.id) {
      setUser(undefined);
      return;
    }

    const supabase = createClient();

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("auth_user_id", authUser.id)
      .maybeSingle();

    if (error) {
      console.error("Failed to fetch user:", error);
      setUser(undefined);
      return;
    }

    setUser(data);
  };

  useEffect(() => {
    fetchUser();
  }, [authUser]);

  const fetchSelectedCurrency = async () => {
    if (!user?.id) {
      setSelectedCurrency(undefined);
      return;
    }

    const supabase = createClient();

    const { data, error } = await supabase
      .from("currencies")
      .select("*")
      .eq("id", user.selected_currency_id)
      .maybeSingle();

    if (error) {
      console.error("Failed to fetch selected currency:", error);
      setSelectedCurrency(undefined);
      return;
    }

    setSelectedCurrency(data);
  };

  useEffect(() => {
    fetchSelectedCurrency();
  }, [user]);

  const logIn = async (
    email: string,
    password: string
  ): Promise<{ authUser: AuthUser | undefined; error?: string }> => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { authUser: undefined, error: error.message };
    }

    setAuthUser(data.user);

    await fetchUser();
    await fetchSelectedCurrency();

    return { authUser: data.user };
  };

  const logOut = async () => {
    const supabase = createClient();

    await supabase.auth.signOut();

    setAuthUser(undefined);
    setUser(undefined);
    setSelectedCurrency(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        user,
        logIn,
        logOut,
        refreshUser: fetchUser,
        selectedCurrency,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
