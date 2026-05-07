import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Linkedin, Apple, PlayCircle } from "lucide-react";
import logo from "@/assets/logo-autonext.png";

const cols = [
  {
    title: "Popular Categories",
    links: ["Cars", "Bikes", "EVs", "Trucks", "Tractors", "Buses", "Spare Parts", "Cycles"],
  },
  {
    title: "Trending Searches",
    links: ["Maruti Swift", "Hyundai Creta", "Royal Enfield", "Tata Nexon EV", "KTM Duke", "Mahindra Thar"],
  },
  {
    title: "About AutoNext",
    links: ["About Us", "Careers", "Press", "AutoNext Cares", "Blog"],
  },
  {
    title: "AutoNext Help",
    links: ["Help Center", "Safety Tips", "Stay Safe Online", "Sitemap", "Legal & Policies"],
  },
  {
    title: "For Sellers",
    links: ["Post Free Ad", "Member Plans", "Verify Your Listing", "Auto Loans", "Insurance"],
  },
];

const cities = [
  "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai", "Kolkata",
  "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Surat", "Chandigarh",
  "Nagpur", "Indore", "Bhopal", "Kochi", "Coimbatore", "Patna",
];

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary/40">
      {/* Trust strip */}
      <div className="border-b border-border bg-background">
        <div className="container grid gap-6 py-8 md:grid-cols-4">
          {[
            { t: "50,000+", s: "Verified Listings" },
            { t: "12,000+", s: "Trusted Sellers" },
            { t: "500+", s: "Cities Covered" },
            { t: "4.8★", s: "Customer Rating" },
          ].map((s) => (
            <div key={s.s} className="text-center md:text-left">
              <div className="text-2xl font-extrabold text-primary">{s.t}</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.s}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Cities */}
      <div className="border-b border-border">
        <div className="container py-8">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Browse by city
          </h3>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {cities.map((c) => (
              <a key={c} href="#" className="text-foreground/80 hover:text-primary">
                {c}
              </a>
            ))}
            <a href="#" className="font-semibold text-primary">View all cities →</a>
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="container grid gap-8 py-10 md:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-1">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="AutoNext logo" width={40} height={40} className="h-10 w-10 rounded-lg" />
            <span className="text-lg font-extrabold">
              Auto<span className="text-primary">Next</span>
            </span>
          </Link>
          <p className="mt-3 text-xs text-muted-foreground">
            India's flexible classifieds marketplace. Buy. Sell. Trust.
          </p>
          <div className="mt-4 flex gap-2">
            {[Facebook, Instagram, Twitter, Youtube, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-smooth hover:border-primary hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <h4 className="mb-3 text-sm font-bold">{col.title}</h4>
            <ul className="space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* App download */}
      <div className="border-t border-border bg-background">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
          <div className="text-sm">
            <span className="font-semibold">Get the AutoNext app</span>
            <span className="ml-2 text-muted-foreground">Buy & sell on the go</span>
          </div>
          <div className="flex gap-3">
            <a href="#" className="flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-background">
              <Apple className="h-5 w-5" />
              <div className="text-left text-xs leading-tight">
                <div className="opacity-80">Download on the</div>
                <div className="font-bold">App Store</div>
              </div>
            </a>
            <a href="#" className="flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-background">
              <PlayCircle className="h-5 w-5" />
              <div className="text-left text-xs leading-tight">
                <div className="opacity-80">Get it on</div>
                <div className="font-bold">Google Play</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-border">
        <div className="container flex flex-col items-center justify-between gap-3 py-5 text-xs text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} AutoNext Technologies Pvt. Ltd. — Made with ♥ in India</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary">Privacy</a>
            <a href="#" className="hover:text-primary">Terms</a>
            <a href="#" className="hover:text-primary">Cookies</a>
            <a href="#" className="hover:text-primary">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
