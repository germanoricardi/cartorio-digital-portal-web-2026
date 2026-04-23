"use client";

import { SettingsProvider } from "@/contexts/settings/provider";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SettingsProvider defaultSettings={{
        themeMode: 'light',
        themeContrast: 'bold',
        themeColorPresets: 'blue'
      }}>
        {children}
      </SettingsProvider>
    </SessionProvider>
  );
}