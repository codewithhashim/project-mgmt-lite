// app/(auth)/sign-in/page.js
"use client"; // This page must be a client component

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button"; // Shadcn Button
import PageHeader from "@/components/PageHeader"; // Reusable header

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <PageHeader
        title="Sign In"
        description="Choose your preferred method to access the dashboard."
        className="text-center"
      />

      <div className="flex flex-col space-y-4 w-full max-w-sm">
        <Button
          onClick={() => signIn("google")}
          className="flex items-center justify-center gap-2"
        >
          Sign in with Google
          {/* Optional: Add a Google icon here */}
        </Button>
        <Button
          onClick={() => signIn("github")}
          className="flex items-center justify-center gap-2"
        >
          Sign in with GitHub
          {/* Optional: Add a GitHub icon here */}
        </Button>
      </div>
    </div>
  );
}