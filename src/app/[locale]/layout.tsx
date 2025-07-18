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
    // In production, first try to read from the public directory
    if (process.env.NODE_ENV === 'production') {
      const possiblePaths = [
        // Try the public directory first (for Netlify)
        '/var/task/public/messages',
        // Fallback to process.cwd() for other environments
        join(process.cwd(), 'public', 'messages'),
        // Also check the root messages directory
        join(process.cwd(), 'messages')
      ];

      for (const basePath of possiblePaths) {
        const filePath = join(basePath, `${locale}.json`);
        try {
          console.log(`🔍 [Production] Looking for locale file at: ${filePath}`);
          const fileContents = readJsonFile(filePath);
          if (fileContents) {
            console.log(`✅ Found production locale file at: ${filePath}`);
            messages = fileContents;
            break;
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          console.warn(`⚠️ Error reading ${filePath}:`, errorMessage);
        }
      }
    }

    // If not in production or if production lookup failed, try development paths
    if (!messages) {
      const devPaths = [
        join(process.cwd(), 'public', 'messages', `${locale}.json`),
        join(process.cwd(), 'messages', `${locale}.json`)
      ];

      for (const filePath of devPaths) {
        try {
          console.log(`🔍 [Development] Looking for locale file at: ${filePath}`);
          const fileContents = readJsonFile(filePath);
          if (fileContents) {
            console.log(`✅ Found development locale file at: ${filePath}`);
            messages = fileContents;
            break;
          }
        } catch (error) {
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
