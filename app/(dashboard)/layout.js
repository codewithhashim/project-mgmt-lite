// app/(dashboard)/layout.js
"use client"; // The layout needs to be a client component for signOut

import Link from "next/link";
import { signOut } from "next-auth/react"; // Import signOut
import { Button } from "@/components/ui/button"; // Import Shadcn Button

export default function DashboardLayout({ children }) {
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