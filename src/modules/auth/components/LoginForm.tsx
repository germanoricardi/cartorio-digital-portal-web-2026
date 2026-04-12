import { LoadingButton } from "@mui/lab";
import { Grid, Link, TextField } from "@mui/material";

export function LoginForm() {

  return (
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
  );
}