import { Store, ArrowRight, MapPin, BadgeCheck } from "lucide-react";

const dealers = [
  { name: "Maruti True Value", slug: "maruti", color: "E2231A", short: "MT", city: "Pan-India" },
  { name: "Mahindra First Choice", slug: "mahindra", color: "EE2722", short: "MF", city: "Pan-India" },
  { name: "Hyundai H Promise", slug: "hyundai", color: "002C5F", short: "HP", city: "Pan-India" },
  { name: "Toyota U-Trust", slug: "toyota", color: "EB0A1E", short: "TU", city: "Pan-India" },
  { name: "Tata Assured", slug: "tata", color: "486AAE", short: "TA", city: "Pan-India" },
  { name: "Honda Auto Terrace", slug: "honda", color: "CC0000", short: "HA", city: "Pan-India" },
  { name: "CarDekho Trusted", slug: "cardekho", color: "E11D48", short: "CD", city: "Pan-India" },
  { name: "Spinny Assured", slug: "spinny", color: "5A2EBB", short: "SP", city: "Metro Cities" },
  { name: "Cars24 Hub", slug: "cars24", color: "F4B400", short: "C24", city: "Pan-India" },
  { name: "OLX AutoStore", slug: "olx", color: "23E5DB", short: "OX", city: "Pan-India" },
];

export const DealerPartners = () => {
  return (
    <section className="container py-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            <Store className="h-3 w-3" /> Verified Sellers
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            Buy from <span className="text-primary">trusted dealers</span> & sellers
          </h2>
          <p className="text-sm text-muted-foreground">
            Authorized multi-brand outlets and certified dealers across India.
          </p>
        </div>
        <a href="/dealers" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
          View all dealers <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {dealers.map((d) => (
          <a
            key={d.slug}
            href="/dealers"
            className="group relative flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card p-4 text-center shadow-card transition-smooth hover:-translate-y-1 hover:border-primary hover:shadow-elegant"
          >
            <BadgeCheck className="absolute right-2 top-2 h-4 w-4 text-india-green" />
            <div
              className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary p-2 text-sm font-extrabold"
              style={{ color: `#${d.color}` }}
            >
              <img
                src={`https://cdn.simpleicons.org/${d.slug}/${d.color}`}
                alt={`${d.name} logo`}
                className="h-10 w-10 object-contain"
                loading="lazy"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.style.display = "none";
                  const parent = img.parentElement;
                  if (parent && !parent.dataset.fb) {
                    parent.dataset.fb = "1";
                    parent.textContent = d.short;
                  }
                }}
              />
            </div>
            <div className="text-xs font-semibold leading-tight">{d.name}</div>
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <MapPin className="h-3 w-3" /> {d.city}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
