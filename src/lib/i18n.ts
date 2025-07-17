import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Helper function to load messages
async function loadMessages(locale: string) {
  try {
    if (process.env.NODE_ENV === 'production') {
      // In production, fetch from Netlify function
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/messages/${locale}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load messages for locale: ${locale}`);
      }
      return await response.json();
    } else {
      // In development, import directly
      return (await import(`../../messages/${locale}.json`)).default;
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
