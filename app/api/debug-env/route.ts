
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

    const googleVars = {
        serviceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || 'MISSING',
    };

    const activeConfig = {
        projectId: process.env.FIREBASE_PROJECT_ID || 'wavesvip-962d8',
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL || process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || 'MISSING',
    };

    return NextResponse.json({
        message: "Environment Variable Debug",
        firebaseVars,
        googleVars,
        activeConfig, // This will show the actual email being used
        // allKeys: envKeys, // Removing full key list to reduce noise
        nodeEnv: process.env.NODE_ENV
    });
}
