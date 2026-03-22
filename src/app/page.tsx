'use client';

import { Box, Button, Stack, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box component="main" sx={{ p: 4 }}>
      <Stack spacing={2} alignItems="flex-start">
        <Typography variant="h1" component="h1">
          Yahoo!
        </Typography>
        <Button variant="contained">Teste do MUI</Button>
      </Stack>
    </Box>
  );
}
