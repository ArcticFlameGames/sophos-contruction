import { Metadata } from 'next';
import { Locale } from '@/i18n-config';

type Props = {
  params: { locale: Locale };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  // Can be imported from a shared config if needed
  const messages = (await import(`@/messages/${locale}.json`)).default;
  
  return {
    title: {
      default: messages.metadata?.title || 'Sophos Construction',
      template: `%s | ${messages.metadata?.title || 'Sophos Construction'}`,
    },
    description: messages.metadata?.description || 'Professional construction and renovation services',
    keywords: messages.metadata?.keywords || 'construction, renovation, building, contractor',
    
    // Open Graph / Social Media
    openGraph: {
      title: messages.metadata?.title || 'Sophos Construction',
      description: messages.metadata?.description || 'Professional construction and renovation services',
      url: 'https://sophos-construction.vercel.app',
      siteName: 'Sophos Construction',
      locale: locale,
      type: 'website',
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: messages.metadata?.title || 'Sophos Construction',
      description: messages.metadata?.description || 'Professional construction and renovation services',
      creator: '@sophosconstruction',
    },
    
    // Other metadata
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    // Favicon
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
    
    // Theme Color
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: '#ffffff' },
      { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
    ],
  };
}

// This function generates static params for all locales
export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}
