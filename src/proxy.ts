import createMiddleware from 'next-intl/middleware';

const intlProxy = createMiddleware({
  locales: ['pt-BR', 'en-US'],
  defaultLocale: 'pt-BR',
  localePrefix: 'always' // 👈 importante
});

export default intlProxy;

export const config = {
  matcher: [
    '/((?!api|_next|.*\\..*).*)'
  ]
};