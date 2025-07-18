import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { readFileSync } from 'fs';
import { join } from 'path';
import { locales, isLocale } from '@/i18n-config';
import { ClientProviders } from '@/components/providers';

// Helper function to read JSON file
const readJsonFile = (filePath: string) => {
  try {
    const fileContent = readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
};

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!locale || !isLocale(locale)) {
    notFound();
  }

  let messages;
  try {
    // Try different possible locations for the locale files
    const possiblePaths = [
      // Production build location (copied by our build script)
      join(process.cwd(), 'public/messages', `${locale}.json`),
      // Alternative location in public directory
      join(process.cwd(), 'public', 'messages', `${locale}.json`),
      // Root messages directory
      join(process.cwd(), 'messages', `${locale}.json`),
      // .next/static/messages directory
      join(process.cwd(), '.next', 'static', 'messages', `${locale}.json`),
      // Netlify function path
      join(process.cwd(), '..', '..', 'public', 'messages', `${locale}.json`)
    ];

    // Try each path until we find the messages
    for (const filePath of possiblePaths) {
      try {
        console.log(`Looking for locale file at: ${filePath}`);
        const fileContents = readJsonFile(filePath);
        if (fileContents) {
          console.log(`Found locale file at: ${filePath}`);
          messages = fileContents;
          break;
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.warn(`Error reading ${filePath}:`, errorMessage);
      }
    }

    // As a last resort, try to fetch from the public URL
    if (!messages && typeof window !== 'undefined') {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sophos-contruction.netlify.app';
        const response = await fetch(`${baseUrl}/messages/${locale}.json`);
        if (response.ok) {
          messages = await response.json();
        }
      } catch (error) {
        console.error(`Error fetching messages for ${locale}:`, error);
      }
    }

    if (!messages) {
      throw new Error(`Could not find messages for locale: ${locale}`);
    }
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}:`, error);
    notFound();
  }

  return (
    <ClientProviders locale={locale} messages={messages}>
      {children}
    </ClientProviders>
  );
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
