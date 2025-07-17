import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { readFileSync } from 'fs';
import { join } from 'path';
import { locales, isLocale } from '@/i18n-config';
import { ClientProviders } from '@/components/providers';

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
    const messagesPath = join(process.cwd(), 'messages', `${locale}.json`);
    const messagesFile = readFileSync(messagesPath, 'utf-8');
    messages = JSON.parse(messagesFile);
  } catch {
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
