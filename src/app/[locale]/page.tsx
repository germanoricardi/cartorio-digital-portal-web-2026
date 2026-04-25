'use client';

import AuthLayout from "@/layouts/auth";
import { LoginForm } from "@/modules/auth/components/LoginForm";
import { Grid, Link, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();

  // TODO: Alterar para componente de imagem do MUI
  const leftContent = <img src="/icons/icon-512.png" alt="Login Image" />;

  return <AuthLayout leftContent={leftContent}>
    <Grid container direction={'column'} gap={2} px={2}>
      <Grid>
        <Typography variant="h4" component="h1">
          {t('app.name')}
        </Typography>
      </Grid>

      <Grid>
        <Typography>
          {t('auth.newUser')} <Link href="/register" variant="subtitle2"> {t('auth.createAccount')} </Link>
        </Typography>
      </Grid>
      
      <Grid>
        <LoginForm />
      </Grid>
    </Grid>
  </AuthLayout>;
}
