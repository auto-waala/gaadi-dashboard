import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Sparkles, MapPin, Star, Fuel, Cog } from "lucide-react";
import { Link } from "react-router-dom";
import { sectionCars, sectionMeta, type SectionKey } from "@/data/sections";

export const CarSection = ({ section }: { section: SectionKey }) => {
  const meta = sectionMeta[section];
  const cars = sectionCars[section];

  return (
    <section className="container py-10">
      <div className="mb-5 flex items-end justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            <Sparkles className="h-3 w-3" /> {meta.tag}
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            {meta.title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-primary">
              {meta.title.split(" ").slice(-1)}
            </span>
          </h2>
          <p className="text-sm text-muted-foreground">{meta.description}</p>
        </div>
        <Link
          to={`/${section}/cars`}
          className="hidden text-sm font-semibold text-primary hover:underline md:inline"
        >
          View all →
        </Link>
      </div>

      <Carousel opts={{ align: "start", loop: true }} className="px-10">
        <CarouselContent>
          {cars.map((c) => (
            <CarouselItem
              key={c.id}
              className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <Link
                to={`/${section}/cars/${c.id}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-smooth hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-smooth group-hover:scale-105"
                  />
                  <Badge className={`absolute left-3 top-3 ${meta.badgeClass} text-white hover:${meta.badgeClass}`}>
                    {c.badge ?? meta.tag}
                  </Badge>
                </div>
                <div className="flex flex-col gap-1 p-4">
                  <span className="text-lg font-bold text-primary">{c.price}</span>
                  <h3 className="line-clamp-1 text-sm font-semibold">{c.title}</h3>
                  <div className="mt-1 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    {c.fuel && (
                      <span className="inline-flex items-center gap-1">
                        <Fuel className="h-3 w-3" /> {c.fuel}
                      </span>
                    )}
                    {c.transmission && (
                      <span className="inline-flex items-center gap-1">
                        <Cog className="h-3 w-3" /> {c.transmission}
                      </span>
                    )}
                    {c.rating && (
                      <span className="inline-flex items-center gap-1">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />{" "}
                        {c.rating}
                      </span>
                    )}
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
