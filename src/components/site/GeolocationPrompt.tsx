import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";

const STORAGE_KEY = "autonext_user_location";

export const GeolocationPrompt = () => {
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      console.warn("[Geolocation] Not supported in this browser");
      return;
    }

    // Avoid re-prompting in the same session
    const cached = sessionStorage.getItem(STORAGE_KEY);
    if (cached) {
      console.log("[Geolocation] Cached user location:", JSON.parse(cached));
      return;
    }

    const t = setTimeout(() => {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const data = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
            timestamp: new Date(pos.timestamp).toISOString(),
          };
          console.log("[Geolocation] User location captured:", data);

          // Try reverse geocoding for a friendly name
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${data.latitude}&lon=${data.longitude}`
            );
            if (res.ok) {
              const j = await res.json();
              const place =
                j.address?.city ||
                j.address?.town ||
                j.address?.village ||
                j.address?.state ||
                j.display_name;
              console.log("[Geolocation] Resolved place:", place, j.address);
              sessionStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({ ...data, place })
              );
              toast({ title: "Location detected", description: place });
              return;
            }
          } catch (err) {
            console.warn("[Geolocation] Reverse geocode failed:", err);
          }

          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        },
        (err) => {
          console.warn("[Geolocation] Permission denied or failed:", err.message);
        },
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
      );
    }, 1500);

    return () => clearTimeout(t);
  }, []);

  return null;
};
