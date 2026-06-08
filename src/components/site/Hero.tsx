import { useEffect, useState, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import car1 from "@/assets/car-1.jpg";
import car2 from "@/assets/car-2.jpg";
import car3 from "@/assets/car-3.jpg";
import car4 from "@/assets/car-4.jpg";
import ev1 from "@/assets/ev-1.jpg";

import thar from "@/assets/suv-thar.jpg";
import bmw from "@/assets/suv-bmw-x5.jpg";
import benz from "@/assets/suv-mercedes-gle.jpg";
import vw from "@/assets/suv-vw-tiguan.jpg";
import creta from "@/assets/suv-creta.jpg";

const suvSlides = [
  {
    id: "s1",
    title: "Mahindra Thar 4x4 LX",
    price: "₹ 17,60,000",
    tagline: "Petrol · Hard Top · 4WD",
    image: thar,
    location: "Delhi NCR",
    year: 2025,
  },
  {
    id: "s2",
    title: "BMW X5 xDrive40i M Sport",
    price: "₹ 99,90,000",
    tagline: "Petrol · 8-Speed Auto",
    image: bmw,
    location: "Mumbai",
    year: 2025,
  },
  {
    id: "s3",
    title: "Mercedes-Benz GLE 450d",
    price: "₹ 1,07,50,000",
    tagline: "Diesel · 4MATIC",
    image: benz,
    location: "Bengaluru",
    year: 2025,
  },
  {
    id: "s4",
    title: "Volkswagen Tiguan R-Line",
    price: "₹ 49,00,000",
    tagline: "Turbo Petrol · DSG",
    image: vw,
    location: "Hyderabad",
    year: 2025,
  },
  {
    id: "s5",
    title: "Hyundai Creta SX(O) Turbo",
    price: "₹ 20,15,000",
    tagline: "Petrol · DCT · Panoramic Roof",
    image: creta,
    location: "Pune",
    year: 2025,
  },
];

export const Hero = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [condition, setCondition] = useState<"used" | "new">("used");
  const [vehicleType, setVehicleType] = useState("cars");
  const [brand, setBrand] = useState("any");
  const [location, setLocation] = useState("");

  useEffect(() => {
    try {
      const cached = sessionStorage.getItem("autonext_user_location");
      if (cached) {
        const p = JSON.parse(cached);
        if (p.place) setLocation(p.place);
      }
    } catch {}
    const onStorage = () => {
      const cached = sessionStorage.getItem("autonext_user_location");
      if (cached) {
        const p = JSON.parse(cached);
        if (p.place) setLocation(p.place);
      }
    };
    const id = setInterval(onStorage, 2000);
    return () => clearInterval(id);
  }, []);

  const brandsByType: Record<string, string[]> = {
    cars: ["Maruti", "Hyundai", "Tata", "Mahindra", "Toyota", "Honda", "Kia", "BMW", "Mercedes-Benz"],
    bikes: ["Royal Enfield", "Bajaj", "TVS", "Hero", "Yamaha", "KTM", "Honda", "Suzuki"],
    trucks: ["Tata", "Ashok Leyland", "Mahindra", "Eicher", "BharatBenz"],
    ev: ["Tata", "MG", "BYD", "Ola Electric", "Ather", "Mahindra"],
    tractors: ["Mahindra", "Sonalika", "John Deere", "Massey Ferguson", "Eicher"],
    cycles: ["Hero", "Atlas", "Btwin", "Firefox", "Giant"],
  };

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  useEffect(() => {
    const timer = setInterval(() => {
      scrollNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [scrollNext]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-accent/40 via-background to-secondary">
      {/* Full-width background carousel */}
      <div className="absolute inset-0">
        <Carousel
          setApi={setApi}
          opts={{ loop: true, duration: 30 }}
          className="h-full w-full"
        >
          <CarouselContent className="ml-0 h-full">
            {suvSlides.map((slide) => (
              <CarouselItem key={slide.id} className="pl-0 h-full">
                <div className="relative h-full w-full">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="h-full w-full object-cover object-center"
                  />
                  {/* Soft left fade only — keep vehicle fully visible on the right */}
                  <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="container relative z-10 grid gap-8 py-10 md:grid-cols-2 md:py-20">
        <div className="space-y-5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-india-green" /> Made
            in India · #1 Marketplace
          </span>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
            <span className="text-primary">Buy.</span> Sell.{" "}
            <span className="text-india-green">Trust.</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-foreground to-india-green bg-clip-text text-transparent">
              Drive what's next.
            </span>
          </h1>
          <p className="max-w-md text-muted-foreground">
            Thousands of verified cars, bikes and more — all in one flexible
            dashboard. Browse, compare and sell with confidence.
          </p>

          <div className="rounded-xl border border-border bg-card p-3 shadow-card">
            <Tabs value={condition} onValueChange={(v) => setCondition(v as "used" | "new")} className="mb-2">
              <TabsList className="grid h-8 w-full grid-cols-2">
                <TabsTrigger value="used" className="text-xs">Used</TabsTrigger>
                <TabsTrigger value="new" className="text-xs">New</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="space-y-2">
              <div className="grid gap-2 md:grid-cols-2">
                <Select value={vehicleType} onValueChange={(v) => { setVehicleType(v); setBrand("any"); }}>
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cars" className="text-xs">Cars</SelectItem>
                    <SelectItem value="bikes" className="text-xs">Bikes</SelectItem>
                    <SelectItem value="trucks" className="text-xs">Trucks</SelectItem>
                    <SelectItem value="ev" className="text-xs">EVs</SelectItem>
                    <SelectItem value="tractors" className="text-xs">Tractors</SelectItem>
                    <SelectItem value="cycles" className="text-xs">Cycles</SelectItem>
                  </SelectContent>
                </Select>

                {condition === "new" ? (
                  <Select value={brand} onValueChange={setBrand}>
                    <SelectTrigger className="h-9 text-xs">
                      <SelectValue placeholder="Brand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any" className="text-xs">Any brand</SelectItem>
                      {(brandsByType[vehicleType] ?? []).map((b) => (
                        <SelectItem key={b} value={b} className="text-xs">{b}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                    <Input className="h-9 pl-9 text-xs" placeholder="Keyword" />
                  </div>
                )}
              </div>

              <div className="relative">
                <MapPin className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="h-9 pl-9 text-xs"
                  placeholder="City"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <Button size="sm" variant="hero" className="h-9 w-full text-xs">
                <Search className="mr-1.5 h-3.5 w-3.5" /> Search
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 pt-2 text-sm">
            <Stat n="50K+" label="Listings" />
            <Stat n="12K+" label="Sellers" />
            <Stat n="4.8★" label="User rating" />
          </div>
        </div>

        {/* Right side — active slide info + controls */}
        <div className="flex flex-col items-end justify-end gap-4 md:justify-center">
          <div className="w-full max-w-sm rounded-2xl border border-border/60 bg-card/80 p-5 shadow-elegant backdrop-blur-sm">
            <div className="mb-3 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                New Arrival #{current + 1}
              </span>
              <span className="text-xs text-muted-foreground">
                {suvSlides[current].year} · {suvSlides[current].location}
              </span>
            </div>
            <h3 className="text-xl font-bold text-foreground">
              {suvSlides[current].title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {suvSlides[current].tagline}
            </p>
            <div className="mt-3 text-2xl font-extrabold text-primary">
              {suvSlides[current].price}
            </div>
          </div>

          {/* Carousel controls + dots */}
          <div className="flex items-center gap-3">
            <button
              onClick={scrollPrev}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/80 text-foreground shadow-card backdrop-blur-sm transition-smooth hover:bg-card"
              aria-label="Previous SUV"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              {suvSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => api?.scrollTo(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === current
                      ? "w-6 bg-primary"
                      : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground/70"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={scrollNext}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/80 text-foreground shadow-card backdrop-blur-sm transition-smooth hover:bg-card"
              aria-label="Next SUV"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Stat = ({ n, label }: { n: string; label: string }) => (
  <div>
    <div className="text-xl font-bold text-foreground">{n}</div>
    <div className="text-xs uppercase tracking-wider text-muted-foreground">
      {label}
    </div>
  </div>
);
