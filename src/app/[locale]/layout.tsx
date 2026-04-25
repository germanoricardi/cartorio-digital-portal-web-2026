import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { CssBaseline } from "@mui/material";

import { Providers } from "./providers";
import { MotionLazy } from "@/components/Animate/motion-lazy";

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params
}: Props): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: 'app'
  });

  return {
    title: t('name'),
    description: t('seo.description'),
    applicationName: t('name'),
    manifest: '/manifest.json'
  };
}

type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({
  children,
  params
}: RootLayoutProps) {
  const { locale } = await params;

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppRouterCacheProvider>
            <Providers>
              <MotionLazy>
                <CssBaseline />
                {children}
              </MotionLazy>
            </Providers>
          </AppRouterCacheProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
