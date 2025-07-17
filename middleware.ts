import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

// Define the locales we support
const locales = ['en', 'fr'] as const;
export type Locale = typeof locales[number];
const defaultLocale = 'fr';

// Function to get the preferred locale from the request headers
function getLocale(request: NextRequest): Locale {
  // Get the accept-language header
  const acceptLanguage = request.headers.get('accept-language') || '';
  
  // Extract the languages from the header
  const headers = { 'accept-language': acceptLanguage };
  const languages = new Negotiator({ headers }).languages();
  
  // Return the best match from our supported locales, or the default
  return match(languages, [...locales], defaultLocale) as Locale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // If no locale is present, redirect to the default locale with the current path
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    
    // Handle the root path
    if (pathname === '/') {
      return NextResponse.redirect(new URL(`/${locale}`, request.url));
    }
    
    // For other paths, preserve the path and add the locale
    return NextResponse.redirect(new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|assets).*)',
  ],
};
