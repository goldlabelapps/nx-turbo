declare module "next-pwa" {
  import type { NextConfig } from "next";

  type PWAOptions = {
    dest: string;
    disable?: boolean;
    register?: boolean;
    skipWaiting?: boolean;
  };

  type WithPWA = (options?: PWAOptions) => (config: NextConfig) => NextConfig;

  const withPWA: WithPWA;
  export default withPWA;
}
