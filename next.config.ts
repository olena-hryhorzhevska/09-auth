import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "ac.goit.global" }],
  },
  turbopack: {
    root: __dirname,
  },
  /* config options here */
};

export default nextConfig;
