import { Landmark, ArrowRight } from "lucide-react";

const banks = [
  { name: "HDFC Bank", slug: "hdfcbank", color: "004C8F", rate: "8.75%" },
  { name: "ICICI Bank", slug: "icicibank", color: "F37E20", rate: "8.85%" },
  { name: "Axis Bank", slug: "axisbank", color: "97144D", rate: "8.95%" },
  { name: "IDFC FIRST Bank", slug: "idfcfirstbank", color: "9C2A26", rate: "8.99%" },
  { name: "State Bank of India", slug: "statebankofindia", color: "22409A", rate: "8.65%" },
  { name: "Bajaj Finserv", slug: "bajajfinserv", color: "003366", rate: "9.25%" },
  { name: "Kotak Mahindra Bank", slug: "kotak", color: "ED1C24", rate: "9.10%" },
  { name: "Yes Bank", slug: "yesbank", color: "00518A", rate: "9.50%" },
];

export const BankPartners = () => {
  return (
    <section className="container py-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            <Landmark className="h-3 w-3" /> Easy Financing
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            Vehicle loans from <span className="text-primary">trusted banks</span>
          </h2>
          <p className="text-sm text-muted-foreground">
            Get pre-approved car & bike loans starting at <strong>8.65% p.a.</strong> from India's
            leading lenders.
          </p>
        </div>
        <a
          href="/loans"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          Check eligibility <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {banks.map((b) => (
          <a
            key={b.slug}
            href="/loans"
            className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card p-5 text-center shadow-card transition-smooth hover:-translate-y-1 hover:border-primary hover:shadow-elegant"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary p-2">
              <img
                src={`https://cdn.simpleicons.org/${b.slug}/${b.color}`}
                alt={`${b.name} logo`}
                className="h-10 w-10 object-contain"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <div className="text-sm font-semibold leading-tight">{b.name}</div>
            <div className="text-xs text-muted-foreground">
              from <span className="font-bold text-india-green">{b.rate}</span> p.a.
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
