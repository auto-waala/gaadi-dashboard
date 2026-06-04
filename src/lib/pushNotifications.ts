import { getToken, onMessage } from "firebase/messaging";
import { getMessagingIfSupported, VAPID_KEY, isFirebaseConfigured } from "./firebase";

export const PUSH_TOKEN_KEY = "autonext_fcm_token";

export async function enablePushNotifications(): Promise<
  { ok: true; token: string } | { ok: false; reason: string }
> {
  if (!isFirebaseConfigured()) {
    return { ok: false, reason: "Firebase not configured yet." };
  }
  
  if (typeof window === "undefined" || !("Notification" in window)) {
    return { ok: false, reason: "Notifications not supported on this device." };
  }
  
  if (!("serviceWorker" in navigator)) {
    return { ok: false, reason: "Service workers not supported." };
  }

  let permission = Notification.permission;
  if (permission === "default") {
    permission = await Notification.requestPermission();
  }
  
  if (permission !== "granted") {
    return { ok: false, reason: "Permission denied." };
  }

  const swReg = await navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .catch((e) => {
      console.error("SW register failed", e);
      return null;
    });
    
  if (!swReg) {
    return { ok: false, reason: "Could not register service worker." };
  }

  const messaging = await getMessagingIfSupported();
  if (!messaging) {
    return { ok: false, reason: "Messaging not supported." };
  }

  try {
    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: swReg,
    });
    
    if (!token) {
      return { ok: false, reason: "Empty token." };
    }
    
    localStorage.setItem(PUSH_TOKEN_KEY, token);
    
    onMessage(messaging, (payload) => {
      const title = payload.notification?.title || "AutoNext";
      const body = payload.notification?.body || "";
      if (Notification.permission === "granted") {
        new Notification(title, { body, icon: "/icon-192.png" });
      }
    });
    
    return { ok: true, token };
  } catch (e: any) {
    return { ok: false, reason: e?.message || "Failed to get token." };
  }
}