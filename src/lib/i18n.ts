import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Define the shape of our messages
interface Messages {
  navigation: {
    home: string;
    services: string;
    projects: string;
    about: string;
    contact: string;
    language: string;
    french: string;
    english: string;
  };
  theme: {
    light: string;
    dark: string;
    system: string;
  };
}

export default getRequestConfig(async ({ locale }) => {
  // Ensure the locale is supported
  if (locale !== 'fr' && locale !== 'en') notFound();

  // Dynamically import the messages for the requested locale
  const messages = (await import(`../../messages/${locale}.json`)).default as Messages;
  
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
    now: new Date()
  };
});
