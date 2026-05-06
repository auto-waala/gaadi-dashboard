import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

type Mode = "login" | "register";

const emailSchema = z.string().trim().email("Enter a valid email").max(255);

export const LoginMenu = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [busy, setBusy] = useState(false);

  if (user) {
    const initial =
      (user.user_metadata?.first_name as string)?.[0]?.toUpperCase() ||
      user.email?.[0]?.toUpperCase() ||
      "U";
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {initial}
            </span>
            <span className="max-w-[120px] truncate">{user.email}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem disabled className="text-xs">
            Signed in
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={async () => {
              await signOut();
              toast({ title: "Signed out" });
            }}
            className="text-destructive"
          >
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const ev = emailSchema.safeParse(email);
    if (!ev.success) return toast({ title: ev.error.issues[0].message });
    if (!password) return toast({ title: "Enter your password" });
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: ev.data,
      password,
    });
    setBusy(false);
    if (error) return toast({ title: "Login failed", description: error.message });
    toast({ title: "Welcome back!" });
    setOpen(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !phone) return toast({ title: "Please fill all fields" });
    const ev = emailSchema.safeParse(regEmail);
    if (!ev.success) return toast({ title: ev.error.issues[0].message });
    if (regPassword.length < 8) return toast({ title: "Password must be at least 8 characters" });
    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email: ev.data,
      password: regPassword,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: { first_name: firstName, last_name: lastName, phone },
      },
    });
    setBusy(false);
    if (error) return toast({ title: "Signup failed", description: error.message });
    toast({ title: "Account created", description: "You're now signed in." });
    setOpen(false);
  };

  const goForgot = () => {
    setOpen(false);
    navigate("/auth?mode=forgot");
  };

  return (
    <Popover
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setMode("login");
      }}
    >
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
          <User className="mr-1 h-4 w-4" /> Login
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-5">
        <div className="mb-4">
          <h3 className="text-base font-bold">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h3>
          <p className="text-xs text-muted-foreground">
            {mode === "login"
              ? "Login to manage your listings & favorites"
              : "Join AutoNext in less than a minute"}
          </p>
        </div>

        {mode === "login" ? (
          <form onSubmit={handleLogin} className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="login-email" className="text-xs">Email</Label>
              <Input id="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-10" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="login-password" className="text-xs">Password</Label>
                <button type="button" className="text-xs font-medium text-primary hover:underline" onClick={goForgot}>
                  Forgot?
                </button>
              </div>
              <Input id="login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-10" />
            </div>
            <Button type="submit" variant="hero" className="w-full" disabled={busy}>
              {busy ? "Signing in..." : "Login"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1.5">
                <Label htmlFor="reg-first" className="text-xs">First name</Label>
                <Input id="reg-first" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="h-10" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="reg-last" className="text-xs">Last name</Label>
                <Input id="reg-last" value={lastName} onChange={(e) => setLastName(e.target.value)} className="h-10" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="reg-email" className="text-xs">Email</Label>
              <Input id="reg-email" type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} className="h-10" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="reg-phone" className="text-xs">Phone</Label>
              <Input id="reg-phone" type="tel" placeholder="+91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} className="h-10" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="reg-password" className="text-xs">Password</Label>
              <Input id="reg-password" type="password" placeholder="Min 8 characters" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} className="h-10" />
            </div>
            <Button type="submit" variant="hero" className="w-full" disabled={busy}>
              {busy ? "Creating..." : "Create account"}
            </Button>
          </form>
        )}

        <p className="mt-4 text-center text-xs text-muted-foreground">
          {mode === "login" ? (
            <>
              New to AutoNext?{" "}
              <button type="button" onClick={() => setMode("register")} className="font-semibold text-primary hover:underline">
                Create an account
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button type="button" onClick={() => setMode("login")} className="font-semibold text-primary hover:underline">
                Login
              </button>
            </>
          )}
        </p>

        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          Prefer the full page?{" "}
          <Link to="/auth" onClick={() => setOpen(false)} className="font-semibold text-primary hover:underline">
            Open auth page
          </Link>
        </p>
      </PopoverContent>
    </Popover>
  );
};
