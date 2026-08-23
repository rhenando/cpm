import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  deploymentId: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 32),
  serverExternalPackages: ["pdf-parse", "@napi-rs/canvas"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cordovaproperty.com" },
      { protocol: "https", hostname: "property.breakout-website.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
      { protocol: "https", hostname: "**.supabase.co" }
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb"
    }
  }
};

export default nextConfig;
