import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default withAuth(
  function middleware(req: NextRequest) {
    const token = req.nextauth.token

    // Non connecté → /sign-in
    if (!token) {
      return NextResponse.redirect(new URL("/sign-in", req.url))
    }

    // Connecté mais pas admin → /unauthorized
    // if (token?.role !== "admin") {
    //   return NextResponse.redirect(new URL("/unauthorized", req.url))
    // }

    // OK : accès autorisé
    return NextResponse.next()
  },
  {
    pages: {
      signIn: "/sign-in",
    },
  }
)

export const config = {
  matcher: ["/admin/:path*",],
}
