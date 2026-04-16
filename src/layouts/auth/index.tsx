import { Box, Grid, styled } from "@mui/material";
import { PropsWithChildren, ReactNode } from "react";

type AuthLayoutProps = {
  leftContent: ReactNode;
} & PropsWithChildren;

const GridItem = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
}));

export default function AuthLayout({ children, leftContent }: AuthLayoutProps) {

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Grid container sx={{ minHeight: "100vh" }}>

        {/* LEFT */}
        <GridItem size={{ md: 8, xs: 12 }}>
          {leftContent}
        </GridItem>

        {/* RIGHT */}
        <GridItem size={{ md: 4, xs: 12 }} flexDirection={'column'}>
          <Box width={'100%'}>
            {children}
          </Box>
        </GridItem>

      </Grid>
    </Box>
  );
}