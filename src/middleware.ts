// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
    function middleware(req: NextRequest) {
        const token = req.nextauth.token;
        const origin = req.nextUrl.origin;

        console.log("🔒 Token JWT dans middleware :", token);

        if (!token) {
            console.log("❌ Aucun token trouvé");
            return NextResponse.redirect(new URL("/sign-in", origin));
        }

        console.log("🧪 Token dans middleware :", token);

        if (!token.role) {
            console.log("❌ Aucun rôle défini dans le token");
            return NextResponse.redirect(new URL("/sign-in", origin));
        }


        if (!token?.role) {
            console.log("🔒 Pas de rôle défini, redirection vers /sign-in");
            return NextResponse.redirect(new URL("/sign-in", origin));
        }

        if (token.role !== "ADMIN") {
            console.log("⛔ Accès refusé pour rôle :", token.role);
            return NextResponse.redirect(new URL("/unauthorized", origin));
        }

        console.log("✅ Accès autorisé à l'admin");
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
