import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import path from 'path';
import fs from 'fs';

// Helper function to read JSON files
function readJsonFile(filePath: string) {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    return null;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}

// Helper function to find the messages file
function getMessages(locale: string) {
  // Try to find the messages file in different locations
  const possiblePaths = [
    path.join(process.cwd(), 'public/messages', `${locale}.json`),  // Development
    path.join(process.cwd(), '.next/static/messages', `${locale}.json`),  // Production
    path.join(process.cwd(), '.next/server/app/[locale]/.next/static/messages', `${locale}.json`),  // Netlify
    path.join(process.cwd(), 'messages', `${locale}.json`),  // Root messages directory
  ];

  for (const filePath of possiblePaths) {
    const messages = readJsonFile(filePath);
    if (messages) {
      console.log(`Found messages for ${locale} at: ${filePath}`);
      return messages;
    }
  }
  
  console.error(`Could not find messages file for locale: ${locale}`);
  return null;
}

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (locale !== 'en' && locale !== 'fr') notFound();

  try {
    const messages = getMessages(locale);
    
    if (!messages) {
      console.error(`No messages found for locale: ${locale}`);
      notFound();
    }
    
    return {
      locale,
      messages,
      defaultLocale: 'fr',
      localeDetection: true,
    };
  } catch (error) {
    console.error(`Error loading messages for locale ${locale}:`, error);
    notFound();
  }
});
