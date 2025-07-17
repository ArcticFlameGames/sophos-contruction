'use client';

import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import path from 'path';
import fs from 'fs/promises';
import { Locale } from '@/i18n-config';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';

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

// Helper function to load messages from the public directory
async function loadMessagesFromPublic(locale: string) {
  try {
    const publicPath = path.join(process.cwd(), 'public', 'messages', `${locale}.json`);
    const fileContent = await fs.readFile(publicPath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.warn(`Could not load messages from public directory for ${locale}`);
    return null;
  }
}

// Helper function to load messages directly (for development)
async function loadMessagesDirectly(locale: string) {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    console.warn(`Could not load messages directly for ${locale}`);
    return null;
  }
}

// Server-side configuration
export default getRequestConfig(async ({ locale }) => {
  // Ensure the locale is supported
  if (locale !== 'fr' && locale !== 'en') notFound();

  try {
    // Try to load messages from the public directory first
    let messages = await loadMessagesFromPublic(locale);
    
    // If not found in public directory, try direct import (for development)
    if (!messages) {
      messages = await loadMessagesDirectly(locale);
    }
    
    // If still no messages, throw an error
    if (!messages) {
      throw new Error(`Failed to load messages for locale: ${locale}`);
    }
    
    return {
      locale,
      messages,
      // Set default timezone to UTC to avoid hydration mismatches
      timeZone: 'UTC',
      // Set default date and time formats
      formats: {
        dateTime: {
          short: {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          }
        },
        number: {
          currency: {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          }
        }
      }
    };
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    notFound();
  }
});
