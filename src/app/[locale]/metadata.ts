import { Metadata } from 'next';
import { Locale } from '@/i18n-config';

type Props = {
  params: { locale: Locale };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const messages = (await import(`@/messages/${locale}.json`)).default;
  
  return {
    title: {
      default: messages.metadata?.title || 'Sophos Construction',
      template: `%s | ${messages.metadata?.title || 'Sophos Construction'}`,
    },
    description: messages.metadata?.description || 'Professional construction and renovation services',
    keywords: messages.metadata?.keywords || 'construction, renovation, building, contractor',
    openGraph: {
      title: messages.metadata?.title || 'Sophos Construction',
      description: messages.metadata?.description || 'Professional construction and renovation services',
      url: 'https://sophos-construction.vercel.app',
      siteName: 'Sophos Construction',
      locale: locale === 'fr' ? 'fr-FR' : 'en-US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.metadata?.title || 'Sophos Construction',
      description: messages.metadata?.description || 'Professional construction and renovation services',
      creator: '@sophosconstruction',
    },
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
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: '#ffffff' },
      { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
    ],
  };
}

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}
