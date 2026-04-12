import { api } from "./api";

export const authApi = {
  login(payload: { email: string; password: string }) {
    return api.post('/auth/login', payload);
  },
};