import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { compare } from "bcrypt";
import { use } from "react";
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
    newUser: "/register",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        let email = credentials?.email;
        let password = credentials?.password;
        const user = await db.users.findFirst({
          where: {
            email,
          },
        });
        if (user) {
          const match = await compare(password!, user.password);
          if (!match) {
            throw new Error("Invalid Password");
          }
          return { ...user, id: user.id.toString() };
        } else {
          throw new Error("Email doesn't exist");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const data = await db.users.findFirst({
        where: {
          email: token.email!,
        },
      });

      if (!data) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }
      return {
        id: data.id.toString(),
        email: data.email,
        picture: data.profile,
        name: data.username,
      };
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
  },
};
