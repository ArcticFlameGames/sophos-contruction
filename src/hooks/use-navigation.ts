'use client';

import { usePathname } from 'next/navigation';
import { Locale, isLocale as isLocaleCheck } from '@/i18n-config';

export function useNavigation() {
  const pathname = usePathname() || '';

  // Check if a string is a valid locale
  const isLocale = (locale: string | undefined): locale is Locale => {
    return isLocaleCheck(locale);
  };

  // Get the current locale from the URL path
  const getCurrentLocale = (): Locale => {
    const segments = pathname.split('/');
    const locale = segments[1];
    return isLocale(locale) ? locale : 'fr'; // Default to French
  };

  // Create a localized URL
  const createLocalizedUrl = (path: string, locale: Locale): string => {
    // Remove leading/trailing slashes for consistency
    const cleanPath = path.replace(/^\/+|\/+$/g, '');
    return `/${locale}${cleanPath ? `/${cleanPath}` : ''}`;
  };

  // Check if a path is the current active path
  const isActivePath = (path: string): boolean => {
    // Handle home path
    if (path === '/') {
      return pathname === `/${getCurrentLocale()}/` || pathname === `/${getCurrentLocale()}`;
    }
    
    // For other paths, check if the current path starts with the given path
    // and either matches exactly or is followed by a forward slash
    const pathWithoutLocale = pathname.replace(/^\/(fr|en)/, '') || '/';
    return (
      pathWithoutLocale === path || 
      pathWithoutLocale.startsWith(`${path}/`)
    );
  };

  return {
    getCurrentLocale,
    createLocalizedUrl,
    isActivePath,
  };
}
