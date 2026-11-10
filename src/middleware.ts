import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from '@/i18n';
import { lucia } from '@/lib/auth';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed'
});

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip static assets, internal files, and api webhooks
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next();
  }

  // 2. Protected Route Guard (CMS, Loyalty, B2B)
  const isCmsRoute = pathname.startsWith('/cms') && !pathname.startsWith('/cms/login');
  const isLoyaltyRoute = pathname.includes('/loyalty/dashboard');
  const isB2bRoute = pathname.includes('/b2b/portal');

  if (isCmsRoute || isLoyaltyRoute || isB2bRoute) {
    const sessionId = request.cookies.get(lucia.sessionCookieName)?.value ?? null;
    
    // In edge runtime, if no active auth session is detected for admin routes, redirect to login
    if (!sessionId && isCmsRoute) {
      const loginUrl = new URL('/cms/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 3. Delegate to next-intl for localized routing
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
