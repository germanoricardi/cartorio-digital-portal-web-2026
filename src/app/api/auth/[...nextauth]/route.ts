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
          const res = await fetch("http://cartorio-digital-core:3000/v1/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          const data = await res.json();

          // 👉 ajuste conforme padrão do seu backend
          if (res.status != 200) {
            throw new Error(data.message || "Erro ao autenticar");
          }

          // 👉 importante: retornar o usuário
          return {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            accessToken: data.accessToken,
          };
        } catch (error) {
          throw new Error(error instanceof Error ? error.message : "Erro desconhecido");
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      // primeira vez (login)
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
    signIn: "/", // opcional
  },
});

export { handler as GET, handler as POST };