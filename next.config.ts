import type { NextConfig } from "next";

import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    // Enable unoptimized for placeholder SVG images during development.
    // Remove this when real photos are added.
    unoptimized: true,
  },
};

export default nextConfig;
