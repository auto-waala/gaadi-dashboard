import { LoginMenu } from "@/components/site/LoginMenu";
import { SearchBox } from "@/components/site/SearchBox";
import { LocationPicker } from "@/components/site/LocationPicker";
import { EnableNotificationsButton } from "@/components/site/EnableNotificationsButton";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Heart, Menu, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "@/assets/logo-autonext.png";
import brandIcon from "@/assets/icon-autonext.png";

const categories = [
  { label: "All Categories", slug: "" },
  { label: "Cars", slug: "cars" },
  { label: "EVs", slug: "ev" },
  { label: "Bikes", slug: "bikes" },
  { label: "Cycles", slug: "cycles" },
  { label: "Trucks", slug: "trucks" },
  { label: "Tractors", slug: "tractors" },
  { label: "Buses", slug: "buses" },
  { label: "Spare Parts", slug: "spare-parts" },
];

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="h-1 bg-tricolor" />
      <div className="container flex h-16 items-center gap-3 md:gap-6">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] p-0">
            <SheetHeader className="border-b border-border p-4">
              <SheetTitle className="flex items-center justify-center">
                <img
                  src={logo}
                  alt="AutoNext logo"
                  className="h-12 w-auto object-contain"
                />
              </SheetTitle>
            </SheetHeader>
            <div className="p-4">
              <LocationPicker />
            </div>
            <nav className="flex flex-col px-2 pb-4">
              <span className="px-3 pb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Categories
              </span>
              {categories.map((c) => (
                <Link
                  key={c.label}
                  to={c.slug ? `/category/${c.slug}` : "/"}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                >
                  {c.label}
                </Link>
              ))}
              <div className="my-3 border-t border-border" />
              <Link
                to="/sell"
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-semibold text-primary hover:bg-accent"
              >
                + Sell your vehicle
              </Link>
              <Link
                to="/auth"
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
              >
                Login / Register
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <Link to="/" className="flex items-center gap-0.5" aria-label="AutoNext home">
          <img
            src={brandIcon}
            alt="AutoNext icon"
            width={48}
            height={48}
            className="h-11 w-11 object-contain"
          />
          <img
            src={logo}
            alt="AutoNext — Buy. Sell. Trust."
            width={220}
            height={64}
            className="h-14 w-auto object-contain md:h-16"
          />
        </Link>
        <div className="hidden flex-1 items-center gap-2 md:flex">
          <LocationPicker />
          <SearchBox />
        </div>

        <div className="ml-auto flex items-center gap-1 md:gap-2">
          <EnableNotificationsButton />
          <Button variant="ghost" size="icon" aria-label="Favorites">
            <Heart className="h-5 w-5" />
          </Button>
          <LoginMenu />
          <Button size="sm" variant="hero" asChild>
            <Link to="/sell">
              <Plus className="mr-1 h-4 w-4" /> SELL
            </Link>
          </Button>
        </div>
      </div>

      {/* Mobile search */}
      <div className="border-t border-border bg-background px-4 py-2 md:hidden">
        <SearchBox compact />
      </div>

      {/* Category strip */}
      <nav className="border-t border-border bg-secondary/40">
        <div className="container flex items-center gap-1 overflow-x-auto py-2 text-sm">
          {categories.map((c, i) => (
            <Link
              key={c.label}
              to={c.slug ? `/category/${c.slug}` : "/"}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 font-medium transition-smooth hover:bg-accent hover:text-accent-foreground ${i === 0 ? "bg-primary text-primary-foreground hover:bg-primary" : "text-foreground/80"
                }`}
            >
              {c.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};
