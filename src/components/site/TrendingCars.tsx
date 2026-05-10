import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Flame, Fuel, MapPin, Settings2, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { formatINR, listings } from "@/data/listings";

// Pick a curated set of trending listings from existing inventory
const trendingIds = ["1", "2", "3", "4", "5", "6"];

const trending = trendingIds
  .map((id) => listings.find((l) => l.id === id))
  .filter(Boolean)
  .map((l, i) => ({ ...l!, rating: (4.3 + (i % 4) * 0.15).toFixed(1) }));

export const TrendingCars = () => {
  return (
    <section className="container py-10">
      <div className="mb-5 flex items-end justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Flame className="h-3 w-3" /> Trending Now
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            Brand new <span className="text-primary">cars</span> trending this week
          </h2>
          <p className="text-sm text-muted-foreground">
            Most viewed and shortlisted cars across India right now.
          </p>
        </div>
      </div>

      <Carousel opts={{ align: "start", loop: true }} className="px-10">
        <CarouselContent>
          {trending.map((c) => (
            <CarouselItem
              key={c.id}
              className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <Link
                to={`/listing/${c.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-smooth hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-smooth group-hover:scale-105"
                  />
                  <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground hover:bg-primary">
                    <Flame className="mr-1 h-3 w-3" /> Trending
                  </Badge>
                  <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-background/90 px-2 py-0.5 text-xs font-semibold backdrop-blur">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    {c.rating}
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-1 p-4">
                  <span className="text-lg font-bold text-primary">
                    {formatINR(c.price)}
                  </span>
                  <h3 className="line-clamp-1 text-sm font-semibold">{c.title}</h3>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent/60 px-2 py-0.5">
                      <Fuel className="h-3 w-3" /> {c.fuel}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent/60 px-2 py-0.5">
                      <Settings2 className="h-3 w-3" /> {c.transmission}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between border-t border-border pt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {c.location}
                    </span>
                    <span>{c.year}</span>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </section>
  );
};
