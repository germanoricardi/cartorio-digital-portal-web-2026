
import SvgColor from "@/components/SvgColor";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import AccountPopover from "../AccountPopover";

export default function Header() {
  return (
    <AppBar>
      <Toolbar>
        <IconButton>
          <SvgColor src="/assets/icons/navbar/ic_menu_item.svg" />
        </IconButton>

        <AccountPopover />
      </Toolbar>
    </AppBar>
  )
}