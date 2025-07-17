import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import path from 'path';
import fs from 'fs/promises';

// Re-export the client-side utilities
export * from './i18n-utils';

// Helper function to load messages
async function loadMessages(locale: string) {
  try {
    // First try to load from public directory (works in production)
    try {
      const publicPath = path.join(process.cwd(), 'public', 'messages', `${locale}.json`);
      const fileContent = await fs.readFile(publicPath, 'utf-8');
      return JSON.parse(fileContent);
    } catch (error) {
      console.warn(`Could not load messages from public directory for ${locale}, trying direct import...`);
      
      // Fall back to direct import (for development)
      if (process.env.NODE_ENV !== 'production') {
        return (await import(`../../messages/${locale}.json`)).default;
      }
      
      throw new Error(`Failed to load messages for locale: ${locale}`);
    }
  } catch (error) {
    console.error(`Error loading messages for ${locale}:`, error);
    throw error;
  }
}

export default getRequestConfig(async ({ locale }) => {
  // Ensure the locale is supported
  if (locale !== 'fr' && locale !== 'en') notFound();

  try {
    // Load messages for the requested locale
    const messages = await loadMessages(locale);
    
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
      },
      // Set default locale for number and date formatting
      defaultLocale: 'en',
      // Enable automatic locale detection
      localeDetection: true
    };
  } catch (error) {
    console.error(`Failed to load messages for ${locale}:`, error);
    throw error;
  }
});
