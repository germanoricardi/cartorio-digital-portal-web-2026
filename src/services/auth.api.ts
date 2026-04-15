import { authEndpoints } from "@/modules/auth/auth.endpoints";
import { api } from "./api";

export const authApi = {
  login(payload: { email: string; password: string }) {
    return api.post(authEndpoints.login, payload);
  },
};