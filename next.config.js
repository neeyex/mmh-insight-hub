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
  // Add experimental features to handle Supabase edge functions
  experimental: {
    serverComponentsExternalPackages: ['@supabase/ssr'],
  },
  // Handle environment variables during build
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-url.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key',
  },
};

module.exports = nextConfig;
