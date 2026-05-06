import {
  Bike,
  Bus,
  Car,
  Caravan,
  Tractor,
  Truck,
  Zap,
  Wrench,
} from "lucide-react";

const cats = [
  { icon: Car, label: "Cars" },
  { icon: Zap, label: "EV" },
  { icon: Bike, label: "Bikes" },
  { icon: Bike, label: "Cycles" },
  { icon: Truck, label: "Trucks" },
  { icon: Tractor, label: "Tractors" },
  { icon: Bus, label: "Buses" },
  { icon: Caravan, label: "Auto/Rickshaw" },
  { icon: Wrench, label: "Spare Parts" },
];

export const CategoryGrid = ({
  active,
  onChange,
}: {
  active: string;
  onChange: (v: string) => void;
}) => {
  return (
    <section className="container py-10">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Browse by category</h2>
          <p className="text-sm text-muted-foreground">Pick what you're looking for</p>
        </div>
        <button
          onClick={() => onChange("All")}
          className="text-sm font-semibold text-primary hover:underline"
        >
          View all
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-9">
        {cats.map(({ icon: Icon, label }) => {
          const isActive = active === label;
          return (
            <button
              key={label}
              onClick={() => {
                onChange(label);
                document
                  .getElementById("listings")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`group flex flex-col items-center gap-2 rounded-xl border bg-card p-3 transition-smooth hover:-translate-y-1 hover:shadow-card ${
                isActive
                  ? "border-primary shadow-card"
                  : "border-border hover:border-primary/40"
              }`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full transition-smooth ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-accent-foreground group-hover:bg-primary group-hover:text-primary-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-center text-xs font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
