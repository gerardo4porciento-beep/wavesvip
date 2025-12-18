import * as admin from 'firebase-admin';

if (!admin.apps.length) {
    // Only try to initialize if we have the required environment variables
    // This prevents build-time errors when env vars might be missing
    if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
        try {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    // Replace escaped newlines if they exist in the env var
                    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                }),
            });
            console.log('Firebase Admin Initialized successfully');
        } catch (error) {
            console.error('Firebase Admin Initialization error', error);
        }
    } else {
        console.warn('Firebase Admin skipped initialization: Missing environment variables');
    }
}

// Export a getter or a safe instance. 
// If initialization failed or skipped, this might throw or return undefined depending on usage.
// For now, valid operations require initialization.
export const db = admin.apps.length ? admin.firestore() : null;

