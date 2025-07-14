// middleware.js
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments the Next.js request with the user's token.
  function middleware(req) {
    // Example: Only admin users can access /admin
    // if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role !== "admin") {
    //   return NextResponse.rewrite(new URL("/auth/denied", req.url));
    // }

    // Example: If trying to access /sign-in while logged in, redirect to dashboard
    if (req.nextUrl.pathname.startsWith("/sign-in") && req.nextauth.token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Allow access to the route if authenticated
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // If there is a token, the user is authorized.
        // This protects all paths listed in `matcher`.
        return !!token;
      },
    },
    pages: {
      signIn: "/sign-in", // Redirect unauthenticated users to this page
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*", // Protect all routes under /dashboard
    "/settings/:path*",  // Protect all routes under /settings
  ],
};