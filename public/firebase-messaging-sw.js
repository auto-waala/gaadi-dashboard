/* Firebase Cloud Messaging service worker for AutoNext.
   IMPORTANT: keep config values in sync with src/lib/firebase.ts.
   Replace the placeholder values below with your Firebase project's web config. */
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "REPLACE_API_KEY",
  authDomain: "REPLACE_PROJECT_ID.firebaseapp.com",
  projectId: "REPLACE_PROJECT_ID",
  storageBucket: "REPLACE_PROJECT_ID.appspot.com",
  messagingSenderId: "REPLACE_SENDER_ID",
  appId: "REPLACE_APP_ID",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload?.notification?.title || "AutoNext";
  const options = {
    body: payload?.notification?.body || "",
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    data: payload?.data || {},
  };
  self.registration.showNotification(title, options);
});
