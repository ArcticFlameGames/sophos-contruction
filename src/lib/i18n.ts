import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default getRequestConfig(async ({ locale }) => {
  if (locale !== 'en' && locale !== 'fr') notFound();

  try {
    if (process.env.NODE_ENV === 'production') {
      const res = await fetch(`https://sophos-contruction.netlify.app/messages/${locale}.json`);
      if (!res.ok) throw new Error(`Failed to fetch messages: ${res.statusText}`);
      const messages = await res.json();
      return {
        locale,
        messages,
        timeZone: 'UTC',
        defaultLocale: 'fr',
        localeDetection: true,
      };
    }

    const messages = (await import(`../../messages/${locale}.json`)).default;
    return {
      locale,
      messages,
      timeZone: 'UTC',
      defaultLocale: 'fr',
      localeDetection: true,
    };
  } catch (error) {
    console.error(`Could not load messages for locale "${locale}":`, error);
    throw error;
  }
});
