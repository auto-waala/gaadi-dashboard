import { Header } from "@/components/site/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const passwordSchema = z.string().min(8, "Min 8 characters").max(72);

const ResetPassword = () => {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // Supabase parses the recovery hash and emits a PASSWORD_RECOVERY / SIGNED_IN event.
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const pv = passwordSchema.safeParse(password);
    if (!pv.success) return toast({ title: pv.error.issues[0].message });
    if (password !== confirm) return toast({ title: "Passwords do not match" });
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: pv.data });
    setBusy(false);
    if (error) return toast({ title: "Could not update", description: error.message });
    toast({ title: "Password updated", description: "You're now signed in." });
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container flex items-center justify-center py-12">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-card">
          <h1 className="text-2xl font-bold">Set a new password</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Enter your new password below.
          </p>
          {!ready ? (
            <p className="mt-6 text-sm text-muted-foreground">
              Validating reset link...
            </p>
          ) : (
            <form onSubmit={submit} className="mt-6 space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="np">New password</Label>
                <Input id="np" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cp">Confirm password</Label>
                <Input id="cp" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
              </div>
              <Button type="submit" variant="hero" className="w-full" disabled={busy}>
                {busy ? "Updating..." : "Update password"}
              </Button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;
