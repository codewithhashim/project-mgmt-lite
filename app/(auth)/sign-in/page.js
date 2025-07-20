// app/(auth)/sign-in/page.js
"use client";

import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Sign-in page - Session status:", status, "Session:", session);
    
    if (status === "authenticated" && session) {
      console.log("User already authenticated, redirecting to dashboard");
      router.push("/dashboard");
    }
  }, [status, session, router]);

  const handleSignIn = async (provider) => {
    try {
      setIsLoading(true);
      setError("");
      console.log(`Attempting sign in with ${provider}`);
      
      const result = await signIn(provider, { 
        callbackUrl: "/dashboard",
        redirect: false, // Don't redirect automatically, we'll handle it
      });
      
      console.log("Sign in result:", result);
      
      if (result?.error) {
        setError(`Sign in failed: ${result.error}`);
      } else if (result?.ok) {
        // Sign in was successful, wait a bit and check session
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      }
    } catch (error) {
      console.error("Sign in error:", error);
      setError("An unexpected error occurred during sign in");
    } finally {
      setIsLoading(false);
    }
  };

  // If already authenticated, show loading state
  // if (status === "authenticated") {
  //   return (
  //     <div className="flex min-h-screen flex-col items-center justify-center p-4">
  //       <div className="text-lg">Redirecting to dashboard...</div>
  //     </div>
  //   );
  // }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Sign In</h1>
        <p className="text-gray-600">Choose your preferred method to access the dashboard.</p>
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-4 w-full max-w-sm">
        <Button
          onClick={() => handleSignIn("google")}
          className="flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in with Google"}
        </Button>
        <Button
          onClick={() => handleSignIn("github")}
          className="flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in with GitHub"}
        </Button>
      </div>
      
      <div className="mt-8 text-sm text-gray-500">
        <p>Session Status: {status}</p>
        {session && <p>User: {session.user?.email}</p>}
      </div>
    </div>
  );
}