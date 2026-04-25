
'use client';

import SvgColor from "@/components/SvgColor";
import { AppBar, IconButton, Stack, Toolbar, useTheme } from "@mui/material";
import AccountPopover from "../AccountPopover";
import SettingsButton from "../SettingsButton";
import { useResponsive } from "@/hooks/use-responsive";
import { HEADER, NAV } from "@/layouts/config-layout";
import { bgBlur } from "@/theme/css";
import { useOffSetTop } from "@/hooks/use-off-set-top";
import { useSettingsContext } from "@/contexts/settings";
import LanguagePopover from "../LanguagePopover";

type Props = {
  onOpenNav?: VoidFunction;
};

export default function Header({ onOpenNav }: Props) {
  const theme = useTheme();

  const settings = useSettingsContext();

  const lgUp = useResponsive('up', 'lg');

  const offset = useOffSetTop(HEADER.H_DESKTOP);

  const offsetTop = offset && ['vertical', 'mini'].includes(settings.themeLayout);

  const isNavMini = settings.themeLayout === 'mini';

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav}>
          <SvgColor src="/assets/icons/navbar/ic_menu_item.svg" />
        </IconButton>
      )}

      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1 }}
      >

        <LanguagePopover />
        <SettingsButton />
        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.W_VERTICAL + 1}px)`,
          height: HEADER.H_DESKTOP,
          ...(offsetTop && {
            height: HEADER.H_DESKTOP_OFFSET,
          }),
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_MINI + 1}px)`,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  )
}