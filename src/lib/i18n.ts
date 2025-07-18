import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import path from 'path';
import fs from 'fs';

export default getRequestConfig(async ({ locale }) => {
  if (locale !== 'en' && locale !== 'fr') notFound();

  try {
    const filePath = path.join(process.cwd(), 'public', 'messages', `${locale}.json`);
    const messages = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return {
      locale,
      messages,
      defaultLocale: 'fr',
      localeDetection: true,
    };
  } catch (error) {
    console.error(`Could not load messages for locale "${locale}":`, error);
    throw error;
  }
});
