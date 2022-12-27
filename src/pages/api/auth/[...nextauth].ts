import NextAuth, { type NextAuthOptions } from "next-auth";
import EmailProvider from 'next-auth/providers/email'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'

import { sendVerification } from 'utils/customEmail'

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";
import { Role } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role as Role;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: env.EMAIL_SERVER,
      from: env.EMAIL_FROM,
      async sendVerificationRequest({
        identifier: email, url, provider: { server, from },
      }) {
        await sendVerification({
          email, url, provider: { server, from },
        })
      },
      maxAge: 10 * 60, // 10 minutes
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
