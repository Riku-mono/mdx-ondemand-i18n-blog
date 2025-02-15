import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale as fallbackLocale, locales } from './i18n/i18nLocales';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith(`/${fallbackLocale}/`) || pathname === `/${fallbackLocale}`) {
    return NextResponse.redirect(
      new URL(
        pathname.replace(`/${fallbackLocale}`, pathname === `/${fallbackLocale}` ? '/' : ''),
        request.url
      )
    );
  }

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    return NextResponse.rewrite(new URL(`/${fallbackLocale}${pathname}`, request.url));
  }
}

export const config = {
  // prettier-ignore
  matcher: '/((?!api|static|track|data|css|scripts|.*\\..*|_next).*|sitemap.xml|robots.txt)',
};
