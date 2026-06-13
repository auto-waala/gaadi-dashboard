import { Header } from "@/components/site/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { lovable } from "@/integrations/lovable";

const GoogleButton = () => {
  const [busy, setBusy] = useState(false);
  const handleGoogle = async () => {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setBusy(false);
      toast({ title: "Google sign-in failed", description: String(result.error) });
      return;
    }
    if (result.redirected) return;
  };
  return (
    <div className="mt-4 space-y-3">
      <Button type="button" variant="outline" className="w-full" onClick={handleGoogle} disabled={busy}>
        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z"/>
        </svg>
        {busy ? "Redirecting..." : "Continue with Google"}
      </Button>
      <div className="relative">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
        </div>
      </div>
    </div>
  );
};

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
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ev = emailSchema.safeParse(email);
    if (!ev.success) return toast({ title: ev.error.issues[0].message });
    if (!password) return toast({ title: "Enter your password" });
    setBusy(true);
    const { error } = await signIn(ev.data, password);
    setBusy(false);
    if (error) return toast({ title: "Login failed", description: error });
    toast({ title: "Welcome back!" });
  };

  return (
    <>
    <GoogleButton />
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
    </>
  );
};

const RegisterForm = ({ onDone }: { onDone: () => void }) => {
  const { signUp } = useAuth();
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
    const { error } = await signUp({
      id: crypto.randomUUID(),
      email: ev.data,
      password: pv.data,
      first_name: firstName,
      last_name: lastName,
      phone,
    });
    setBusy(false);
    if (error) return toast({ title: "Signup failed", description: error });
    toast({ title: "Account created", description: "You can now login." });
    onDone();
  };

  return (
    <>
    <GoogleButton />
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
    </>
  );
};

const ForgotForm = ({ onBack }: { onBack: () => void }) => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ev = emailSchema.safeParse(email);
    if (!ev.success) return toast({ title: ev.error.issues[0].message });
    setBusy(true);
    const { error } = await resetPassword(ev.data);
    setBusy(false);
    if (error) return toast({ title: "Could not send", description: error });
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
