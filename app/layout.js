// app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/auth/SessionProvider"; // Import the session provider
import { Toaster } from "@/components/ui/sonner"; // Global toaster for notifications

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Project Management Lite",
  description: "A lite project management tool built with Next.js and Auth.js.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          {children}
        </SessionProvider>
        
        <Toaster richColors />
      </body>
    </html>
  );
}