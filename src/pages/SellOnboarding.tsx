import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Check, Camera, FileText, IndianRupee, ShieldCheck } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const steps = [
  { n: 1, label: "Category", icon: FileText },
  { n: 2, label: "Vehicle Details", icon: Camera },
  { n: 3, label: "Price & Contact", icon: IndianRupee },
];

const SellOnboarding = () => {
  const [step, setStep] = useState(1);

  const next = () => setStep((s) => Math.min(3, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const submit = () => {
    toast({
      title: "Listing submitted!",
      description: "Our team will verify and publish your ad within 24 hours.",
    });
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="mb-6 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            <ShieldCheck className="h-3 w-3" /> Free to list · Verified buyers
          </span>
          <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">
            Sell on <span className="text-primary">Auto</span>
            <span className="text-india-green">Next</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Reach lakhs of genuine buyers across India in minutes.
          </p>
        </div>

        {/* Stepper */}
        <div className="mx-auto mb-8 flex max-w-2xl items-center justify-between">
          {steps.map((s, i) => (
            <div key={s.n} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-bold ${
                    step >= s.n
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground"
                  }`}
                >
                  {step > s.n ? <Check className="h-5 w-5" /> : s.n}
                </div>
                <span className="text-xs font-medium">{s.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`mx-2 h-0.5 flex-1 ${
                    step > s.n ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <Card className="mx-auto max-w-2xl p-6 shadow-card md:p-8">
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold">Choose category</h2>
              <div>
                <Label>Category</Label>
                <Select defaultValue="cars">
                  <SelectTrigger className="mt-1.5 h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cars">Cars</SelectItem>
                    <SelectItem value="bikes">Bikes</SelectItem>
                    <SelectItem value="ev">EVs</SelectItem>
                    <SelectItem value="trucks">Trucks</SelectItem>
                    <SelectItem value="tractors">Tractors</SelectItem>
                    <SelectItem value="buses">Buses</SelectItem>
                    <SelectItem value="parts">Spare Parts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Brand</Label>
                  <Input className="mt-1.5 h-11" placeholder="e.g. Maruti Suzuki" />
                </div>
                <div>
                  <Label>Model</Label>
                  <Input className="mt-1.5 h-11" placeholder="e.g. Swift VXi" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold">Vehicle details</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Year</Label>
                  <Input type="number" className="mt-1.5 h-11" placeholder="2022" />
                </div>
                <div>
                  <Label>KM Driven</Label>
                  <Input type="number" className="mt-1.5 h-11" placeholder="15000" />
                </div>
                <div>
                  <Label>Fuel Type</Label>
                  <Select>
                    <SelectTrigger className="mt-1.5 h-11"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="petrol">Petrol</SelectItem>
                      <SelectItem value="diesel">Diesel</SelectItem>
                      <SelectItem value="electric">Electric</SelectItem>
                      <SelectItem value="cng">CNG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Transmission</Label>
                  <Select>
                    <SelectTrigger className="mt-1.5 h-11"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manual">Manual</SelectItem>
                      <SelectItem value="auto">Automatic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea className="mt-1.5" rows={4} placeholder="Single owner, well maintained..." />
              </div>
              <div className="rounded-lg border-2 border-dashed border-border bg-secondary/40 p-6 text-center">
                <Camera className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm font-medium">Upload photos</p>
                <p className="text-xs text-muted-foreground">Add up to 8 photos · JPG/PNG</p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold">Price & contact</h2>
              <div>
                <Label>Expected price (₹)</Label>
                <Input type="number" className="mt-1.5 h-11" placeholder="685000" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Your name</Label>
                  <Input className="mt-1.5 h-11" placeholder="Rajesh Kumar" />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input className="mt-1.5 h-11" placeholder="+91 98xxxxxx" />
                </div>
                <div>
                  <Label>City</Label>
                  <Input className="mt-1.5 h-11" placeholder="Mumbai" />
                </div>
                <div>
                  <Label>Pincode</Label>
                  <Input className="mt-1.5 h-11" placeholder="400001" />
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between gap-3">
            <Button variant="outline" onClick={prev} disabled={step === 1}>
              Back
            </Button>
            {step < 3 ? (
              <Button variant="hero" onClick={next}>Continue</Button>
            ) : (
              <Button variant="hero" onClick={submit}>Post my ad</Button>
            )}
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default SellOnboarding;
