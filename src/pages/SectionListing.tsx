import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Star, Fuel, Cog } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { sectionCars, sectionMeta, type SectionKey } from "@/data/sections";

const VALID: SectionKey[] = ["newlyarrived", "premium", "upcoming"];

const SectionListing = () => {
  const { section = "" } = useParams();
  const key = section.toLowerCase() as SectionKey;
  if (!VALID.includes(key)) return <Navigate to="/" replace />;

  const meta = sectionMeta[key];
  const cars = sectionCars[key];

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
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight">
            {meta.title}
          </h1>
          <p className="text-sm text-muted-foreground">{meta.description}</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cars.map((c) => (
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
      </main>
      <Footer />
    </div>
  );
};

export default SectionListing;
