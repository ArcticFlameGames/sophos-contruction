import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import path from 'path';
import fs from 'fs';

// Helper function to read JSON file
const readJsonFile = (filePath: string) => {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
};

export default getRequestConfig(async ({ locale }) => {
  // Validate locale
  if (locale !== 'en' && locale !== 'fr') {
    console.error(`Invalid locale: ${locale}`);
    notFound();
  }

  try {
    // Try to read from public directory first
    const publicPath = path.join(process.cwd(), 'public', 'messages', `${locale}.json`);
    let messages = readJsonFile(publicPath);

    // If not found in public, try root messages directory
    if (!messages) {
      const rootPath = path.join(process.cwd(), 'messages', `${locale}.json`);
      messages = readJsonFile(rootPath);
    }

    if (!messages) {
      throw new Error(`Could not find messages for locale: ${locale}`);
    }
    
    return {
      locale,
      messages,
      defaultLocale: 'fr',
      localeDetection: true,
    };
  } catch (error) {
    console.error(`Could not load messages for locale "${locale}":`, error);
    notFound();
  }
});
