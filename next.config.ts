import type { NextConfig } from "next";

const isStatic = process.env.STATIC_EXPORT === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: isStatic ? "export" : undefined,
  basePath: isStatic && basePath ? basePath : undefined,
  assetPrefix: isStatic && basePath ? basePath : undefined,
  images: {
    unoptimized: isStatic,
  },
  trailingSlash: isStatic,
};

export default nextConfig;
