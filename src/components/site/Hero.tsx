import heroImg from "@/assets/hero-cars.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Featured cars at sunset"
          className="h-full w-full object-cover"
          width={1600}
          height={800}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/10" />
      </div>

      <div className="container relative grid gap-8 py-10 md:grid-cols-2 md:py-20">
        <div className="space-y-5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-india-green" /> Made in India · #1 Marketplace
          </span>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
            <span className="text-primary">Buy.</span> Sell.{" "}
            <span className="text-india-green">Trust.</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-foreground to-india-green bg-clip-text text-transparent">
              Drive what's next.
            </span>
          </h1>
          <p className="max-w-md text-muted-foreground">
            Thousands of verified cars, bikes and more — all in one flexible
            dashboard. Browse, compare and sell with confidence.
          </p>

          <div className="rounded-2xl border border-border bg-card p-3 shadow-card md:p-4">
            <div className="grid gap-2 md:grid-cols-[1fr_1fr_auto]">
              <Select defaultValue="cars">
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cars">Cars</SelectItem>
                  <SelectItem value="bikes">Bikes</SelectItem>
                  <SelectItem value="mobiles">Mobiles</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input className="h-12 pl-10" placeholder="Brand, model or keyword" />
              </div>
              <Button size="lg" variant="hero" className="h-12">
                Search
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 pt-2 text-sm">
            <Stat n="50K+" label="Listings" />
            <Stat n="12K+" label="Sellers" />
            <Stat n="4.8★" label="User rating" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Stat = ({ n, label }: { n: string; label: string }) => (
  <div>
    <div className="text-xl font-bold text-foreground">{n}</div>
    <div className="text-xs uppercase tracking-wider text-muted-foreground">
      {label}
    </div>
  </div>
);
