// auth.js (in your project root)
import { getServerSession } from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma"; // Use the singleton prisma instance

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true, // Automatically link Google with matching email
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true, // Automatically link GitHub with matching email
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      // Attach user id from token (sub) for client-side use
      if (session?.user && token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log('NextAuth redirect callback:', { url, baseUrl });
      
      // Handle callbackUrl parameter
      if (url.includes("callbackUrl=")) {
        const urlObj = new URL(url);
        const callbackUrl = urlObj.searchParams.get("callbackUrl");
        if (callbackUrl && callbackUrl.startsWith("/")) {
          console.log('Redirecting to callbackUrl:', `${baseUrl}${callbackUrl}`);
          return `${baseUrl}${callbackUrl}`;
        }
      }
      
      // If the url is relative, prefix it with the base url
      if (url.startsWith("/")) {
        console.log('Redirecting to relative URL:', `${baseUrl}${url}`);
        return `${baseUrl}${url}`;
      }
      // If the url is on the same origin, allow it
      else if (new URL(url).origin === baseUrl) {
        console.log('Redirecting to same origin URL:', url);
        return url;
      }
      // Default redirect to dashboard
      console.log('Default redirect to dashboard:', `${baseUrl}/dashboard`);
      return `${baseUrl}/dashboard`;
    },
  },
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  debug: process.env.NODE_ENV === "development",
  events: {
    async signIn(message) {
      console.log('NextAuth signIn event:', message);
    },
    async session(message) {
      console.log('NextAuth session event:', message);
    },
  },
};

// Simple helper to get the current server-side session
export function auth() {
  return getServerSession(authOptions);
}