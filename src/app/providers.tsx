"use client";

import SettingsDrawer from "@/components/SettingsDrawer";
import { SettingsProvider } from "@/contexts/settings/provider";
import ThemeProvider from "@/theme";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SettingsProvider defaultSettings={{
        themeMode: 'light',
        themeContrast: 'bold',
        themeColorPresets: 'blue',
        themeLayout: 'vertical',
      }}>
        <ThemeProvider>
          <SettingsDrawer />
          {children}
        </ThemeProvider>
      </SettingsProvider>
    </SessionProvider>
  );
}