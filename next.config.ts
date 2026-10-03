import type { NextConfig } from "next";

function configuredSupabaseHostname() {
  try {
    return process.env.NEXT_PUBLIC_SUPABASE_URL
      ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
      : null;
  } catch {
    return null;
  }
}

const supabaseHostname = configuredSupabaseHostname();

const nextConfig: NextConfig = {
  deploymentId: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 32),
  poweredByHeader: false,
  serverExternalPackages: ["pdf-parse", "@napi-rs/canvas"],
  images: {
    qualities: [75, 90],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/v0/b/marsos-82cb1.appspot.com/o/**"
      },
      ...(supabaseHostname ? [{ protocol: "https" as const, hostname: supabaseHostname }] : [])
    ]
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }
        ]
      }
    ];
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "32mb"
    }
  }
};

export default nextConfig;
