'use client';

import { Alert, Button } from "@mui/material";
import { Grid, Link, TextField } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { useForm, Controller } from "react-hook-form";
import { loginSchema, LoginSchema } from "../schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { set } from "lodash";

export function LoginForm() {
  const { login } = useAuth();
  const [loading, setLoading] = useState<string | boolean>(false)
  const [error, setError] = useState<string | boolean>(false)

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
    setError(false);
    setLoading(true);

    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    })
    .finally(() => setLoading(false));
    
    if(res?.error)
      setError(res.error ?? "Erro realizar o login. Verifique os dados.");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" gap={2}>

        {
          error && (
            <Grid>
              <Alert severity="error" variant="outlined">{error}</Alert>
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