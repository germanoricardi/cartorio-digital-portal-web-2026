import { useState } from 'react';
import { authService } from '../auth.service';
import { LoginPayload, AuthResponse } from '../auth.types';

export function useAuth() {
  const [authResponse, setAuthResponse] = useState<AuthResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(data: LoginPayload) {
    setLoading(true);
    setError(null);

    try {
      const res = await authService.login(data);
      setAuthResponse(res);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    authResponse,
    loading,
    error,
    login,
    isAuthenticated: !!authResponse,
  };
}