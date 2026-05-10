import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Sparkles, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
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

const newCars = [
  { id: "1", title: "Tata Punch Creative AMT", price: "₹ 8,49,000", year: 2025, location: "Mumbai", image: car1 },
  { id: "2", title: "Hyundai Creta SX(O) Turbo", price: "₹ 20,15,000", year: 2025, location: "Pune", image: creta },
  { id: "3", title: "Mahindra Thar 4x4 LX", price: "₹ 17,60,000", year: 2025, location: "Delhi", image: thar },
  { id: "ev1", title: "BMW X5 xDrive40i", price: "₹ 99,90,000", year: 2025, location: "Bengaluru", image: bmw },
  { id: "ev2", title: "Mercedes-Benz GLE 450d", price: "₹ 1,07,50,000", year: 2025, location: "Hyderabad", image: benz },
  { id: "b1", title: "Volkswagen Tiguan R-Line", price: "₹ 49,00,000", year: 2025, location: "Chennai", image: vw },
];

export const NewArrivals = () => {
  return (
    <section className="container py-10">
      <div className="mb-5 flex items-end justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            <Sparkles className="h-3 w-3" /> Just In
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            Newly arrived <span className="text-primary">cars</span>
          </h2>
          <p className="text-sm text-muted-foreground">
            Fresh inventory added this week from verified sellers across India.
          </p>
        </div>
      </div>

      <Carousel opts={{ align: "start", loop: true }} className="px-10">
        <CarouselContent>
          {newCars.map((c) => (
            <CarouselItem key={c.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <Link
                to={`/listing/${c.id}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-smooth hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-smooth group-hover:scale-105"
                  />
                  <Badge className="absolute left-3 top-3 bg-india-green text-white hover:bg-india-green">
                    New
                  </Badge>
                </div>
                <div className="flex flex-col gap-1 p-4">
                  <span className="text-lg font-bold text-primary">{c.price}</span>
                  <h3 className="line-clamp-1 text-sm font-semibold">{c.title}</h3>
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
