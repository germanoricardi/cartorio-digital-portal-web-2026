import { useState } from 'react';
import { LoginPayload, AuthResponse } from '../auth.types';
import { signIn } from 'next-auth/react';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(data: LoginPayload) {
    setLoading(true);
    setError(null);

    try {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if(res?.status === 200)
        return res;

      if(res?.error)
        setError(res.error ?? "Erro realizar o login. Verifique os dados.");

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    login,
  };
}