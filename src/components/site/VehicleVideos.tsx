import { PlayCircle } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

type Video = { id: string; title: string; channel: string };

const videos: Video[] = [
  { id: "VAhQ0F38LUE", title: "Mahindra Thar ROXX Review", channel: "MotorBeam" },
  { id: "kxopViU98Xo", title: "Tata Punch — Mini SUV Drive", channel: "carwow" },
  { id: "LXb3EKWsInQ", title: "Hyundai Creta Facelift", channel: "Autocar India" },
  { id: "9bZkp7q19f0", title: "Maruti Suzuki Swift 2024", channel: "PowerDrift" },
  { id: "3JZ_D3ELwOQ", title: "Royal Enfield Himalayan 450", channel: "RideApart" },
  { id: "ScMzIvxBSi4", title: "BMW X5 xDrive India", channel: "BMW India" },
  { id: "hY7m5jjJ9mM", title: "Mercedes-Benz GLE Test Drive", channel: "Top Gear" },
  { id: "tgbNymZ7vqY", title: "Tata Nexon EV Long Drive", channel: "EVO India" },
  { id: "fJ9rUzIMcZQ", title: "KTM Duke 390 — Track Test", channel: "PowerDrift" },
  { id: "M7lc1UVf-VE", title: "Volkswagen Tiguan R-Line", channel: "carwow" },
];

export const VehicleVideos = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Video | null>(null);

  const play = (v: Video) => {
    setActive(v);
    setOpen(true);
  };

  return (
    <section className="container py-10">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Vehicle videos</h2>
          <p className="text-sm text-muted-foreground">
            Reviews, walkarounds & test drives — pick a vehicle and watch
          </p>
        </div>
      </div>

      <Carousel opts={{ align: "start", loop: true }}>
        <CarouselContent>
          {videos.map((v) => (
            <CarouselItem
              key={v.id}
              className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <button
                onClick={() => play(v)}
                className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-border bg-card text-left shadow-card transition-smooth hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="relative aspect-video overflow-hidden bg-secondary">
                  <img
                    src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                    alt={v.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-smooth group-hover:scale-105"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-foreground/20 opacity-90 transition-smooth group-hover:bg-foreground/30">
                    <PlayCircle className="h-14 w-14 text-background drop-shadow-lg" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-1 p-4">
                  <h3 className="line-clamp-2 text-sm font-semibold leading-snug">
                    {v.title}
                  </h3>
                  <span className="text-xs text-muted-foreground">{v.channel}</span>
                </div>
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-2 hidden md:flex" />
        <CarouselNext className="-right-2 hidden md:flex" />
      </Carousel>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl p-0">
          <DialogTitle className="sr-only">{active?.title ?? "Video"}</DialogTitle>
          {active && (
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${active.id}?autoplay=1`}
                title={active.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
