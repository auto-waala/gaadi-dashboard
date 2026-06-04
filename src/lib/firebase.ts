// Firebase web config for AutoNext push notifications (FCM).
// These values are publishable (safe to ship in client code). Replace the
// placeholders with your Firebase project's web app config from:
// Firebase Console -> Project Settings -> Your apps -> Web app.
// Also update public/firebase-messaging-sw.js with the same values, and
// generate a VAPID key in Project Settings -> Cloud Messaging -> Web Push.
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getMessaging, isSupported, type Messaging } from "firebase/messaging";

export const firebaseConfig = {
  apiKey: "REPLACE_API_KEY",
  authDomain: "REPLACE_PROJECT_ID.firebaseapp.com",
  projectId: "REPLACE_PROJECT_ID",
  storageBucket: "REPLACE_PROJECT_ID.appspot.com",
  messagingSenderId: "REPLACE_SENDER_ID",
  appId: "REPLACE_APP_ID",
};

export const VAPID_KEY = "REPLACE_VAPID_PUBLIC_KEY";

export const isFirebaseConfigured = () =>
  !firebaseConfig.apiKey.startsWith("REPLACE_") &&
  !VAPID_KEY.startsWith("REPLACE_");

let app: FirebaseApp | null = null;
export const getFirebaseApp = (): FirebaseApp | null => {
  if (!isFirebaseConfigured()) return null;
  if (app) return app;
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  return app;
};

export const getMessagingIfSupported = async (): Promise<Messaging | null> => {
  const supported = await isSupported().catch(() => false);
  const a = getFirebaseApp();
  if (!supported || !a) return null;
  return getMessaging(a);
};
