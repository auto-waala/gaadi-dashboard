import { useState } from "react";
import { Check, MapPin, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

const cities = [
  "All India", "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai", "Kolkata",
  "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Surat", "Chandigarh", "Nagpur",
  "Indore", "Bhopal", "Kochi", "Coimbatore", "Patna", "Noida", "Gurgaon",
  "Thane", "Visakhapatnam", "Vadodara", "Ludhiana", "Agra", "Nashik", "Faridabad",
];

export const LocationPicker = ({ compact = false }: { compact?: boolean }) => {
  const [city, setCity] = useState("India");
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const filtered = cities.filter((c) =>
    c.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={`flex items-center gap-2 rounded-lg border border-input bg-secondary/60 px-3 transition-smooth hover:bg-accent ${
            compact ? "h-10 min-w-[140px]" : "h-11 min-w-[160px]"
          }`}
        >
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="flex-1 truncate text-left text-sm font-medium">{city}</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0" align="start">
        <div className="border-b border-border p-2">
          <Input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search city..."
            className="h-9"
          />
        </div>
        <ul className="max-h-[300px] overflow-auto py-1">
          {filtered.map((c) => (
            <li key={c}>
              <button
                onClick={() => {
                  setCity(c);
                  setOpen(false);
                  setQ("");
                }}
                className="flex w-full items-center justify-between px-3 py-2 text-sm hover:bg-accent"
              >
                <span className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                  {c}
                </span>
                {city === c && <Check className="h-4 w-4 text-primary" />}
              </button>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="px-3 py-3 text-sm text-muted-foreground">No cities found</li>
          )}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
