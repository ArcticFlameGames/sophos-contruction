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
    // In production, we'll use the public URL to fetch the locale file
    if (process.env.NODE_ENV === 'production') {
      const publicUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
      const url = `${publicUrl}/messages/${locale}.json`;
      console.log(`🌐 Fetching locale file from: ${url}`);
      
      try {
        const response = await fetch(url);
        if (response.ok) {
          messages = await response.json();
          console.log(`✅ Successfully loaded ${locale} messages`);
        } else {
          console.warn(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error(`Error fetching locale file:`, error);
      }
    }
    
    // If we're in development or the fetch failed, try local files
    if (!messages) {
      const possiblePaths = [
        // Public directory (works in both dev and prod)
        join(process.cwd(), 'public', 'messages', `${locale}.json`),
        // Root messages directory
        join(process.cwd(), 'messages', `${locale}.json`),
      ];

      for (const filePath of possiblePaths) {
        try {
          console.log(`🔍 Looking for locale file at: ${filePath}`);
          const fileContents = readJsonFile(filePath);
          if (fileContents) {
            console.log(`✅ Found locale file at: ${filePath}`);
            messages = fileContents;
            break;
          }
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          console.warn(`⚠️ Error reading ${filePath}:`, errorMessage);
        }
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
