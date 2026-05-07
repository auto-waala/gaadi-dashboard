import { Car, Bike, Truck, Bus, Tractor, Zap } from "lucide-react";

const groups = [
  {
    label: "Cars",
    icon: Car,
    brands: ["Maruti Suzuki", "Hyundai", "Tata", "Mahindra", "Kia", "Toyota", "Honda", "Skoda", "Volkswagen", "MG"],
  },
  {
    label: "Bikes",
    icon: Bike,
    brands: ["Royal Enfield", "Bajaj", "Hero", "Honda", "TVS", "Yamaha", "KTM", "Suzuki", "Jawa", "BMW Motorrad"],
  },
  {
    label: "EVs",
    icon: Zap,
    brands: ["Tata", "MG", "BYD", "Mahindra", "Hyundai", "Ola Electric", "Ather", "Bajaj Chetak"],
  },
  {
    label: "Trucks",
    icon: Truck,
    brands: ["Tata", "Ashok Leyland", "Eicher", "BharatBenz", "Mahindra", "Force Motors"],
  },
  {
    label: "Buses",
    icon: Bus,
    brands: ["Tata", "Ashok Leyland", "Volvo", "Eicher", "Scania", "Force Traveller"],
  },
  {
    label: "Tractors",
    icon: Tractor,
    brands: ["Mahindra", "Sonalika", "John Deere", "Massey Ferguson", "Swaraj", "New Holland"],
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
        {groups.map(({ label, icon: Icon, brands }) => (
          <div
            key={label}
            className="rounded-2xl border border-border bg-card p-5 shadow-card transition-smooth hover:-translate-y-1 hover:shadow-elegant"
          >
            <div className="mb-3 flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold">{label}</h3>
              <a
                href="#"
                className="ml-auto text-xs font-semibold text-primary hover:underline"
              >
                View all →
              </a>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {brands.map((b) => (
                <a
                  key={b}
                  href="#"
                  className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-foreground/80 transition-smooth hover:border-primary hover:bg-accent hover:text-primary"
                >
                  {b}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
