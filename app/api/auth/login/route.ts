import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        const adminUser = process.env.ADMIN_USERNAME;
        const adminPass = process.env.ADMIN_PASSWORD;

        if (username === adminUser && password === adminPass) {
            const response = NextResponse.json({ message: "Login successful" });
            response.cookies.set("admin_token", "authenticated", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 24, // 1 day
                path: "/",
            });
            return response;
        }

        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    } catch {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
