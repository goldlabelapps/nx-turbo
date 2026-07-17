import type { NextConfig } from "next";
import withPWA from "next-pwa";

const isDevelopment = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  transpilePackages: ["@nx/design-system", "@nx/firebase-adapter"],
};

export default withPWA({
  dest: "public",
  disable: isDevelopment,
  register: true,
  skipWaiting: true,
})(nextConfig);