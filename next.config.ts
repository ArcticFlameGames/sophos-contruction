import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import { join } from 'path';
import { copyFileSync, existsSync, mkdirSync } from 'fs';

// This ensures the messages directory is included in the output
const copyMessages = () => {
  const messagesDir = join(process.cwd(), 'messages');
  const outputDir = join(process.cwd(), 'public/messages');
  
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }
  
  // Copy all JSON files from messages/ to public/messages/
  if (existsSync(messagesDir)) {
    const fs = require('fs');
    const path = require('path');
    
    fs.readdirSync(messagesDir).forEach((file: string) => {
      if (file.endsWith('.json')) {
        const srcPath = path.join(messagesDir, file);
        const destPath = path.join(outputDir, file);
        fs.copyFileSync(srcPath, destPath);
      }
    });
  }
};

// Execute the copy function when the config is loaded
copyMessages();

// Configure next-intl with the i18n configuration
const withNextIntl = createNextIntlPlugin('./src/lib/i18n.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'source.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    // Add any experimental features here
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  webpack: (config, { isServer }) => {
    // Handle SVG imports
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    // Copy files from messages to public/messages during build
    if (isServer) {
      const fs = require('fs');
      const path = require('path');
      
      const messagesDir = path.join(process.cwd(), 'messages');
      const publicDir = path.join(process.cwd(), 'public/messages');
      
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }
      
      if (fs.existsSync(messagesDir)) {
        fs.readdirSync(messagesDir).forEach((file: string) => {
          if (file.endsWith('.json')) {
            const srcPath = path.join(messagesDir, file);
            const destPath = path.join(publicDir, file);
            
            // Only copy if the file doesn't exist or is different
            if (!fs.existsSync(destPath) || 
                fs.readFileSync(srcPath, 'utf8') !== fs.readFileSync(destPath, 'utf8')) {
              fs.copyFileSync(srcPath, destPath);
            }
          }
        });
      }
    }
    
    return config;
  },
};

export default withNextIntl(nextConfig);
