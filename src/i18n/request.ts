// /src/i18n/request.ts
import { getRequestConfig } from 'next-intl/server';

const locales = ['pt-BR', 'en-US'] as const;
type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale: Locale =
    locales.includes(locale as Locale) ? (locale as Locale) : 'pt-BR';

  return {
    locale: resolvedLocale,
    messages: (await import(`../messages/${resolvedLocale}.json`)).default
  };
});
