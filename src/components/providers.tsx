'use client';

import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from '@/components/theme-provider';
import { SiteHeader } from '@/components/site-header';
import { Toaster } from '@/components/ui/toaster';

type ClientProvidersProps = {
  children: ReactNode;
  locale: string;
};

export function ClientProviders({ children, locale }: ClientProvidersProps) {
  return (
    <NextIntlClientProvider 
      locale={locale}
      messages={{
        // These will be provided by next-intl automatically
        // We just need to satisfy TypeScript
        navigation: {
          home: '',
          services: '',
          projects: '',
          about: '',
          contact: '',
          language: '',
          french: '',
          english: ''
        }
      }}
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
