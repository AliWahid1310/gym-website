import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Enable unoptimized for placeholder SVG images during development.
    // Remove this when real photos are added.
    unoptimized: true,
  },
};

export default nextConfig;
