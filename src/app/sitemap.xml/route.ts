import { MetadataRoute } from 'next';
import { locales } from '@/i18n-config';

export default function sitemapIndex(): MetadataRoute.Sitemap {
  // Base URL from environment variable or default to localhost
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sophos-construction.vercel.app';
  
  // Create a sitemap index that references all language-specific sitemaps
  return [
    {
      url: `${baseUrl}/sitemap.xml`,
      lastModified: new Date(),
    },
    ...locales.map((locale) => ({
      url: `${baseUrl}/${locale}/sitemap.xml`,
      lastModified: new Date(),
    })),
  ];
}
