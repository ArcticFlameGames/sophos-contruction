import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: [
      'https://sophos-construction.vercel.app/sitemap.xml',
      'https://sophos-construction.vercel.app/fr/sitemap.xml',
      'https://sophos-construction.vercel.app/en/sitemap.xml',
    ],
  };
}
