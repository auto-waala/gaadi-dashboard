import { useEffect, useState } from "react";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { MessageSquarePlus } from "lucide-react";

const STORAGE_KEY = "autonext_enquiry_shown";
const DELAY_MS = 10 * 60 * 1000; // 10 minutes

const enquirySchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s()]{7,15}$/, "Enter a valid phone number"),
  city: z.string().trim().min(2, "City is required").max(80),
  lookingFor: z.string().min(1, "Please pick what you're looking for"),
});

type EnquiryForm = z.infer<typeof enquirySchema>;

const lookingForOptions = [
  "Cars", "EV", "Bikes", "Cycles", "Trucks", "Tractors", "Buses",
  "Auto/Rickshaw", "Spare Parts",
];

export const EnquiryPopup = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<EnquiryForm>({
    name: "", email: "", phone: "", city: "", lookingFor: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryForm, string>>>({});

  useEffect(() => {
    if (user) return;
    if (localStorage.getItem(STORAGE_KEY)) return;

    const t = setTimeout(() => {
      if (!user && !localStorage.getItem(STORAGE_KEY)) setOpen(true);
    }, DELAY_MS);
    return () => clearTimeout(t);
  }, [user]);

  const handleChange = (k: keyof EnquiryForm, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = enquirySchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof EnquiryForm, string>> = {};
      result.error.issues.forEach((i) => {
        const k = i.path[0] as keyof EnquiryForm;
        if (!fieldErrors[k]) fieldErrors[k] = i.message;
      });
      setErrors(fieldErrors);
      return;
    }
    // TODO: wire to your backend
    localStorage.setItem(STORAGE_KEY, "1");
    toast({
      title: "Thanks for your enquiry!",
      description: "Our team will reach out to you shortly.",
    });
    setOpen(false);
  };

  const handleOpenChange = (v: boolean) => {
    if (!v) localStorage.setItem(STORAGE_KEY, "1");
    setOpen(v);
  };

  return (
    <>
      {/* Floating "Enquire now" button — visible on every page */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-elegant transition-smooth hover:scale-105 hover:bg-primary/90 md:bottom-6 md:right-6"
        aria-label="Open enquiry form"
      >
        <MessageSquarePlus className="h-4 w-4" /> Enquire
      </button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Looking for the perfect ride?</DialogTitle>
          <DialogDescription>
            Tell us a bit about you and we'll help you find it — no signup needed.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="enq-name">Name</Label>
            <Input
              id="enq-name"
              value={form.name}
              maxLength={100}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="enq-email">Email</Label>
            <Input
              id="enq-email"
              type="email"
              value={form.email}
              maxLength={255}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="enq-phone">Phone</Label>
            <Input
              id="enq-phone"
              type="tel"
              value={form.phone}
              maxLength={15}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
            {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="enq-city">City</Label>
            <Input
              id="enq-city"
              value={form.city}
              maxLength={80}
              onChange={(e) => handleChange("city", e.target.value)}
            />
            {errors.city && <p className="text-xs text-destructive">{errors.city}</p>}
          </div>
          <div className="space-y-1">
            <Label>Looking for</Label>
            <Select
              value={form.lookingFor}
              onValueChange={(v) => handleChange("lookingFor", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {lookingForOptions.map((o) => (
                  <SelectItem key={o} value={o}>{o}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.lookingFor && (
              <p className="text-xs text-destructive">{errors.lookingFor}</p>
            )}
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => handleOpenChange(false)}>
              Maybe later
            </Button>
            <Button type="submit" variant="hero">Submit enquiry</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
    </>
  );
};
