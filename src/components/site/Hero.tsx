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
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import car1 from "@/assets/car-1.jpg";
import car2 from "@/assets/car-2.jpg";
import car3 from "@/assets/car-3.jpg";
import car4 from "@/assets/car-4.jpg";
import ev1 from "@/assets/ev-1.jpg";

const suvSlides = [
  {
    id: "s1",
    title: "Mahindra XUV700 AX7L",
    price: "₹ 23,99,000",
    tagline: "Adrenox Tech · AWD Diesel",
    image: car3,
    location: "Delhi NCR",
    year: 2025,
  },
  {
    id: "s2",
    title: "Tata Safari Accomplished+",
    price: "₹ 21,45,000",
    tagline: "7-Seater · Panoramic Sunroof",
    image: car1,
    location: "Mumbai",
    year: 2025,
  },
  {
    id: "s3",
    title: "Hyundai Creta N-Line",
    price: "₹ 18,90,000",
    tagline: "Turbo Petrol · DCT",
    image: car2,
    location: "Bengaluru",
    year: 2025,
  },
  {
    id: "s4",
    title: "MG Windsor EV Essence",
    price: "₹ 15,50,000",
    tagline: "525 km Range · Battery Lease",
    image: ev1,
    location: "Hyderabad",
    year: 2025,
  },
  {
    id: "s5",
    title: "Maruti Grand Vitara Alpha+",
    price: "₹ 17,99,000",
    tagline: "Strong Hybrid · AWD",
    image: car4,
    location: "Pune",
    year: 2025,
  },
];

export const Hero = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

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
    <section className="relative overflow-hidden">
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
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
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

          <div className="rounded-2xl border border-border bg-card p-3 shadow-card md:p-4">
            <div className="grid gap-2 md:grid-cols-[1fr_1fr_auto]">
              <Select defaultValue="cars">
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cars">Cars</SelectItem>
                  <SelectItem value="bikes">Bikes</SelectItem>
                  <SelectItem value="mobiles">Mobiles</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="h-12 pl-10"
                  placeholder="Brand, model or keyword"
                />
              </div>
              <Button size="lg" variant="hero" className="h-12">
                Search
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
