import { NextRequest, NextResponse } from "next/server";
import { encrypt } from "@/lib/auth";

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();

        // Simple professional credentials
        // In production, these should be in .env and password should be hashed
        const ADMIN_USER = process.env.ADMIN_USER || "admin";
        const ADMIN_PASS = process.env.ADMIN_PASSWORD || "admin123";

        if (username === ADMIN_USER && password === ADMIN_PASS) {
            // Create the session
            const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
            const session = await encrypt({ username, expires });

            const response = NextResponse.json({ success: true });

            // Set session cookie
            response.cookies.set("session", session, {
                expires,
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
            });

            return response;
        }

        return NextResponse.json(
            { error: "Invalid credentials" },
            { status: 401 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
