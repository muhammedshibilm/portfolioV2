import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pwa: withPWA({
    dest: "public",
    disable: process.env.NODE_ENV !== "production",
    register: true,
    skipWaiting: true,
    navigationPreload: true,
    
  }),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-images-1.medium.com",
      },
    ],
  },
};

export default nextConfig;
