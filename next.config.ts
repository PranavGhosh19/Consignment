import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enforce non-trailing slash URLs for indexable canonical paths
  trailingSlash: false,

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      // 301 Permanent Redirects for Clean Canonical Architecture
      {
        source: '/importer-buyer',
        destination: '/for-importers',
        permanent: true,
      },
      {
        source: '/importer',
        destination: '/for-importers',
        permanent: true,
      },
      {
        source: '/exporter-shipper',
        destination: '/for-exporters',
        permanent: true,
      },
      {
        source: '/exporter',
        destination: '/for-exporters',
        permanent: true,
      },
      {
        source: '/carrier-vendor',
        destination: '/for-carriers',
        permanent: true,
      },
      {
        source: '/carrier',
        destination: '/for-carriers',
        permanent: true,
      },
      {
        source: '/demand',
        destination: '/find-demand',
        permanent: true,
      },
      {
        source: '/terms-of-service',
        destination: '/terms',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Permissions-Policy',
            value: 'payment=self',
          },
          {
            key: 'Content-Security-Policy',
            value: 'upgrade-insecure-requests',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
      {
        // Cache static assets and images aggressively
        source: '/(.*).(png|jpg|jpeg|webp|avif|ico|svg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
