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
async function getMessages(locale: string) {
  // For static generation and server-side rendering, always use the filesystem
  const possiblePaths = [
    path.join(process.cwd(), 'public/messages', `${locale}.json`),
    path.join(process.cwd(), 'messages', `${locale}.json`),
  ];

  for (const filePath of possiblePaths) {
    const messages = readJsonFile(filePath);
    if (messages) {
      console.log(`Found messages for ${locale} at: ${filePath}`);
      return messages;
    }
  }
  
  // Only try to fetch in browser environment
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sophos-contruction.netlify.app';
      const response = await fetch(`${baseUrl}/messages/${locale}.json`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error(`Error fetching messages for ${locale}:`, error);
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
