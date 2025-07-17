'use client';

import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { SiteHeader } from '@/components/site-header';
import { Toaster } from '@/components/ui/toaster';

type ClientProvidersProps = {
  children: ReactNode;
  locale: string;
  messages: any;
};

export function ClientProviders({ children, locale, messages }: ClientProvidersProps) {
  return (
    <NextIntlClientProvider 
      locale={locale}
      messages={messages}
    >
      <div className="relative flex min-h-screen flex-col bg-white">
        <SiteHeader />
        <main className="flex-1">
          {children}
        </main>
      </div>
      <Toaster />
    </NextIntlClientProvider>
  );
}
