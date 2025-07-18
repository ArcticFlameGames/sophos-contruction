// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    serverActions: true,
  },
  compiler: {
    styledComponents: true,
  },
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
  // Ensure static files in public are served
  async headers() {
    return [
      {
        source: '/messages/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    // Add file loader for static files
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
      type: 'asset/resource',
    });

    // Handle SVG imports
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.('.svg')
    ) as any;
    
    if (fileLoaderRule) {
      config.module.rules.push(
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/, // *.svg?url
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          resourceQuery: { not: /url/ }, // exclude if *.svg?url
          use: ['@svgr/webpack'],
        }
      );
    }

    // Exclude node modules from being processed by webpack
    config.externals = [...(config.externals || []), 'fs', 'child_process'];

    // Fixes npm packages that depend on `node:` protocol
    config.resolve.fallback = { 
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      dns: false,
      child_process: false,
    };

    return config;
  },
};

// Configure next-intl plugin
const withNextIntl = require('next-intl/plugin')('./src/lib/i18n.ts');

module.exports = withNextIntl(nextConfig);
