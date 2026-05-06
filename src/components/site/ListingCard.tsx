import { Heart, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { formatPKR, type Listing } from "@/data/listings";
import { Badge } from "@/components/ui/badge";

export const ListingCard = ({ listing }: { listing: Listing }) => {
  return (
    <Link
      to={`/listing/${listing.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-smooth hover:-translate-y-1 hover:shadow-elegant"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={listing.image}
          alt={listing.title}
          loading="lazy"
          className="h-full w-full object-cover transition-smooth group-hover:scale-105"
        />
        {listing.featured && (
          <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground hover:bg-primary">
            Featured
          </Badge>
        )}
        <button
          onClick={(e) => e.preventDefault()}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-foreground/80 backdrop-blur transition-smooth hover:bg-primary hover:text-primary-foreground"
          aria-label="Save"
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-lg font-bold text-primary">
            {formatPKR(listing.price)}
          </span>
          <span className="text-xs text-muted-foreground">{listing.year}</span>
        </div>
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug">
          {listing.title}
        </h3>
        <div className="mt-2 flex flex-wrap gap-1.5 text-[11px] text-muted-foreground">
          <span className="rounded-md bg-secondary px-2 py-0.5">
            {listing.km.toLocaleString()} km
          </span>
          <span className="rounded-md bg-secondary px-2 py-0.5">{listing.fuel}</span>
          <span className="rounded-md bg-secondary px-2 py-0.5">
            {listing.transmission}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {listing.location}
          </span>
          <span>{listing.postedAgo}</span>
        </div>
      </div>
    </Link>
  );
};
