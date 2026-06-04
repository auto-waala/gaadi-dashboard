import { Car, Bike, Truck, Bus, Tractor, Zap } from "lucide-react";
import { Link } from "react-router-dom";

type BrandRef = { name: string; slug: string; color?: string };

const groups: {
  label: string;
  slug: string;
  icon: any;
  brands: BrandRef[];
}[] = [
  {
    label: "Cars",
    slug: "cars",
    icon: Car,
    brands: [
      { name: "Maruti Suzuki", slug: "suzuki", color: "1C1C1C" },
      { name: "Hyundai", slug: "hyundai", color: "002C5F" },
      { name: "Tata", slug: "tata", color: "486AAE" },
      { name: "Mahindra", slug: "mahindra", color: "ED1C24" },
      { name: "Kia", slug: "kia", color: "05141F" },
      { name: "Toyota", slug: "toyota", color: "EB0A1E" },
      { name: "Honda", slug: "honda", color: "CC0000" },
      { name: "Skoda", slug: "skoda", color: "0E3A2F" },
      { name: "Volkswagen", slug: "volkswagen", color: "151F5D" },
      { name: "MG", slug: "mg", color: "DA291C" },
    ],
  },
  {
    label: "Bikes",
    slug: "bikes",
    icon: Bike,
    brands: [
      { name: "Royal Enfield", slug: "royalenfield", color: "C8102E" },
      { name: "Bajaj", slug: "bajaj", color: "003366" },
      { name: "Hero", slug: "hero", color: "ED1C24" },
      { name: "Honda", slug: "honda", color: "CC0000" },
      { name: "Yamaha", slug: "yamahacorporation", color: "4B1E78" },
      { name: "KTM", slug: "ktm", color: "FF6600" },
      { name: "Suzuki", slug: "suzuki", color: "1C1C1C" },
      { name: "BMW Motorrad", slug: "bmw", color: "0066B1" },
    ],
  },
  {
    label: "EVs",
    slug: "ev",
    icon: Zap,
    brands: [
      { name: "Tata", slug: "tata", color: "486AAE" },
      { name: "MG", slug: "mg", color: "DA291C" },
      { name: "BYD", slug: "byd", color: "E60012" },
      { name: "Mahindra", slug: "mahindra", color: "ED1C24" },
      { name: "Hyundai", slug: "hyundai", color: "002C5F" },
      { name: "Ola", slug: "ola", color: "C5F230" },
      { name: "Ather", slug: "ather", color: "EE3124" },
    ],
  },
  {
    label: "Trucks",
    slug: "trucks",
    icon: Truck,
    brands: [
      { name: "Tata", slug: "tata", color: "486AAE" },
      { name: "Ashok Leyland", slug: "ashokleyland", color: "002B5F" },
      { name: "Eicher", slug: "eicher", color: "DA291C" },
      { name: "BharatBenz", slug: "mercedesbenz", color: "00ADEF" },
      { name: "Mahindra", slug: "mahindra", color: "ED1C24" },
    ],
  },
  {
    label: "Buses",
    slug: "buses",
    icon: Bus,
    brands: [
      { name: "Tata", slug: "tata", color: "486AAE" },
      { name: "Ashok Leyland", slug: "ashokleyland", color: "002B5F" },
      { name: "Volvo", slug: "volvo", color: "003057" },
      { name: "Eicher", slug: "eicher", color: "DA291C" },
      { name: "Scania", slug: "scania", color: "041E42" },
    ],
  },
  {
    label: "Tractors",
    slug: "tractors",
    icon: Tractor,
    brands: [
      { name: "Mahindra", slug: "mahindra", color: "ED1C24" },
      { name: "John Deere", slug: "johndeere", color: "367C2B" },
      { name: "Massey Ferguson", slug: "masseyferguson", color: "ED1C24" },
      { name: "New Holland", slug: "newholland", color: "00529B" },
    ],
  },
];

export const BrandCategories = () => {
  return (
    <section className="container py-10">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">
          Shop by <span className="text-primary">brand</span>
        </h2>
        <p className="text-sm text-muted-foreground">
          Explore top brands across categories in India
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {groups.map(({ label, slug, icon: Icon, brands }) => (
          <div
            key={label}
            className="rounded-2xl border border-border bg-card p-5 shadow-card transition-smooth hover:-translate-y-1 hover:shadow-elegant"
          >
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold">{label}</h3>
              <Link
                to={`/category/${slug}`}
                className="ml-auto text-xs font-semibold text-primary hover:underline"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-5">
              {brands.map((b) => (
                <Link
                  key={`${slug}-${b.name}`}
                  to={`/category/${slug}?brand=${encodeURIComponent(b.name)}`}
                  title={b.name}
                  className="group flex flex-col items-center gap-1 rounded-lg border border-border bg-secondary/40 p-2 text-center transition-smooth hover:-translate-y-0.5 hover:border-primary hover:bg-card hover:shadow-card"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-card p-1">
                    <img
                      src={`https://cdn.simpleicons.org/${b.slug}/${b.color ?? "000"}`}
                      alt={`${b.name} logo`}
                      loading="lazy"
                      className="h-7 w-7 object-contain"
                      onError={(e) => {
                        const t = e.target as HTMLImageElement;
                        t.style.display = "none";
                      }}
                    />
                  </div>
                  <span className="line-clamp-1 text-[10px] font-medium text-foreground/80 group-hover:text-primary">
                    {b.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
