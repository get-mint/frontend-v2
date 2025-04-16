import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "i.imgur.com",
      },
      {
        hostname: "jjotijqoowxkqhdocejo.supabase.co",
      },
    ],
  },
};

export default nextConfig;
