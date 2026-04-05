import type { NextConfig } from "next";

// На GitHub Actions змінна GITHUB_ACTIONS = 'true'
const isGH = process.env.GITHUB_ACTIONS === "true";
const basePath = isGH ? "/beachHouse" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : "",
  images: { unoptimized: true },
  transpilePackages: ["lenis"],
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
