const BASE = '/v1/auth';

export const authEndpoints = {
  login: `${BASE}/login`,
  refreshToken: `${BASE}/refresh-token`,

  password: {
    requestReset: `${BASE}/request-password-reset`,
    reset: `${BASE}/reset-password`,
  },
} as const;