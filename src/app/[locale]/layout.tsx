import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { CssBaseline } from "@mui/material";

import { Providers } from "./providers";
import { MotionLazy } from "@/components/Animate/motion-lazy";

import { NextIntlClientProvider } from 'next-intl';

export const metadata: Metadata = {
  title: "Cartório Digital",
  description: "Solicite certidões e documentos de cartório online com rapidez e segurança. Plataforma digital prática para emissão, acompanhamento e entrega de documentos sem sair de casa.",
  applicationName: "Cartório Digital",
  manifest: '/manifest.json',
};

type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({
  children,
  params
}: RootLayoutProps) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
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
