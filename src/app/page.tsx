'use client';

import AuthLayout from "@/layouts/AuthLayout";
import { Box, Button, Container, Stack, Typography } from "@mui/material";

export default function Home() {

  const leftContent = <img src="/icons/icon-512.png" alt="Login Image" />;

  return <AuthLayout leftContent={leftContent}>
    <Typography variant="h1" component="h1">
      Yahoo!
    </Typography>
    <Button variant="contained">Teste do MUI</Button>
  </AuthLayout>;
}
