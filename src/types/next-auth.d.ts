import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    accessToken: string;
    refreshToken: string;
  }

  interface Session {
    accessToken?: string;
    error?: string;
    user: {
      name?: string | null;
      email?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    user: any;
    error?: string;
  }
}