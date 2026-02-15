import type { NextConfig } from "next";

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV !== "production",
  register: true,
  skipWaiting: true,
  navigationPreload: true,
  cacheOnFrontEndNav: true,
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-images-1.medium.com",
      },
    ],
  },
};

export default withPWA(nextConfig);
