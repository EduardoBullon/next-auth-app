import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { findUserByEmail, incrementLoginAttempts, resetLoginAttempts, isUserLocked } from "@/lib/users";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email y contraseña son requeridos");
        }

        // Verificar si el usuario está bloqueado
        if (isUserLocked(credentials.email)) {
          throw new Error("Cuenta bloqueada. Demasiados intentos fallidos. Intenta de nuevo en 15 minutos.");
        }

        // Buscar usuario en la base de datos mock
        const user = findUserByEmail(credentials.email);

        if (!user) {
          throw new Error("Credenciales inválidas");
        }

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          incrementLoginAttempts(credentials.email);
          const userUpdated = findUserByEmail(credentials.email);
          const attemptsLeft = 5 - (userUpdated?.loginAttempts || 0);
          
          if (attemptsLeft > 0) {
            throw new Error(`Contraseña incorrecta. Te quedan ${attemptsLeft} intentos.`);
          } else {
            throw new Error("Cuenta bloqueada por 15 minutos debido a múltiples intentos fallidos.");
          }
        }

        // Login exitoso - resetear intentos
        resetLoginAttempts(credentials.email);

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Si la URL es relativa, usarla
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Si la URL es del mismo sitio, usarla
      else if (new URL(url).origin === baseUrl) return url;
      // Por defecto, redirigir al dashboard
      return `${baseUrl}/dashboard`;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };