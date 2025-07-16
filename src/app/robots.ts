import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Disallow admin and API routes
      disallow: ['/admin/', '/api/'],
    },
    // Sitemap URLs for each language
    sitemap: [
      'https://sophos-construction.vercel.app/sitemap.xml',
      'https://sophos-construction.vercel.app/fr/sitemap.xml',
      'https://sophos-construction.vercel.app/en/sitemap.xml',
    ],
  };
}
