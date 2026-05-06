import { Header } from "@/components/site/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";

const emailSchema = z.string().trim().email("Enter a valid email").max(255);
const passwordSchema = z.string().min(8, "Min 8 characters").max(72);

const Auth = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const initialMode = (params.get("mode") as "login" | "register" | "forgot") || "login";
  const [mode, setMode] = useState<"login" | "register" | "forgot">(initialMode);

  useEffect(() => {
    if (!loading && user) navigate("/", { replace: true });
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container flex items-center justify-center py-12">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold">
              {mode === "forgot" ? "Reset password" : "Welcome to AutoNext"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {mode === "forgot"
                ? "We'll email you a secure reset link"
                : "Buy & sell vehicles across India"}
            </p>
          </div>

          {mode === "forgot" ? (
            <ForgotForm onBack={() => setMode("login")} />
          ) : (
            <Tabs value={mode} onValueChange={(v) => setMode(v as any)}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginForm onForgot={() => setMode("forgot")} />
              </TabsContent>
              <TabsContent value="register">
                <RegisterForm onDone={() => setMode("login")} />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
    </div>
  );
};

const LoginForm = ({ onForgot }: { onForgot: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
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
  };

  return (
    <form onSubmit={submit} className="mt-4 space-y-3">
      <div className="space-y-1.5">
        <Label htmlFor="lemail">Email</Label>
        <Input id="lemail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="lpw">Password</Label>
          <button type="button" onClick={onForgot} className="text-xs font-medium text-primary hover:underline">
            Forgot password?
          </button>
        </div>
        <Input id="lpw" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <Button type="submit" variant="hero" className="w-full" disabled={busy}>
        {busy ? "Signing in..." : "Login"}
      </Button>
    </form>
  );
};

const RegisterForm = ({ onDone }: { onDone: () => void }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName) return toast({ title: "Enter your name" });
    const ev = emailSchema.safeParse(email);
    if (!ev.success) return toast({ title: ev.error.issues[0].message });
    const pv = passwordSchema.safeParse(password);
    if (!pv.success) return toast({ title: pv.error.issues[0].message });
    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email: ev.data,
      password: pv.data,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: { first_name: firstName, last_name: lastName, phone },
      },
    });
    setBusy(false);
    if (error) return toast({ title: "Signup failed", description: error.message });
    toast({ title: "Account created", description: "You can now login." });
    onDone();
  };

  return (
    <form onSubmit={submit} className="mt-4 space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1.5">
          <Label htmlFor="fn">First name</Label>
          <Input id="fn" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="ln">Last name</Label>
          <Input id="ln" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="remail">Email</Label>
        <Input id="remail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="rphone">Phone</Label>
        <Input id="rphone" type="tel" placeholder="+91 ..." value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="rpw">Password</Label>
        <Input id="rpw" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <Button type="submit" variant="hero" className="w-full" disabled={busy}>
        {busy ? "Creating..." : "Create account"}
      </Button>
    </form>
  );
};

const ForgotForm = ({ onBack }: { onBack: () => void }) => {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ev = emailSchema.safeParse(email);
    if (!ev.success) return toast({ title: ev.error.issues[0].message });
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(ev.data, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setBusy(false);
    if (error) return toast({ title: "Could not send", description: error.message });
    setSent(true);
    toast({ title: "Check your inbox", description: "We sent a reset link to " + ev.data });
  };

  if (sent) {
    return (
      <div className="mt-4 space-y-4 text-center">
        <p className="text-sm text-muted-foreground">
          A reset link has been sent to <strong>{email}</strong>. Click the link in the email to set a new password.
        </p>
        <Button variant="outline" className="w-full" onClick={onBack}>
          Back to login
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-4 space-y-3">
      <div className="space-y-1.5">
        <Label htmlFor="femail">Email</Label>
        <Input id="femail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <Button type="submit" variant="hero" className="w-full" disabled={busy}>
        {busy ? "Sending..." : "Send reset link"}
      </Button>
      <button
        type="button"
        onClick={onBack}
        className="block w-full text-center text-sm font-medium text-primary hover:underline"
      >
        Back to login
      </button>
    </form>
  );
};

export default Auth;
