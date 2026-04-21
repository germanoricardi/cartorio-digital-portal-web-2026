import { authApi } from '@/services/auth.api';
import { LoginPayload, AuthResponse } from './auth.types';

export const authService = {
  async login(data: LoginPayload): Promise<AuthResponse> {
    try {
      const res = await authApi.login(data);

      return {
        accessToken: res.data.access_token,
        refreshToken: res.data.refresh_token,
        user: res.data.user,
      };
    } catch (err: any) {
      if (err.response?.status === 401) {
        throw new Error('Credenciais inválidas');
      }

      throw new Error('Erro ao fazer login');
    }
  },
};