import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
        const { data } = await axios.post(
          "https://classechoapi.onrender.com/api/login",
          {
            email,
            password,
          }
        );
        if (data) {
          return data;
        } else {
          throw new Error("Email doesn't exist");
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
    async jwt({ token, user }) {
      const { data } = await axios.post(
        "https://classechoapi.onrender.com/api/jwtLogin",
        {
          email: token.email,
        }
      );
      if (!data) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: data.id,
        email: data.email,
        picture: data.profile,
        name: data.id,
      };
    },
  },
};
