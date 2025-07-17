import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { readFileSync } from 'fs';
import { join } from 'path';
import { locales } from '@/i18n-config';
import { ClientProviders } from '@/components/providers';

type LayoutProps = {
  children: ReactNode;
  params: { locale: string };
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// This is an async Server Component
export default async function LocaleLayout({ 
  children, 
  params 
}: LayoutProps) {
  // Await the params
  const { locale } = await Promise.resolve(params);
  
  // Validate the locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Load messages for the requested locale
  let messages;
  try {
    // Use process.cwd() to get the root directory and load messages
    const messagesPath = join(process.cwd(), 'messages', `${locale}.json`);
    const messagesFile = readFileSync(messagesPath, 'utf-8');
    messages = JSON.parse(messagesFile);
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    notFound();
  }

  return (
    <ClientProviders locale={locale} messages={messages}>
      {children}
    </ClientProviders>
  );
}

// This tells Next.js that this layout should not include the html and body tags
export const dynamic = 'force-dynamic';

// This ensures this layout is not cached, which helps with dynamic content
export const revalidate = 0;
