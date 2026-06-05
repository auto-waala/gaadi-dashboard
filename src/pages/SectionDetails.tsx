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
  Check,
  X,
  Eye,
  ThumbsUp,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  findSectionCar,
  sectionCars,
  sectionMeta,
  type SectionKey,
} from "@/data/sections";
import {
  findVehicleDetails,
  type VehicleDetails,
} from "@/data/vehicleDetails";
import { CertifiedStamp } from "@/components/site/CertifiedStamp";

const VALID: SectionKey[] = ["newlyarrived", "premium", "upcoming"];

const SectionDetails = () => {
  const { section = "", id = "" } = useParams();
  const key = section.toLowerCase() as SectionKey;
  if (!VALID.includes(key)) return <Navigate to="/" replace />;

  const car = findSectionCar(key, id);
  if (!car) return <Navigate to={`/${key}/cars`} replace />;

  const meta = sectionMeta[key];

  // Try rich record by composed id (e.g. "u-tvs-apache-rr-450"), else build a
  // minimal VehicleDetails from the card so the UI is always populated.
  const richId = `${key[0]}-${car.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
  const details: VehicleDetails =
    findVehicleDetails(richId) ?? {
      id: car.id,
      title: car.title,
      brandName: car.title.split(" ")[0],
      modelName: car.title.split(" ").slice(1).join(" "),
      vehicleType: "Car",
      expectedStatus: meta.tag,
      price: { formattedPrice: car.price },
      priceRange: car.price,
      keySpecifications: {
        engine: "TBA",
        transmission: car.transmission ?? "TBA",
        fuelType: car.fuel ?? "TBA",
        mileage: "TBA",
        yearOfManufacture: String(car.year),
      },
      topFeatures: [
        { feature: "Verified Listing" },
        { feature: "AutoNext Assured" },
        { feature: "Service History Available" },
      ],
      standOutFeatures: [
        { feature: car.fuel ?? "Petrol" },
        { feature: car.transmission ?? "Automatic" },
      ],
      pros: [
        { pro: "Well maintained", con: "Limited inventory" },
        { pro: "Verified by AutoNext", con: "Price may vary by city" },
      ],
      tags: [
        { tagName: car.fuel ?? "Petrol" },
        { tagName: car.transmission ?? "Automatic" },
        { tagName: meta.tag },
      ],
      seller: {
        name: "AutoNext Verified Seller",
        isVerified: true,
        chatEnabled: true,
        callEnabled: true,
      },
      location: { city: car.location, fullAddress: `${car.location}, India` },
      condition: {
        isNew: key !== "newlyarrived" ? key === "upcoming" : false,
        conditionStatus: key === "upcoming" ? "New" : "Used",
        serviceHistoryAvailable: true,
        kmDriven: 0,
        ownerCount: 1,
      },
      listingDetails: {
        isVerified: true,
        verifiedBy: "AutoNext",
        daysListed: 7,
      },
      engagement: { views: 1280, likes: 42, shares: 8, enquiries: 12 },
      badges: [meta.tag],
      highlight: `Hand-picked ${car.title} from ${car.location}.`,
    };

  const priceText =
    details.price?.formattedPrice ?? details.priceRange ?? car.price;

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
          {/* Hero image */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            <div className="relative aspect-[16/10] bg-secondary">
              <img
                src={car.image}
                alt={car.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                {(details.badges ?? [meta.tag]).map((b) => (
                  <Badge key={b} className={`${meta.badgeClass} text-white`}>
                    {b}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                {details.brandName} · {details.bodyType ?? details.vehicleType ?? meta.title}
              </p>
              <h1 className="text-3xl font-extrabold tracking-tight">
                {details.title}
              </h1>
              {details.highlight && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {details.highlight}
                </p>
              )}
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4" />{" "}
                  {details.location?.city || car.location}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-4 w-4" />{" "}
                  {details.keySpecifications?.yearOfManufacture ?? car.year}
                </span>
                {car.rating && (
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />{" "}
                    {car.rating} / 5
                  </span>
                )}
              </div>
              {details.tags && details.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {details.tags.map((t) => (
                    <span
                      key={t.tagName}
                      className="rounded-full bg-accent/60 px-2.5 py-0.5 text-xs font-medium text-accent-foreground"
                    >
                      {t.tagName}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="text-3xl font-extrabold text-primary">
                {priceText}
              </div>
              {details.priceRange &&
                details.priceRange !== priceText && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    Range: {details.priceRange}
                  </p>
                )}
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
              <Spec
                icon={<Fuel className="h-4 w-4" />}
                label="Fuel"
                value={details.keySpecifications?.fuelType ?? car.fuel ?? "—"}
              />
              <Spec
                icon={<Cog className="h-4 w-4" />}
                label="Transmission"
                value={
                  details.keySpecifications?.transmission ??
                  car.transmission ??
                  "—"
                }
              />
              <Spec
                icon={<Calendar className="h-4 w-4" />}
                label="Year"
                value={
                  details.keySpecifications?.yearOfManufacture ??
                  String(car.year)
                }
              />
              <Spec
                icon={<Shield className="h-4 w-4" />}
                label="Status"
                value={
                  details.condition?.conditionStatus ??
                  details.expectedStatus ??
                  "—"
                }
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 rounded-2xl border border-border bg-card p-3 shadow-card md:p-5">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="flex w-full flex-wrap justify-start gap-1 bg-transparent p-0">
              {[
                { v: "overview", l: "Overview" },
                { v: "specs", l: "Specifications" },
                { v: "features", l: "Features" },
                { v: "proscons", l: "Pros & Cons" },
                { v: "price", l: "Price" },
                { v: "variants", l: "Variants" },
                { v: "reviews", l: "Reviews" },
                { v: "seller", l: "Seller" },
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

            <TabsContent value="overview" className="mt-5 space-y-4 text-sm">
              {details.descriptions && (
                <p className="leading-relaxed text-muted-foreground">
                  {details.descriptions}
                </p>
              )}
              {details.engagement && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <Stat
                    icon={<Eye className="h-4 w-4" />}
                    label="Views"
                    value={String(details.engagement.views ?? 0)}
                  />
                  <Stat
                    icon={<ThumbsUp className="h-4 w-4" />}
                    label="Likes"
                    value={String(details.engagement.likes ?? 0)}
                  />
                  <Stat
                    icon={<Share2 className="h-4 w-4" />}
                    label="Shares"
                    value={String(details.engagement.shares ?? 0)}
                  />
                  <Stat
                    icon={<MessageCircle className="h-4 w-4" />}
                    label="Enquiries"
                    value={String(details.engagement.enquiries ?? 0)}
                  />
                </div>
              )}
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
                  {Object.entries(details.keySpecifications ?? {})
                    .filter(([, v]) => v)
                    .map(([k, v]) => (
                      <TableRow key={k}>
                        <TableCell className="font-medium capitalize">
                          {k.replace(/([A-Z])/g, " $1").trim()}
                        </TableCell>
                        <TableCell>{v}</TableCell>
                      </TableRow>
                    ))}
                  {details.bodyType && (
                    <TableRow>
                      <TableCell className="font-medium">Body Type</TableCell>
                      <TableCell>{details.bodyType}</TableCell>
                    </TableRow>
                  )}
                  {details.vehicleType && (
                    <TableRow>
                      <TableCell className="font-medium">Vehicle Type</TableCell>
                      <TableCell>{details.vehicleType}</TableCell>
                    </TableRow>
                  )}
                  {details.condition?.kmDriven !== undefined && (
                    <TableRow>
                      <TableCell className="font-medium">KM Driven</TableCell>
                      <TableCell>
                        {details.condition.kmDriven.toLocaleString()} km
                      </TableCell>
                    </TableRow>
                  )}
                  {details.condition?.ownerCount !== undefined && (
                    <TableRow>
                      <TableCell className="font-medium">Owners</TableCell>
                      <TableCell>{details.condition.ownerCount}</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="features" className="mt-5 space-y-5">
              {details.topFeatures && details.topFeatures.length > 0 && (
                <div>
                  <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
                    Top features
                  </h3>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {details.topFeatures.map((f) => (
                      <div
                        key={f.feature}
                        className="flex items-center gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-2 text-sm"
                      >
                        <Check className="h-4 w-4 text-primary" /> {f.feature}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {details.standOutFeatures &&
                details.standOutFeatures.length > 0 && (
                  <div>
                    <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
                      Stand-out
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {details.standOutFeatures.map((f) => (
                        <span
                          key={f.feature}
                          className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                        >
                          ★ {f.feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
            </TabsContent>

            <TabsContent value="proscons" className="mt-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-border p-4">
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-green-600">
                    <Check className="h-4 w-4" /> Pros
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {(details.pros ?? [])
                      .map((p) => p.pro)
                      .filter(Boolean)
                      .map((p) => (
                        <li key={p} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-600" />
                          {p}
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-border p-4">
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-red-600">
                    <X className="h-4 w-4" /> Cons
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {[
                      ...(details.pros ?? []).map((p) => p.con).filter(Boolean),
                      ...((details.cons ?? []).map((c) => c.con) ?? []),
                    ].map((c) => (
                      <li key={c as string} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-600" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="price" className="mt-5">
              <Table>
                <TableBody>
                  {details.price?.formattedPrice && (
                    <TableRow>
                      <TableCell className="font-medium">Ex-showroom</TableCell>
                      <TableCell className="font-bold text-primary">
                        {details.price.formattedPrice}
                      </TableCell>
                    </TableRow>
                  )}
                  {details.price?.formattedOnRoadPrice &&
                    details.price.onRoadPrice ? (
                    <TableRow>
                      <TableCell className="font-medium">On-road</TableCell>
                      <TableCell>{details.price.formattedOnRoadPrice}</TableCell>
                    </TableRow>
                  ) : null}
                  {details.priceRangeFrom && (
                    <TableRow>
                      <TableCell className="font-medium">From</TableCell>
                      <TableCell>{details.priceRangeFrom}</TableCell>
                    </TableRow>
                  )}
                  {details.priceRangeTo && (
                    <TableRow>
                      <TableCell className="font-medium">Up to</TableCell>
                      <TableCell>{details.priceRangeTo}</TableCell>
                    </TableRow>
                  )}
                  <TableRow>
                    <TableCell className="font-medium">Negotiable</TableCell>
                    <TableCell>
                      {details.price?.negotiable ? "Yes" : "No"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="variants" className="mt-5 space-y-2 text-sm">
              {(details.variants && details.variants.length > 0
                ? details.variants
                : [
                    { name: "Base", price: details.priceRangeFrom },
                    { name: "Mid", price: details.priceRange },
                    { name: "Top", price: details.priceRangeTo },
                  ]
              ).map((v, i) => (
                <div
                  key={(v.name ?? "v") + i}
                  className="flex items-center justify-between rounded-lg border border-border p-3"
                >
                  <span className="font-medium">{v.name ?? `Variant ${i + 1}`}</span>
                  <span className="font-semibold text-primary">
                    {v.price ?? "—"}
                  </span>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="reviews" className="mt-5">
              {details.userRatings && details.userRatings.length > 0 ? (
                <div className="space-y-3 text-sm">
                  {details.userRatings.map((r, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-border p-3"
                    >
                      <div className="flex items-center gap-2 font-semibold">
                        {r.user ?? "Anonymous"}
                        {r.rating !== undefined && (
                          <span className="flex">
                            {Array.from({ length: r.rating ?? 0 }).map(
                              (_, idx) => (
                                <Star
                                  key={idx}
                                  className="h-3 w-3 fill-amber-400 text-amber-400"
                                />
                              ),
                            )}
                          </span>
                        )}
                      </div>
                      {r.comment && (
                        <p className="mt-1 text-muted-foreground">
                          {r.comment}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No user reviews yet. Be the first to review {details.title}.
                </p>
              )}
            </TabsContent>

            <TabsContent value="seller" className="mt-5">
              <div className="rounded-xl border border-border p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-lg font-bold text-primary-foreground">
                    {(details.seller?.name ?? "S").charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">
                      {details.seller?.name ?? "Seller"}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {details.seller?.sellerType ?? "Verified Seller"}
                      {details.seller?.isVerified && (
                        <Badge variant="secondary" className="h-5 px-1.5">
                          <Shield className="mr-1 h-3 w-3" /> Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {details.seller?.callEnabled !== false && (
                    <Button variant="hero" className="flex-1">
                      <Phone className="mr-2 h-4 w-4" /> Call seller
                    </Button>
                  )}
                  {details.seller?.chatEnabled !== false && (
                    <Button variant="outline" className="flex-1">
                      <MessageCircle className="mr-2 h-4 w-4" /> Chat
                    </Button>
                  )}
                </div>
                {details.location?.fullAddress && (
                  <div className="mt-4 flex items-start gap-2 rounded-lg bg-accent/60 p-3 text-xs">
                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                    <span>{details.location.fullAddress}</span>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related cars from the same section */}
        <section className="mt-12">
          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                More {meta.title.toLowerCase()}
              </h2>
              <p className="text-sm text-muted-foreground">
                You might also like these {meta.tag.toLowerCase()} picks.
              </p>
            </div>
            <Link
              to={`/${key}/cars`}
              className="hidden text-sm font-semibold text-primary hover:underline md:inline"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sectionCars[key]
              .filter((c) => c.id !== car.id)
              .slice(0, 4)
              .map((c) => (
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
                    <Badge
                      className={`absolute left-3 top-3 ${meta.badgeClass} text-white`}
                    >
                      {c.badge ?? meta.tag}
                    </Badge>
                    <CertifiedStamp className="absolute right-3 top-3" />
                  </div>
                  <div className="flex flex-col gap-1 p-4">
                    <span className="text-lg font-bold text-primary">
                      {c.price}
                    </span>
                    <h3 className="line-clamp-1 text-sm font-semibold">
                      {c.title}
                    </h3>
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
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />{" "}
                          {c.rating}
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
        </section>
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

const Stat = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="rounded-lg border border-border p-3">
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      {icon} {label}
    </div>
    <div className="mt-1 text-base font-bold text-primary">{value}</div>
  </div>
);

export default SectionDetails;
