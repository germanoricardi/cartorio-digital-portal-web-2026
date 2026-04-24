'use client'

import { PropsWithChildren } from "react";
import Header from "./components/Header";
import { useSettingsContext } from "@/contexts/settings";
import { Box } from "@mui/material";
import { useBoolean } from "@/hooks/use-boolean";
import { useResponsive } from "@/hooks/use-responsive";
import NavVertical from "./components/NavVertical";
import NavMini from "./components/NavMini";
import Main from "./main";

export default function DashboardLayout({ children }: PropsWithChildren) {
  const settings = useSettingsContext();
  const nav = useBoolean();

  const lgUp = useResponsive('up', 'lg');
  
  const isMini = settings.themeLayout === 'mini';

  const renderNavMini = <NavMini />;

  const renderNavVertical = <NavVertical openNav={nav.value} onCloseNav={nav.onFalse} />;

  if (isMini) {
    return (
      <>
        <Header onOpenNav={nav.onTrue} />

        <Box
          sx={{
            minHeight: 1,
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
          }}
        >
          {lgUp ? renderNavMini : renderNavVertical}

          <Main>{children}</Main>
        </Box>
      </>
    );
  }

  return (
    <>
      <Header onOpenNav={nav.onTrue} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        {renderNavVertical}

        <Main>{children}</Main>
      </Box>
    </>
  );
}