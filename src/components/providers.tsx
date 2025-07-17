'use client';

import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from '@/components/theme-provider';
import { SiteHeader } from '@/components/site-header';
import { Toaster } from '@/components/ui/toaster';

type ClientProvidersProps = {
  children: ReactNode;
  locale: string;
  messages: any; // We'll use any here for simplicity, but you can define a proper type
};

export function ClientProviders({ children, locale, messages }: ClientProvidersProps) {
  return (
    <NextIntlClientProvider 
      locale={locale}
      messages={messages} // Pass the loaded messages directly
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        disableTransitionOnChange
      >
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">
            {children}
          </main>
        </div>
        <Toaster />
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
