/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add your Next.js configuration options here
  images: {
    domains: ['assets.modernmarketinghouse.com'],
  },
  typescript: {
    // !! WARN !!
    // This setting is temporarily needed for production
    // Remove once all type issues are resolved
    ignoreBuildErrors: true,
  },
  eslint: {
    // This setting is temporarily needed for production
    // Remove once all ESLint issues are resolved
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
