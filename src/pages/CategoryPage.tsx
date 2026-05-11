import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ListingCard } from "@/components/site/ListingCard";
import { Filters } from "@/components/site/Filters";
import { listings, type Listing } from "@/data/listings";
import { Link, useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { ArrowLeft, LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const slugToCategory: Record<string, Listing["category"]> = {
  cars: "Cars",
  ev: "EV",
  evs: "EV",
  bikes: "Bikes",
  cycles: "Cycles",
  trucks: "Trucks",
  tractors: "Tractors",
  buses: "Buses",
  "auto-rickshaw": "Auto/Rickshaw",
  "spare-parts": "Spare Parts",
};

const categoryToSlug: Record<string, string> = {
  Cars: "cars",
  EV: "ev",
  Bikes: "bikes",
  Cycles: "cycles",
  Trucks: "trucks",
  Tractors: "tractors",
  Buses: "buses",
  "Auto/Rickshaw": "auto-rickshaw",
  "Spare Parts": "spare-parts",
};

const CategoryPage = () => {
  const { slug = "" } = useParams();
  const [params] = useSearchParams();
  const brand = params.get("brand");
  const navigate = useNavigate();

  const category = slugToCategory[slug.toLowerCase()];
  const title = category ?? "All vehicles";

  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState("recent");
  const [condition, setCondition] = useState<"all" | "new" | "old">("all");

  const filtered = useMemo(() => {
    let arr = category ? listings.filter((l) => l.category === category) : [...listings];
    if (brand) {
      const b = brand.toLowerCase();
      arr = arr.filter((l) => l.title.toLowerCase().includes(b));
    }
    if (condition === "new") arr = arr.filter((l) => l.year >= 2023);
    if (condition === "old") arr = arr.filter((l) => l.year < 2023);
    if (sort === "low") arr.sort((a, b) => a.price - b.price);
    if (sort === "high") arr.sort((a, b) => b.price - a.price);
    return arr;
  }, [category, brand, condition, sort]);

  const handleFilterChange = (cat: string) => {
    if (cat === "All") navigate("/category/all");
    else navigate(`/category/${categoryToSlug[cat] ?? cat.toLowerCase()}`);
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

        <div className="mt-4 mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              {title} {brand && <span className="text-primary">· {brand}</span>}
            </h1>
            <p className="text-sm text-muted-foreground">
              {filtered.length} vehicles available
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <SlidersHorizontal className="mr-1 h-4 w-4" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[320px] p-4">
                <Filters active={category ?? "All"} onChange={handleFilterChange} />
              </SheetContent>
            </Sheet>

            <Select value={condition} onValueChange={(v) => setCondition(v as typeof condition)}>
              <SelectTrigger className="h-9 w-[130px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">New & Old</SelectItem>
                <SelectItem value="new">New (2023+)</SelectItem>
                <SelectItem value="old">Used</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="h-9 w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most recent</SelectItem>
                <SelectItem value="low">Price: Low to High</SelectItem>
                <SelectItem value="high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>

            <div className="hidden rounded-md border border-border md:flex">
              <button
                onClick={() => setView("grid")}
                className={`p-2 ${view === "grid" ? "bg-primary text-primary-foreground" : ""}`}
                aria-label="Grid view"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-2 ${view === "list" ? "bg-primary text-primary-foreground" : ""}`}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <div className="hidden lg:block">
            <Filters active={category ?? "All"} onChange={handleFilterChange} />
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-secondary/30 p-12 text-center">
              <p className="text-sm text-muted-foreground">
                No listings found for this selection.
              </p>
              <Link to="/" className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">
                Browse all vehicles →
              </Link>
            </div>
          ) : (
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
                  : "flex flex-col gap-4"
              }
            >
              {filtered.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
