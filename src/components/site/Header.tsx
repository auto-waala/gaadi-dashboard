import { Heart, MapPin, Menu, Plus, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const categories = [
  "All Categories",
  "Cars",
  "EVs",
  "Bikes",
  "Cycles",
  "Trucks",
  "Tractors",
  "Buses",
  "Spare Parts",
];

export const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center gap-3 md:gap-6">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>

        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-glow text-primary-foreground font-black shadow-elegant">
            G
          </div>
          <span className="hidden text-lg font-bold tracking-tight sm:inline">
            Gaadi<span className="text-primary">Bazaar</span>
          </span>
        </Link>

        <div className="hidden flex-1 items-center gap-2 md:flex">
          <div className="flex h-11 items-center gap-2 rounded-lg border border-input bg-secondary/60 px-3 min-w-[160px]">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">India</span>
          </div>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Find Cars, Bikes, Mobiles and more..."
              className="h-11 pl-10 pr-24"
            />
            <Button
              size="sm"
              className="absolute right-1 top-1/2 h-9 -translate-y-1/2 px-4"
            >
              Search
            </Button>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-1 md:gap-2">
          <Button variant="ghost" size="icon" aria-label="Favorites">
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            <User className="mr-1 h-4 w-4" /> Login
          </Button>
          <Button size="sm" variant="hero">
            <Plus className="mr-1 h-4 w-4" /> SELL
          </Button>
        </div>
      </div>

      {/* Mobile search */}
      <div className="border-t border-border bg-background px-4 py-2 md:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search GaadiBazaar..." className="h-10 pl-10" />
        </div>
      </div>

      {/* Category strip */}
      <nav className="border-t border-border bg-secondary/40">
        <div className="container flex items-center gap-1 overflow-x-auto py-2 text-sm">
          {categories.map((c, i) => (
            <a
              key={c}
              href="#"
              className={`whitespace-nowrap rounded-full px-3 py-1.5 font-medium transition-smooth hover:bg-accent hover:text-accent-foreground ${
                i === 0 ? "bg-primary text-primary-foreground hover:bg-primary" : "text-foreground/80"
              }`}
            >
              {c}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};
