'use client';

import AuthLayout from "@/layouts/AuthLayout";
import { LoadingButton } from "@mui/lab";
import {  Grid, Link, TextField, Typography } from "@mui/material";

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

        <Grid container direction={'column'} gap={2}>
          <Grid>
            <TextField label="Email" fullWidth />
          </Grid>

          <Grid>
            <TextField label="Senha" type="password" fullWidth />
          </Grid>

          <Grid textAlign={'end'}>
            <Link variant="body2" underline="always">
              Esqueceu a senha?
            </Link>
          </Grid>

          <Grid>
            <LoadingButton variant="contained" size="large" fullWidth>Teste do MUI</LoadingButton>
          </Grid>

        </Grid>

      </Grid>
    </Grid>
  </AuthLayout>;
}
