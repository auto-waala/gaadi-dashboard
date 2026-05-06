import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export const LoginMenu = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: "Please fill in both fields" });
      return;
    }
    toast({ title: "Login is not connected yet", description: "Enable Lovable Cloud to wire up real authentication." });
    setOpen(false);
  };

  const handleSocial = (provider: string) => {
    toast({ title: `${provider} login coming soon` });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
          <User className="mr-1 h-4 w-4" /> Login
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-5">
        <div className="mb-4">
          <h3 className="text-base font-bold">Welcome back</h3>
          <p className="text-xs text-muted-foreground">
            Login to manage your listings & favorites
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="login-email" className="text-xs">
              Email
            </Label>
            <Input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10"
            />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="login-password" className="text-xs">
                Password
              </Label>
              <button
                type="button"
                className="text-xs font-medium text-primary hover:underline"
                onClick={() => toast({ title: "Reset link coming soon" })}
              >
                Forgot?
              </button>
            </div>
            <Input
              id="login-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10"
            />
          </div>
          <Button type="submit" variant="hero" className="w-full">
            Login
          </Button>
        </form>

        <div className="my-4 flex items-center gap-2">
          <span className="h-px flex-1 bg-border" />
          <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
            or continue with
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleSocial("Google")}
            className="gap-2"
          >
            <GoogleIcon /> Google
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleSocial("Facebook")}
            className="gap-2"
          >
            <FacebookIcon /> Facebook
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleSocial("Apple")}
            className="gap-2"
          >
            <AppleIcon /> Apple
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleSocial("Phone OTP")}
            className="gap-2"
          >
            📱 Phone
          </Button>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          New to GaadiBazaar?{" "}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              toast({ title: "Registration coming soon" });
            }}
            className="font-semibold text-primary hover:underline"
          >
            Create an account
          </button>
        </p>
      </PopoverContent>
    </Popover>
  );
};

const GoogleIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z"/>
  </svg>
);

const AppleIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
  </svg>
);
