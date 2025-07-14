// auth.js (in your project root)
import NextAuth from "next-auth";
import { authOptions } from "./app/api/auth/[...nextauth]/route"; // Import authOptions from your API route

export const {
  handlers: { GET, POST },
  auth, // This is the auth function for Server Components
  signIn,
  signOut,
} = NextAuth(authOptions);