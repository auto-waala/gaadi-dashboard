import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { listings, formatINR } from "@/data/listings";
import { Link } from "react-router-dom";

export const SearchBox = ({ compact = false }: { compact?: boolean }) => {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const s = q.toLowerCase();
    return listings
      .filter(
        (l) =>
          l.title.toLowerCase().includes(s) ||
          l.category.toLowerCase().includes(s) ||
          l.location.toLowerCase().includes(s),
      )
      .slice(0, 8);
  }, [q]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative flex-1">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder="Find Cars, Bikes, Trucks and more..."
        className={`pl-10 pr-24 ${compact ? "h-10" : "h-11"}`}
      />
      <Button
        size="sm"
        className={`absolute right-1 top-1/2 -translate-y-1/2 px-4 ${compact ? "h-8" : "h-9"}`}
      >
        Search
      </Button>

      {open && q.trim() && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[420px] overflow-auto rounded-xl border border-border bg-popover shadow-elegant">
          {results.length === 0 ? (
            <div className="p-4 text-sm text-muted-foreground">
              No results for "<span className="font-medium text-foreground">{q}</span>"
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {results.map((l) => (
                <li key={l.id}>
                  <Link
                    to={`/listing/${l.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 p-2.5 hover:bg-accent"
                  >
                    <img
                      src={l.image}
                      alt={l.title}
                      className="h-12 w-16 rounded object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold">{l.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {l.category} · {l.location} · {l.year}
                      </div>
                    </div>
                    <div className="text-sm font-bold text-primary">
                      {formatINR(l.price)}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
