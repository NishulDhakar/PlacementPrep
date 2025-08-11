import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const { pathname } = req.nextUrl;

        // Public routes
        const publicPaths = [
          "/",               // Landing page
          "/login",          // Login page
          "/register",       // Signup/Register page
        ];

        // Allow NextAuth API routes & public pages
        if (
          pathname.startsWith("/api/auth") ||
          publicPaths.includes(pathname)
        ) {
          return true;
        }

        // Everything else requires authentication
        return !!token;
      },
    },
  }
);

// Middleware will run for all routes except static/image/favicon
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
