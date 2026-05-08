import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ListingCard } from "@/components/site/ListingCard";
import { listings, type Listing } from "@/data/listings";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { ArrowLeft } from "lucide-react";

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

const CategoryPage = () => {
  const { slug = "" } = useParams();
  const [params] = useSearchParams();
  const brand = params.get("brand");

  const category = slugToCategory[slug.toLowerCase()];
  const filtered = useMemo(() => {
    let arr = category ? listings.filter((l) => l.category === category) : listings;
    if (brand) {
      const b = brand.toLowerCase();
      arr = arr.filter((l) => l.title.toLowerCase().includes(b));
    }
    return arr;
  }, [category, brand]);

  const title = category ?? "All vehicles";

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
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
