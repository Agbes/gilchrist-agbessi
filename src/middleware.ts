import { withAuth } from "next-auth/middleware";
import { type NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const token = req.nextauth.token;
    const origin = req.nextUrl.origin;

    console.log("🔒 Token JWT dans middleware :", token);

    if (!token) {
      return NextResponse.redirect(new URL("/sign-in", origin));
    }

    if (!token?.role) {
      return NextResponse.redirect(new URL("/sign-in", origin));
    }

    if (token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", origin));
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/sign-in",
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
