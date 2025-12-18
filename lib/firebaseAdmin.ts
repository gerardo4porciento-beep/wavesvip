import * as admin from 'firebase-admin';

if (!admin.apps.length) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (projectId && clientEmail && privateKey) {
        try {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId,
                    clientEmail,
                    privateKey: privateKey.replace(/\\n/g, '\n'),
                }),
            });
            console.log('Firebase Admin Initialized successfully');
        } catch (error) {
            console.error('Firebase Admin Initialization error', error);
        }
    } else {
        console.warn('Firebase Admin skipped initialization. Missing vars:');
        if (!projectId) console.warn('- FIREBASE_PROJECT_ID is missing');
        if (!clientEmail) console.warn('- FIREBASE_CLIENT_EMAIL is missing');
        if (!privateKey) console.warn('- FIREBASE_PRIVATE_KEY is missing');
    }
}

// Export a getter or a safe instance. 
// If initialization failed or skipped, this might throw or return undefined depending on usage.
// For now, valid operations require initialization.
export const db = admin.apps.length ? admin.firestore() : null;

