'use client';

import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { SiteHeader } from '@/components/site-header';
import { Toaster } from '@/components/ui/toaster';

type Messages = Record<string, string | Record<string, unknown>>;

type ClientProvidersProps = {
  children: ReactNode;
  locale: string;
  messages: Messages;
};

export function ClientProviders({ children, locale, messages }: ClientProvidersProps) {
  return (
    <NextIntlClientProvider 
      locale={locale}
      messages={messages}
      timeZone="America/Montreal"
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
