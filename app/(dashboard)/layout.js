// app/(dashboard)/layout.js
"use client"; // The layout needs to be a client component for signOut

import Link from "next/link";
import { signOut, useSession } from "next-auth/react"; // Import useSession
import { Button } from "@/components/ui/button"; // Import Shadcn Button
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Still loading
    
    if (status === "unauthenticated") {
      console.log("User not authenticated, redirecting to sign-in");
      router.push("/sign-in");
      return;
    }
  }, [status, router]);

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Don't render layout if not authenticated (will redirect)
  if (status === "unauthenticated") {
    return null;
  }

  return (
    <section className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 text-white shadow-lg flex flex-col justify-between"> {/* Added flex-col justify-between */}
        <div>
          <h2 className="text-2xl font-bold mb-8">ProjectLite</h2>
          <nav className="space-y-4">
            <Link href="/dashboard" className="block text-gray-300 hover:text-white transition-colors duration-200">
              Dashboard
            </Link>
            <Link href="/settings" className="block text-gray-300 hover:text-white transition-colors duration-200">
              Settings
            </Link>
          </nav>
        </div>
        {/* Sign Out Button at the bottom */}
        <div className="mt-8"> {/* Margin top to push it down */}
          <Button
            onClick={() => signOut({ callbackUrl: "/sign-in" })} // Redirect to sign-in page after logout
            variant="outline" // Use an outline variant
            className="w-full text-black border-white hover:bg-white hover:text-gray-800"
          >
            Sign Out
          </Button>
        </div>
      </aside>
      {/* Main content area */}
      <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
        {children}
      </main>
    </section>
  );
}