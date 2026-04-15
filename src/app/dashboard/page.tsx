"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Grid, Typography, Button, Paper } from "@mui/material";

export default function DashboardPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  // 🔒 proteção de rota
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Carregando...</p>;
  }

  if (!session) {
    return null;
  }

  const { name, email } = session.user as {
    name: string;
    email: string;
  };

  return (
    <Grid container justifyContent="center"  mt={6}>
      <Grid size={{ xs: 12, sm: 8, md: 5 }}>
        <Paper elevation={3} sx={{ p: 4 }}>

          <Grid container spacing={2}>

            <Grid size={{ xs: 12 }}>
              <Typography variant="h5" fontWeight="bold">
                Dashboard
              </Typography>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Typography>
                <strong>Nome:</strong> {name}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Typography>
                <strong>Email:</strong> {email}
              </Typography>
            </Grid>

            <Grid size={{ xs: 6 }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => update()}
              >
                Testar refresh
              </Button>
            </Grid>

            <Grid size={{ xs: 6 }}>
              <Button
                variant="outlined"
                color="error"
                fullWidth
                onClick={() =>
                  signOut({
                    callbackUrl: "/",
                  })
                }
              >
                Logout
              </Button>
            </Grid>

          </Grid>

        </Paper>
      </Grid>
    </Grid>
  );
}