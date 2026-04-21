import { createCoreApi } from "@/lib/api/core";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// 🔒 evita múltiplos refresh simultâneos
let refreshingPromise: Promise<any> | null = null;

// 🔄 função de refresh
async function refreshAccessToken(token: any) {
  try {
    const api = await createCoreApi();

    const res = await api.post("/v1/auth/refresh-token", {
      refresh_token: token.refreshToken,
    });

    const data = res.data;

    // 🔐 valida resposta
    if (!data?.accessToken || !data?.refreshToken) {
      throw new Error("Invalid refresh response");
    }

    // 📦 decode JWT
    const decoded = JSON.parse(
      Buffer.from(data.accessToken.split(".")[1], "base64").toString()
    );

    return {
      ...token,
      accessToken: data.accessToken,

      // 🔥 rotação obrigatória
      refreshToken: data.refreshToken,

      accessTokenExpires: decoded.exp * 1000,
    };
  } catch (error: any) {
    console.error(
      "❌ Erro ao renovar token",
      error?.response?.data || error
    );

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Senha", type: "password" },
      },

      async authorize(credentials) {
        try {
          const api = await createCoreApi();

          const res = await api.post("/v1/auth/login", {
            email: credentials?.email,
            password: credentials?.password,
          });

          const data = res.data;

          return {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          };
        } catch (error: any) {
          const message =
            error?.response?.data?.message ||
            error?.message ||
            "Erro ao autenticar";

          throw new Error(message);
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      // 🔐 primeiro login
      if (user) {
        const decoded = JSON.parse(
          Buffer.from(user.accessToken.split(".")[1], "base64").toString()
        );

        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: decoded.exp * 1000,
          user,
        };
      }

      // ⏱ buffer para evitar expiração durante request
      const buffer = 5000;

      if (Date.now() < (token as any).accessTokenExpires - buffer) {
        return token;
      }

      // 🔒 mutex para evitar múltiplos refresh
      if (!refreshingPromise) {
        refreshingPromise = refreshAccessToken(token).finally(() => {
          refreshingPromise = null;
        });
      }

      return refreshingPromise;
    },

    async session({ session, token }) {
      session.user = (token as any).user;
      session.accessToken = (token as any).accessToken;
      session.error = (token as any).error;

      return session;
    },
  },

  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };