import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

const types = [
  "All",
  "Cars",
  "EV",
  "Bikes",
  "Cycles",
  "Trucks",
  "Tractors",
  "Buses",
  "Auto/Rickshaw",
  "Spare Parts",
];
const fuels = ["Petrol", "Diesel", "Electric", "Hybrid"];

export const Filters = ({
  active,
  onChange,
}: {
  active: string;
  onChange: (v: string) => void;
}) => {
  const [price, setPrice] = useState([100000, 9000000]);
  return (
    <aside className="space-y-6 rounded-xl border border-border bg-card p-5 shadow-card">
      <div>
        <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          Type
        </h4>
        <div className="flex flex-wrap gap-2">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => onChange(t)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-smooth ${
                active === t
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background hover:border-primary/40"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          Price (INR)
        </h4>
        <Slider
          value={price}
          onValueChange={setPrice}
          min={50000}
          max={10000000}
          step={50000}
        />
        <div className="mt-3 flex justify-between text-xs text-muted-foreground">
          <span>{price[0].toLocaleString()}</span>
          <span>{price[1].toLocaleString()}</span>
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          Fuel
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {fuels.map((f) => (
            <label
              key={f}
              className="flex cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-2 text-xs hover:border-primary/40"
            >
              <input type="checkbox" className="accent-[hsl(var(--primary))]" />
              {f}
            </label>
          ))}
        </div>
      </div>

      <Button variant="hero" className="w-full">
        Apply filters
      </Button>
    </aside>
  );
};
