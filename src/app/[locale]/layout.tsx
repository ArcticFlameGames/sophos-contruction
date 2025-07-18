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
    // In production, the files should be in the public directory
    if (process.env.NODE_ENV === 'production') {
      // Try to read from the public directory first
      const publicPath = join(process.cwd(), 'public', 'messages', `${locale}.json`);
      messages = readJsonFile(publicPath);
      
      // If not found in public, try the root messages directory
      if (!messages) {
        const rootPath = join(process.cwd(), 'messages', `${locale}.json`);
        messages = readJsonFile(rootPath);
      }
      
      // If still not found, try the .next/static/messages directory
      if (!messages) {
        const staticPath = join(process.cwd(), '.next', 'static', 'messages', `${locale}.json`);
        messages = readJsonFile(staticPath);
      }
    } else {
      // In development, just use the local files
      const publicPath = join(process.cwd(), 'public', 'messages', `${locale}.json`);
      messages = readJsonFile(publicPath);
      
      if (!messages) {
        const rootPath = join(process.cwd(), 'messages', `${locale}.json`);
        messages = readJsonFile(rootPath);
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
