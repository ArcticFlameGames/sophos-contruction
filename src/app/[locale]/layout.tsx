import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
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

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <ClientProviders locale={locale}>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
