/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@nx/ui', '@nx/design-system'],
};

module.exports = nextConfig;
