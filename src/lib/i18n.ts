import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default getRequestConfig(async ({ locale }) => {
  if (locale !== 'en' && locale !== 'fr') notFound();

  try {
    if (process.env.NODE_ENV === 'production') {
      const path = await import('path');
      const fs = await import('fs/promises');
      const filePath = path.join(process.cwd(), 'public', 'messages', `${locale}.json`);
      const content = await fs.readFile(filePath, 'utf8');
      const messages = JSON.parse(content);
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
