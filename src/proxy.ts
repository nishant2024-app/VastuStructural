import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/auth";

export default async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Direct access to login or public pages
    if (pathname === "/admin/login") {
        return NextResponse.next();
    }

    // Protect all /admin routes
    if (pathname.startsWith("/admin")) {
        const session = request.cookies.get("session")?.value;

        if (!session) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }

        try {
            await decrypt(session);
            return NextResponse.next();
        } catch (error) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    // Protect administrative APIs
    if (pathname.startsWith("/api/leads") && (request.method === "GET" || request.method === "PATCH")) {
        const session = request.cookies.get("session")?.value;
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        try {
            await decrypt(session);
        } catch (error) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/api/leads"],
};
