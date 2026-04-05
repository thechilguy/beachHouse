import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/beachHouse",
  assetPrefix: "/beachHouse/",
  images: { unoptimized: true },
};

export default nextConfig;
