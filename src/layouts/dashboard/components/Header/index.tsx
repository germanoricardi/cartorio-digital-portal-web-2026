
'use client';

import SvgColor from "@/components/SvgColor";
import { AppBar, IconButton, Stack, Toolbar } from "@mui/material";
import AccountPopover from "../AccountPopover";
import SettingsButton from "../SettingsButton";

export default function Header() {
  return (
    <AppBar>
      <Toolbar>

        <IconButton>
          <SvgColor src="/assets/icons/navbar/ic_menu_item.svg" />
        </IconButton>

        <Stack
          flexGrow={1}
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing={{ xs: 0.5, sm: 1 }}
        >
          <SettingsButton />
          <AccountPopover />
        </Stack>

      </Toolbar>
    </AppBar>
  )
}