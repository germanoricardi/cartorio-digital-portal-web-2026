'use client';

import { LoadingButton } from "@mui/lab";
import { Grid, Link, TextField } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { useForm, Controller } from "react-hook-form";
import { loginSchema, LoginSchema } from "../schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export function LoginForm() {
  const { login, loading } = useAuth();

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

  async function onSubmit(data: LoginSchema) {
    await login(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" gap={2}>
        
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
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            loading={loading}
          >
            Entrar
          </LoadingButton>
        </Grid>

      </Grid>
    </form>
  );
}