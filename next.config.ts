import type { NextConfig } from "next";

/**
 * hcng-overhaul - static export.
 * Set NEXT_PUBLIC_BASE_PATH=/hcng-overhaul to build for a GitHub Pages project page.
 * Leave it unset to serve at a domain root (hcng.net via public/CNAME).
 * The asset() helper reads the same env var so image paths stay correct either way.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: {
    unoptimized: true,
  },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
