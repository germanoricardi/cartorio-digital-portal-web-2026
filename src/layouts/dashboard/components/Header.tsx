import SvgColor from "@/components/SvgColor/SvgColor";
import { AppBar, IconButton, Toolbar } from "@mui/material";

export default function Header() {
  return (
    <AppBar>
      <Toolbar>
        <IconButton>
          <SvgColor src="/assets/icons/navbar/ic_menu_item.svg" />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}