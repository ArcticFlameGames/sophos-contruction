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
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Redirect if there is no locale
  const locale = getLocale(request);
  
  // If the path is just "/", redirect to "/fr/home" or "/en/home"
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${locale}/home`, request.url));
  }

  // Redirect to add the locale
  return NextResponse.redirect(new URL(`/${locale}${pathname === '/' ? '/home' : pathname}`, request.url));
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|assets).*)',
  ],
};
