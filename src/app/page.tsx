'use client';

import AuthLayout from "@/layouts/auth";
import { LoginForm } from "@/modules/auth/components/LoginForm";
import { Grid, Link, Typography } from "@mui/material";

export default function Home() {

  const leftContent = <img src="/icons/icon-512.png" alt="Login Image" />;

  return <AuthLayout leftContent={leftContent}>
    <Grid container direction={'column'} gap={2} px={2}>
      <Grid>
        <Typography variant="h4" component="h1">
          Entrar no Cártório Digital
        </Typography>
      </Grid>

      <Grid>
        <Typography>
          Novo usuário? <Link href="/register" variant="subtitle2">Criar minha conta</Link>
        </Typography>
      </Grid>
      
      <Grid>
        <LoginForm />
      </Grid>
    </Grid>
  </AuthLayout>;
}
