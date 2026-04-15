import { createCoreApi } from "@/lib/api/core";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
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
          };

        } catch (error: any) {
          // 👇 axios padrão
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
      if (user) {
        token.accessToken = user.accessToken;
        token.user = user;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      return session;
    },
  },

  pages: {
    signIn: "/",
  },
});

export { handler as GET, handler as POST };