import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Star, Fuel, Cog, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sectionCars, sectionMeta, type SectionKey } from "@/data/sections";
import { useMemo, useState } from "react";

const VALID: SectionKey[] = ["newlyarrived", "premium", "upcoming", "featured"];

// Type tabs (URL category). Extra labels map to "all".
const TYPES = [
  { label: "All", value: "all" },
  { label: "Cars", value: "cars" },
  { label: "EV", value: "ev" },
  { label: "Bikes", value: "bikes" },
  { label: "Cycles", value: "all" },
  { label: "Trucks", value: "trucks" },
  { label: "Tractors", value: "all" },
  { label: "Buses", value: "all" },
  { label: "Auto/Rickshaw", value: "all" },
  { label: "Spare Parts", value: "all" },
] as const;

const CATEGORIES = ["all", "cars", "ev", "bikes", "trucks"] as const;
type Category = (typeof CATEGORIES)[number];

const FUELS = ["Petrol", "Diesel", "Electric", "Hybrid"];

const parsePrice = (s: string): number => {
  const n = s.replace(/[^\d]/g, "");
  return n ? parseInt(n, 10) : 0;
};

const carCategory = (c: { fuel?: string; title: string }): Category => {
  if (c.fuel?.toLowerCase() === "electric") return "ev";
  const t = c.title.toLowerCase();
  if (/truck|tipper|lorry/.test(t)) return "trucks";
  if (/bike|bullet|pulsar|ktm|royal enfield|scooter/.test(t)) return "bikes";
  return "cars";
};

const FilterPanel = ({
  sectionKey,
  activeCat,
  price,
  setPrice,
  selectedFuels,
  toggleFuel,
  applied,
  apply,
  reset,
  transmissions,
  trans,
  setTrans,
}: {
  sectionKey: SectionKey;
  activeCat: Category;
  price: number[];
  setPrice: (v: number[]) => void;
  selectedFuels: string[];
  toggleFuel: (f: string) => void;
  applied: number;
  apply: () => void;
  reset: () => void;
  transmissions: string[];
  trans: string;
  setTrans: (v: string) => void;
}) => (
  <aside className="space-y-6 rounded-xl border border-border bg-card p-5 shadow-card">
    <div>
      <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">
        Type
      </h4>
      <div className="flex flex-wrap gap-2">
        {TYPES.map((t) => {
          const isActive = t.value === activeCat;
          return (
            <Link
              key={t.label}
              to={`/${sectionKey}/${t.value}`}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-smooth ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background hover:border-primary/40"
              }`}
            >
              {t.label}
            </Link>
          );
        })}
      </div>
    </div>

    <div>
      <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">
        Price (INR)
      </h4>
      <Slider
        value={price}
        onValueChange={setPrice}
        min={50000}
        max={20000000}
        step={50000}
      />
      <div className="mt-3 flex justify-between text-xs text-muted-foreground">
        <span>{price[0].toLocaleString()}</span>
        <span>{price[1].toLocaleString()}</span>
      </div>
    </div>

    <div>
      <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">
        Fuel
      </h4>
      <div className="grid grid-cols-2 gap-2">
        {FUELS.map((f) => (
          <label
            key={f}
            className="flex cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-2 text-xs hover:border-primary/40"
          >
            <input
              type="checkbox"
              checked={selectedFuels.includes(f)}
              onChange={() => toggleFuel(f)}
              className="accent-[hsl(var(--primary))]"
            />
            {f}
          </label>
        ))}
      </div>
    </div>

    {transmissions.length > 0 && (
      <div>
        <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          Transmission
        </h4>
        <div className="flex flex-wrap gap-2">
          {["All", ...transmissions].map((t) => (
            <button
              key={t}
              onClick={() => setTrans(t)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-smooth ${
                trans === t
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background hover:border-primary/40"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    )}

    <div className="flex gap-2">
      <Button variant="hero" className="flex-1" onClick={apply}>
        Apply filters
      </Button>
      <Button variant="outline" onClick={reset}>
        Reset
      </Button>
    </div>
  </aside>
);

const SectionListing = () => {
  const { section = "", category = "all" } = useParams();
  const key = section.toLowerCase() as SectionKey;
  if (!VALID.includes(key)) return <Navigate to="/" replace />;

  const cat = (CATEGORIES.includes(category as Category) ? category : "all") as Category;

  const meta = sectionMeta[key];
  const allCars = sectionCars[key];

  const [price, setPrice] = useState<number[]>([50000, 20000000]);
  const [selectedFuels, setSelectedFuels] = useState<string[]>([]);
  const [trans, setTrans] = useState("All");
  const [sort, setSort] = useState("recent");
  const [applied, setApplied] = useState(0); // bump to trigger re-filter (currently filters live)

  const transmissions = useMemo(
    () => Array.from(new Set(allCars.map((c) => c.transmission).filter(Boolean) as string[])),
    [allCars],
  );

  const toggleFuel = (f: string) =>
    setSelectedFuels((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f],
    );

  const filtered = useMemo(() => {
    let arr = [...allCars];
    if (cat !== "all") arr = arr.filter((c) => carCategory(c) === cat);
    if (selectedFuels.length > 0)
      arr = arr.filter((c) => c.fuel && selectedFuels.includes(c.fuel));
    if (trans !== "All") arr = arr.filter((c) => c.transmission === trans);
    arr = arr.filter((c) => {
      const p = parsePrice(c.price);
      if (!p) return true;
      return p >= price[0] && p <= price[1];
    });
    if (sort === "low") arr.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    if (sort === "high") arr.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    if (sort === "year") arr.sort((a, b) => b.year - a.year);
    return arr;
  }, [allCars, cat, selectedFuels, trans, price, sort]);

  const reset = () => {
    setPrice([50000, 20000000]);
    setSelectedFuels([]);
    setTrans("All");
    setSort("recent");
  };

  const apply = () => setApplied((n) => n + 1);

  const panelProps = {
    sectionKey: key,
    activeCat: cat,
    price,
    setPrice,
    selectedFuels,
    toggleFuel,
    applied,
    apply,
    reset,
    transmissions,
    trans,
    setTrans,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>

        <div className="mt-4 mb-6">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            {meta.tag}
          </div>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight">{meta.title}</h1>
          <p className="text-sm text-muted-foreground">{meta.description}</p>
        </div>

        {/* Toolbar */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "result" : "results"}
            {cat !== "all" ? ` in ${cat.toUpperCase()}` : ""}
          </p>
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <SlidersHorizontal className="mr-1 h-4 w-4" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[340px] overflow-y-auto p-4">
                <FilterPanel {...panelProps} />
              </SheetContent>
            </Sheet>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="h-9 w-[170px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most recent</SelectItem>
                <SelectItem value="low">Price: Low to High</SelectItem>
                <SelectItem value="high">Price: High to Low</SelectItem>
                <SelectItem value="year">Year: Newest first</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <div className="hidden lg:block">
            <FilterPanel {...panelProps} />
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
              No vehicles match your filters. Try resetting them.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((c) => (
                <Link
                  key={c.id}
                  to={`/${key}/cars/${c.id}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-smooth hover:-translate-y-1 hover:shadow-elegant"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                    <img
                      src={c.image}
                      alt={c.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-smooth group-hover:scale-105"
                    />
                    <Badge className={`absolute left-3 top-3 ${meta.badgeClass} text-white`}>
                      {c.badge ?? meta.tag}
                    </Badge>
                  </div>
                  <div className="flex flex-col gap-1 p-4">
                    <span className="text-lg font-bold text-primary">{c.price}</span>
                    <h3 className="line-clamp-1 text-sm font-semibold">{c.title}</h3>
                    <div className="mt-1 flex flex-wrap gap-2 text-xs text-muted-foreground">
                      {c.fuel && (
                        <span className="inline-flex items-center gap-1">
                          <Fuel className="h-3 w-3" /> {c.fuel}
                        </span>
                      )}
                      {c.transmission && (
                        <span className="inline-flex items-center gap-1">
                          <Cog className="h-3 w-3" /> {c.transmission}
                        </span>
                      )}
                      {c.rating && (
                        <span className="inline-flex items-center gap-1">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {c.rating}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex items-center justify-between border-t border-border pt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {c.location}
                      </span>
                      <span>{c.year}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SectionListing;
