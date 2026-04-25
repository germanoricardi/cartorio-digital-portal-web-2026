'use client';

import { Alert, Button } from "@mui/material";
import { Grid, Link, TextField } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { useForm, Controller } from "react-hook-form";
import { loginSchema, LoginSchema } from "../schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export function LoginForm() {
  const { login, loading, error } = useAuth();
  const router = useRouter();
  const locale = useLocale();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    const res = await login(data)

    if(res?.ok)
      router.push(`/${locale}/dashboard`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" gap={2}>

        {
          error && (
            <Grid my={2}>
              <Alert severity="warning" variant="outlined">{error}</Alert>
            </Grid>
          )
        }
        
        <Grid>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
        </Grid>

        <Grid>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Senha"
                type="password"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />
        </Grid>

        <Grid textAlign="end">
          <Link variant="body2" underline="always">
            Esqueceu a senha?
          </Link>
        </Grid>

        <Grid>
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            loading={loading}
          >
            Entrar
          </Button>
        </Grid>

      </Grid>
    </form>
  );
}