import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: { taint: true },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.CMS_IMAGE_DOMAIN || '',
      },
    ],
    minimumCacheTTL: 31536000,
  },
  rewrites: async () => [
    { source: '/healthz', destination: '/api/health' },
    { source: '/api/healthz', destination: '/api/health' },
    { source: '/health', destination: '/api/health' },
    { source: '/ping', destination: '/api/health' },
  ],
  env: {
    NEXT_PUBLIC_SITE_BASE_URL:
      process.env.NEXT_PUBLIC_SITE_BASE_URL ??
      `https://${process.env.VERCEL_URL}`,
  },
}

export default nextConfig
