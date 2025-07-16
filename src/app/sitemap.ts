import { MetadataRoute } from 'next';
import { locales, defaultLocale } from '@/i18n-config';

// Define the structure of your routes
const routes = [
  { path: '/', lastModified: new Date() },
  { path: '/home', lastModified: new Date() },
  { path: '/services', lastModified: new Date() },
  { path: '/projects', lastModified: new Date() },
  { path: '/about', lastModified: new Date() },
  { path: '/contact', lastModified: new Date() },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Base URL from environment variable or default to localhost
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sophos-construction.vercel.app';
  
  // Generate sitemap entries for each locale and route
  return locales.flatMap((locale) => {
    return routes.map((route) => ({
      url: `${baseUrl}${locale === defaultLocale ? '' : `/${locale}`}${route.path === '/home' ? '' : route.path}`,
      lastModified: route.lastModified,
      changeFrequency: 'weekly' as const,
      priority: route.path === '/' || route.path === '/home' ? 1 : 0.8,
    }));
  });
}
