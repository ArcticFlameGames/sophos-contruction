import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'fr'] as const;
type Locale = typeof locales[number];
const defaultLocale: Locale = 'fr';

function detectLocaleFromPath(pathname: string): Locale | null {
  const pathLocale = pathname.split('/')[1];
  return locales.includes(pathLocale as Locale) ? (pathLocale as Locale) : null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip files like favicon.ico, images, etc.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/assets')
  ) {
    return NextResponse.next();
  }

  // If no locale is found in the path, redirect to the default locale
  const localeInPath = detectLocaleFromPath(pathname);
  if (!localeInPath) {
    const newUrl = new URL(`/${defaultLocale}${pathname}`, request.url);
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|assets|messages).*)',
  ],
};
