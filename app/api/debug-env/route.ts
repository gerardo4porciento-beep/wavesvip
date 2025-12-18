
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
    // Return ONLY the keys, never the values, for security
    const envKeys = Object.keys(process.env).sort();

    const firebaseVars = {
        projectId: process.env.FIREBASE_PROJECT_ID ? 'PRESENT' : 'MISSING',
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL ? 'PRESENT' : 'MISSING',
        privateKey: process.env.FIREBASE_PRIVATE_KEY ? 'PRESENT' : 'MISSING',
    };

    return NextResponse.json({
        message: "Environment Variable Debug",
        firebaseVars,
        allKeys: envKeys,
        nodeEnv: process.env.NODE_ENV
    });
}
