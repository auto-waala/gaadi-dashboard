import { Bell, BellOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { enablePushNotifications } from "@/lib/pushNotifications";
import { isFirebaseConfigured } from "@/lib/firebase";
import { toast } from "@/hooks/use-toast";

export const EnableNotificationsButton = () => {
  const [status, setStatus] = useState<NotificationPermission | "unsupported">(
    "default",
  );

  useEffect(() => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      setStatus("unsupported");
      return;
    }
    setStatus(Notification.permission);
  }, []);

  if (status === "unsupported") return null;

  const handleClick = async () => {
    if (!isFirebaseConfigured()) {
      toast({
        title: "Push notifications not configured",
        description:
          "Add your Firebase web config to src/lib/firebase.ts and public/firebase-messaging-sw.js.",
      });
      return;
    }
    const res = await enablePushNotifications();
    if (res.ok === true) {
      setStatus("granted");
      toast({
        title: "Notifications enabled",
        description: "You'll get alerts for new arrivals & price drops.",
      });
    } else {
      toast({ title: "Could not enable notifications", description: res.reason });
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Enable notifications"
      onClick={handleClick}
      title={
        status === "granted" ? "Notifications enabled" : "Enable notifications"
      }
    >
      {status === "granted" ? (
        <Bell className="h-5 w-5 text-india-green" />
      ) : (
        <BellOff className="h-5 w-5" />
      )}
    </Button>
  );
};
