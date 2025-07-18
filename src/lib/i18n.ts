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
  // Try different possible locations for the locale files
  const possiblePaths = [
    // Production build location (copied by our build script)
    path.join(process.cwd(), '.next/static/messages', `${locale}.json`),
    // Public directory (for development)
    path.join(process.cwd(), 'public/messages', `${locale}.json`),
    // Root messages directory (alternative location)
    path.join(process.cwd(), 'messages', `${locale}.json`),
  ];

  // Try each path
  for (const filePath of possiblePaths) {
    try {
      const messages = readJsonFile(filePath);
      if (messages) {
        console.log(`Found messages for ${locale} at: ${filePath}`);
        return messages;
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.warn(`Error reading ${filePath}:`, errorMessage);
    }
  }
  
  // As a last resort, try to fetch from the public URL in the browser
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sophos-contruction.netlify.app';
      const response = await fetch(`${baseUrl}/messages/${locale}.json`);
      if (response.ok) {
        console.log(`Fetched messages for ${locale} from ${baseUrl}/messages/${locale}.json`);
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
