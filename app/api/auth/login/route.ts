import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { username, password } = body;

        if (!username || !password) {
            return NextResponse.json(
                { error: "Usuario y contraseña son requeridos" },
                { status: 400 }
            );
        }

        // HARDCODED CREDENTIALS AS REQUESTED FOR SIMPLICITY
        const validUser = "admin";
        const validPass = "wavesvip";

        if (username === validUser && password === validPass) {
            // Set simple cookie
            const cookieStore = cookies();
            cookieStore.set("admin_session", "true", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 60 * 24, // 24 hours
                path: "/",
            });

            return NextResponse.json({ success: true });
        }

        return NextResponse.json(
            { error: "Credenciales inválidas" },
            { status: 401 }
        );
    } catch (error) {
        console.error("Error en login:", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
