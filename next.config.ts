import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { join } from 'path';
import {
  existsSync,
  mkdirSync,
  copyFileSync,
  readdirSync,
  rmSync,
  Dirent,
} from 'fs';

// Copy messages from /messages to /public/messages
const copyMessages = () => {
  const srcDir = join(process.cwd(), 'messages');
  const destDir = join(process.cwd(), 'public/messages');

  try {
    if (existsSync(destDir)) {
      rmSync(destDir, { recursive: true, force: true });
    }
    mkdirSync(destDir, { recursive: true });

    const files = readdirSync(srcDir, { withFileTypes: true });

    for (const file of files) {
      if (
        file.isFile() &&
        (file.name.endsWith('.json') || file.name.endsWith('.jsonc'))
      ) {
        const srcPath = join(srcDir, file.name);
        const destPath = join(destDir, file.name);
        copyFileSync(srcPath, destPath);
        console.log(`✔ Copied ${file.name}`);
      }
    }
  } catch (error) {
    console.error('❌ Failed to copy messages:', error);
  }
};

// Only copy messages in production
if (process.env.NODE_ENV === 'production') {
  console.log('🔁 Copying locale messages...');
  copyMessages();
}

// Configure next-intl with your i18n config
const withNextIntl = createNextIntlPlugin('./src/lib/i18n.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'source.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
  },
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default withNextIntl(nextConfig);
