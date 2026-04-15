import { UUID } from "crypto";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: UUID,
    email: string,
    name: string,
    provider: null,
    is_active: true,
    created_at: string
  },
  
  accessToken: string;
  refreshToken: string;
}