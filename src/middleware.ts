import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['pt-BR', 'en-US'],
  defaultLocale: 'pt-BR',
  localePrefix: 'always' // 👈 importante
});

export const config = {
  matcher: [
    '/((?!api|_next|.*\\..*).*)'
  ]
};