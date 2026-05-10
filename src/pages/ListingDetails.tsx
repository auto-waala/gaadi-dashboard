import { Header } from "@/components/site/Header";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { formatINR, listings } from "@/data/listings";
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
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ListingDetails = () => {
  const { id } = useParams();
  const listing = listings.find((l) => l.id === id);
  const [active, setActive] = useState(0);
  const [showPhone, setShowPhone] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

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
                  {formatINR(listing.price)}
                </div>
                <div className="text-xs text-muted-foreground">EMI from INR 32,500/mo</div>
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

          {/* Tabbed details */}
          <div className="rounded-2xl border border-border bg-card p-3 shadow-card md:p-5">
            <Tabs defaultValue="price" className="w-full">
              <TabsList className="flex w-full flex-wrap justify-start gap-1 bg-transparent p-0">
                {[
                  { v: "price", l: "Price" },
                  { v: "compare", l: "Compare Offers" },
                  { v: "images", l: "Images" },
                  { v: "specs", l: "Specs" },
                  { v: "reviews", l: "User Reviews" },
                  { v: "view360", l: "360° View" },
                  { v: "variants", l: "Variants" },
                  { v: "more", l: "More" },
                ].map((t) => (
                  <TabsTrigger
                    key={t.v}
                    value={t.v}
                    className="rounded-full border border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {t.l}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="price" className="mt-5">
                <div className="grid gap-3 sm:grid-cols-3">
                  <Stat label="On-road price" value={formatINR(listing.price + 80000)} />
                  <Stat label="Ex-showroom" value={formatINR(listing.price)} />
                  <Stat label="EMI from" value="₹ 32,500/mo" />
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  Final price subject to RTO, insurance and dealer offers in {listing.location}.
                </p>
              </TabsContent>

              <TabsContent value="compare" className="mt-5 space-y-2 text-sm">
                {[
                  { dealer: "AutoNext Verified Seller", offer: "₹ 25,000 cash discount + free 1st service" },
                  { dealer: "City Motors", offer: "Exchange bonus up to ₹ 40,000" },
                  { dealer: "Prime Cars", offer: "Zero down payment EMI plan" },
                ].map((o) => (
                  <div key={o.dealer} className="flex items-center justify-between rounded-lg border border-border p-3">
                    <span className="font-medium">{o.dealer}</span>
                    <span className="text-muted-foreground">{o.offer}</span>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="images" className="mt-5">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {gallery.map((g, i) => (
                    <img key={i} src={g} alt="" className="aspect-[4/3] w-full rounded-lg object-cover" />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="specs" className="mt-5">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Specification</TableHead>
                      <TableHead>Detail</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["Year", String(listing.year)],
                      ["KM Driven", listing.km.toLocaleString() + " km"],
                      ["Fuel", listing.fuel],
                      ["Transmission", listing.transmission],
                      ["Available Colors", "White, Red, Silver, Black, Blue"],
                      ["Seating Capacity", "5"],
                      ["Mileage", "18.6 km/l"],
                      ["Engine", "1497 cc"],
                      ["Budget Range", `${formatINR(listing.price - 50000)} – ${formatINR(listing.price + 80000)}`],
                      ["Location", listing.location],
                    ].map(([k, v]) => (
                      <TableRow key={k}>
                        <TableCell className="font-medium">{k}</TableCell>
                        <TableCell>{v}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="reviews" className="mt-5 space-y-3 text-sm">
                {[
                  { name: "Rahul S.", rating: 5, text: "Excellent condition, smooth drive, well maintained." },
                  { name: "Priya M.", rating: 4, text: "Good value for money. Service history was provided." },
                ].map((r) => (
                  <div key={r.name} className="rounded-lg border border-border p-3">
                    <div className="flex items-center gap-2 font-semibold">
                      {r.name}
                      <span className="flex">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                        ))}
                      </span>
                    </div>
                    <p className="mt-1 text-muted-foreground">{r.text}</p>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="view360" className="mt-5">
                <div className="flex aspect-[16/9] w-full items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground">
                  360° interactive view coming soon
                </div>
              </TabsContent>

              <TabsContent value="variants" className="mt-5 space-y-2 text-sm">
                {["Base", "Mid", "Top", "Top + Sunroof"].map((v, i) => (
                  <div key={v} className="flex items-center justify-between rounded-lg border border-border p-3">
                    <span className="font-medium">{v}</span>
                    <span className="text-primary font-semibold">{formatINR(listing.price + i * 70000)}</span>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="more" className="mt-5">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Single owner, well maintained {listing.title}. All documents clear,
                  original paint, non-accidental. Comes with full service history and tools.
                  Test drive available in {listing.location}.
                </p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2 text-sm">
                  {[
                    "Power steering",
                    "Power windows",
                    "Air conditioning",
                    "Alloy wheels",
                    "ABS brakes",
                    "Bluetooth audio",
                  ].map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {f}
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
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
              <Button
                variant="hero"
                className="w-full"
                onClick={() => {
                  if (!user) {
                    toast({ title: "Please login to view contact" });
                    navigate("/auth");
                    return;
                  }
                  setShowPhone(true);
                }}
              >
                <Phone className="mr-2 h-4 w-4" />
                {showPhone ? "+91 98xxx 4321" : "Show phone number"}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  if (!user) return navigate("/auth");
                  toast({ title: "Chat opened with seller" });
                }}
              >
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
              <MapPin className="h-4 w-4 text-primary" /> {listing.location}, India
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

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-lg border border-border p-3">
    <div className="text-xs text-muted-foreground">{label}</div>
    <div className="text-base font-bold text-primary">{value}</div>
  </div>
);

export default ListingDetails;
