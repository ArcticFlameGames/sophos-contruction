'use client';

import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Locale } from '@/i18n-config';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';

// Import the Messages type from our declarations
import type { Messages } from 'next-intl';

// Client-side hooks
export function useLocaleSwitcher() {
  const pathname = usePathname() || '';
  const router = useRouter();

  const switchLocale = useCallback((newLocale: Locale) => {
    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(/^\/(en|fr)/, '') || '/';
    // Navigate to the new locale with the same path
    router.push(`/${newLocale}${pathWithoutLocale}`);
  }, [pathname, router]);

  return { switchLocale };
}

export function useCurrentLocale(): Locale {
  const pathname = usePathname() || '';
  const locale = pathname.split('/')[1];
  return isLocale(locale) ? locale : 'fr';
}

export function isLocale(value: string): value is Locale {
  return ['fr', 'en'].includes(value);
}

// Server-side configuration
export default getRequestConfig(async ({ locale }) => {
  // Ensure the locale is supported
  const validLocale = locale && isLocale(locale) ? locale : 'fr';
  
  try {
    // Dynamically import the messages for the requested locale
    const messages = (await import(`../../messages/${validLocale}.json`)).default;
    
    return {
      locale: validLocale,
      messages,
      // You can add other i18n options here if needed
    };
  } catch (error) {
    console.error(`Failed to load messages for locale: ${validLocale}`, error);
    notFound();
  }
});
