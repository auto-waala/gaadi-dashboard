import { Header } from "@/components/site/Header";
import { useParams, Link, Navigate } from "react-router-dom";
import { formatPKR, listings } from "@/data/listings";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  Fuel,
  Gauge,
  Heart,
  MapPin,
  MessageCircle,
  Phone,
  Settings2,
  Share2,
  Shield,
  Star,
} from "lucide-react";
import { useState } from "react";
import { ListingCard } from "@/components/site/ListingCard";

const ListingDetails = () => {
  const { id } = useParams();
  const listing = listings.find((l) => l.id === id);
  const [active, setActive] = useState(0);

  if (!listing) return <Navigate to="/" replace />;

  const gallery = [listing.image, listing.image, listing.image, listing.image];
  const related = listings.filter((l) => l.id !== listing.id).slice(0, 3);

  const specs = [
    { icon: Calendar, label: "Year", value: listing.year },
    { icon: Gauge, label: "KM Driven", value: listing.km.toLocaleString() },
    { icon: Fuel, label: "Fuel", value: listing.fuel },
    { icon: Settings2, label: "Transmission", value: listing.transmission },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Back to listings
        </Link>
      </div>

      <main className="container grid gap-8 pb-16 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          {/* Gallery */}
          <div className="space-y-3">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-card">
              <img
                src={gallery[active]}
                alt={listing.title}
                className="aspect-[16/10] w-full object-cover"
              />
              {listing.featured && (
                <Badge className="absolute left-4 top-4 bg-primary text-primary-foreground hover:bg-primary">
                  Featured
                </Badge>
              )}
              <div className="absolute right-4 top-4 flex gap-2">
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-background/90 backdrop-blur transition-smooth hover:bg-primary hover:text-primary-foreground">
                  <Heart className="h-4 w-4" />
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-background/90 backdrop-blur transition-smooth hover:bg-primary hover:text-primary-foreground">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`overflow-hidden rounded-lg border-2 transition-smooth ${
                    active === i ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={g} alt="" className="aspect-[4/3] w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Title & price */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="text-2xl font-bold md:text-3xl">{listing.title}</h1>
                <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {listing.location}
                  </span>
                  <span>•</span>
                  <span>{listing.postedAgo}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-extrabold text-primary">
                  {formatPKR(listing.price)}
                </div>
                <div className="text-xs text-muted-foreground">EMI from PKR 32,500/mo</div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {specs.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl bg-accent/60 p-3 text-center"
                >
                  <s.icon className="mx-auto mb-1 h-5 w-5 text-primary" />
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                  <div className="text-sm font-semibold">{s.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h2 className="text-lg font-bold">Description</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Single owner, well maintained {listing.title}. All documents
              clear, original paint, non-accidental. Comes with full service
              history and tools. Serious buyers only — exchange possible with
              cash difference. Test drive available in {listing.location}.
            </p>

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {[
                "Power steering",
                "Power windows",
                "Air conditioning",
                "Alloy wheels",
                "ABS brakes",
                "Bluetooth audio",
              ].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {f}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4 lg:sticky lg:top-32 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-lg font-bold text-primary-foreground">
                AK
              </div>
              <div>
                <div className="font-semibold">Ahmed Khan</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="h-3 w-3 fill-primary text-primary" /> 4.9 · Member since 2022
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Button variant="hero" className="w-full">
                <Phone className="mr-2 h-4 w-4" /> Show phone number
              </Button>
              <Button variant="outline" className="w-full">
                <MessageCircle className="mr-2 h-4 w-4" /> Chat with seller
              </Button>
            </div>
            <div className="mt-4 flex items-start gap-2 rounded-lg bg-accent/60 p-3 text-xs text-accent-foreground">
              <Shield className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <span>
                Always meet in a public place. Never pay in advance — inspect
                the vehicle first.
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
              Posted in
            </h3>
            <div className="mt-2 flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-primary" /> {listing.location}, Pakistan
            </div>
          </div>
        </aside>
      </main>

      {/* Related */}
      <section className="container pb-16">
        <h2 className="mb-5 text-2xl font-bold tracking-tight">You might also like</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ListingDetails;
