import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { dbConnect } from "@/app/connect/dbConnect";
import User from "@/app/model/userSchema";
import jwt from "jsonwebtoken";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_CLIENT!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 5 * 24 * 60 * 60 }, // 5 days
  callbacks: {
    async signIn({ user }) {
      await dbConnect();

      let existingUser = await User.findOne({ userEmail: user.email });
      if (!existingUser) {
        await User.create({
          userName: user.name,
          userEmail: user.email,
          userPassword: undefined,
          userJoined: Date.now(),
          isVerified: true,
        });
      }
      return true; // MUST return true to allow login
    },
    async jwt({ token, user }) {
      if (user) {
        // Add DB info to token
        const dbUser = await User.findOne({ userEmail: user.email });
        if (dbUser) {
          token.id = dbUser._id.toString();
          token.userName = dbUser.userName;
          token.email = dbUser.userEmail;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.userName = token.userName;
      session.user.email = token.email;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  debug: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
