export type Locale = 'en' | 'fr';

export const defaultLocale: Locale = 'fr';

export const locales: Locale[] = ['fr', 'en'];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
};

// This is the list of locales that are supported by the application
export const supportedLocales = ['fr', 'en'] as const;

export function isSupportedLocale(locale: string): locale is Locale {
  return (supportedLocales as readonly string[]).includes(locale);
}

export function isLocale(locale: string | undefined): locale is Locale {
  return isSupportedLocale(locale || '');
}
