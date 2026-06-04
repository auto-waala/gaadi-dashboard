import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Star,
  Fuel,
  Cog,
  Heart,
  Share2,
  Calendar,
  Shield,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { findSectionCar, sectionMeta, type SectionKey } from "@/data/sections";

const VALID: SectionKey[] = ["newlyarrived", "premium", "upcoming"];

const SectionDetails = () => {
  const { section = "", id = "" } = useParams();
  const key = section.toLowerCase() as SectionKey;
  if (!VALID.includes(key)) return <Navigate to="/" replace />;

  const car = findSectionCar(key, id);
  if (!car) return <Navigate to={`/${key}/cars`} replace />;

  const meta = sectionMeta[key];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <Link
          to={`/${key}/cars`}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Back to {meta.title}
        </Link>

        <div className="mt-4 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            <div className="relative aspect-[16/10] bg-secondary">
              <img
                src={car.image}
                alt={car.title}
                className="h-full w-full object-cover"
              />
              <Badge className={`absolute left-4 top-4 ${meta.badgeClass} text-white`}>
                {car.badge ?? meta.tag}
              </Badge>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                {meta.title}
              </p>
              <h1 className="text-3xl font-extrabold tracking-tight">{car.title}</h1>
              <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {car.location}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> {car.year}
                </span>
                {car.rating && (
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />{" "}
                    {car.rating} / 5
                  </span>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="text-3xl font-extrabold text-primary">{car.price}</div>
              <p className="mt-1 text-xs text-muted-foreground">
                On-road price varies by city & RTO.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="hero" className="flex-1">
                  Get Best Offer
                </Button>
                <Button variant="outline" size="icon" aria-label="Save">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" aria-label="Share">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Spec icon={<Fuel className="h-4 w-4" />} label="Fuel" value={car.fuel ?? "—"} />
              <Spec icon={<Cog className="h-4 w-4" />} label="Transmission" value={car.transmission ?? "—"} />
              <Spec icon={<Calendar className="h-4 w-4" />} label="Year" value={String(car.year)} />
              <Spec icon={<Shield className="h-4 w-4" />} label="Verified" value="AutoNext Assured" />
            </div>

            <nav className="flex flex-wrap gap-2 border-t border-border pt-4 text-sm">
              {[
                "Overview",
                "Compare",
                "Offers",
                "Images",
                "Specs",
                "User Reviews",
                "360° View",
                "Variants",
              ].map((t) => (
                <a
                  key={t}
                  href={`#${t.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                  className="rounded-full border border-border bg-secondary/60 px-3 py-1 font-medium text-foreground/80 hover:border-primary hover:text-primary"
                >
                  {t}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const Spec = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="rounded-xl border border-border bg-card p-3">
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      {icon} {label}
    </div>
    <div className="mt-1 text-sm font-semibold">{value}</div>
  </div>
);

export default SectionDetails;
