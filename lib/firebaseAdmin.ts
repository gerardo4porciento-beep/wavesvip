import * as admin from 'firebase-admin';

function cleanEnvVar(value: string | undefined) {
    if (!value) return undefined;
    // Remove surrounding quotes if present (common mistake when copying from .env files)
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        return value.slice(1, -1);
    }
    return value;
}

if (!admin.apps.length) {
    const projectId = cleanEnvVar(process.env.FIREBASE_PROJECT_ID) || 'wavesvip-962d8';
    const clientEmail = cleanEnvVar(process.env.FIREBASE_CLIENT_EMAIL) || cleanEnvVar(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
    const rawPrivateKey = cleanEnvVar(process.env.FIREBASE_PRIVATE_KEY) || cleanEnvVar(process.env.GOOGLE_PRIVATE_KEY);

    // Debug info (safe to log first chars)
    console.log("Checking Firebase Config:");
    console.log("Available Env Keys:", Object.keys(process.env).filter(k => k.startsWith('FIREBASE') || k.startsWith('NEXT_PUBLIC')));
    console.log(`- Project ID: ${projectId ? projectId.substring(0, 5) + '...' : 'MISSING (Type: ' + typeof process.env.FIREBASE_PROJECT_ID + ')'}`);
    console.log(`- Client Email: ${clientEmail ? clientEmail.substring(0, 5) + '...' : 'MISSING'}`);
    console.log(`- Private Key: ${rawPrivateKey ? 'Present (Length: ' + rawPrivateKey.length + ')' : 'MISSING'}`);

    if (projectId && clientEmail && rawPrivateKey) {
        try {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId,
                    clientEmail,
                    // Handle both literal \n and actual newlines
                    privateKey: rawPrivateKey.replace(/\\n/g, '\n'),
                }),
            });
            console.log('Firebase Admin Initialized successfully');
        } catch (error) {
            console.error('Firebase Admin Initialization error', error);
        }
    } else {
        console.warn('Firebase Admin skipped initialization. See logs above for missing vars.');
    }
}

export const db = admin.apps.length ? admin.firestore() : null;

