import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl

    const publicPaths = ["/", "/login", "/register"]

    if (publicPaths.includes(pathname) || pathname.startsWith("/api/auth")) {
      return NextResponse.next()
    }

    if (!req.nextauth.token) {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
)

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
}
