import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { CssBaseline } from "@mui/material";

import ThemeProvider from "@/theme";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Cartório Digital",
  description: "Solicite certidões e documentos de cartório online com rapidez e segurança. Plataforma digital prática para emissão, acompanhamento e entrega de documentos sem sair de casa.",
  applicationName: "Cartório Digital",
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <AppRouterCacheProvider>
          <Providers>
            <ThemeProvider>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
