import type { NextConfig } from "next";
import { withEve } from "eve/next";
import withPWA from "next-pwa";

const isDevelopment = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  transpilePackages: ["@nx/unix", "@nx/nx-firebase", "nx-agent"],
};

const withPwaConfig = withPWA({
  dest: "public",
  disable: isDevelopment,
  register: true,
  skipWaiting: true,
})(nextConfig);

export default withEve(withPwaConfig, {
  eveRoot: "../../packages/nx-agent",
});