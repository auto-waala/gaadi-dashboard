import { ShieldCheck, ArrowRight } from "lucide-react";

// Note: many Indian insurance brands are not on SimpleIcons; we fall back to
// a styled monogram tile when the logo fails to load.
const insurers = [
  { name: "Bajaj Allianz", slug: "bajajallianz", color: "002F87", short: "BA" },
  { name: "Bharti AXA", slug: "bhartiaxa", color: "0033A0", short: "BX" },
  { name: "Reliance General", slug: "reliancegeneral", color: "E5132C", short: "RG" },
  { name: "ICICI Lombard", slug: "icicilombard", color: "AD171F", short: "IL" },
  { name: "HDFC ERGO", slug: "hdfcergo", color: "ED1C24", short: "HE" },
  { name: "Tata AIG", slug: "tataaig", color: "00529B", short: "TA" },
  { name: "SBI General", slug: "sbigeneral", color: "22409A", short: "SB" },
  { name: "New India Assurance", slug: "newindiaassurance", color: "0E5AA7", short: "NI" },
  { name: "Acko", slug: "acko", color: "EE3853", short: "AK" },
  { name: "Digit Insurance", slug: "digitinsurance", color: "0B6EF8", short: "DG" },
];

export const InsurancePartners = () => {
  return (
    <section className="container py-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            <ShieldCheck className="h-3 w-3" /> Drive Worry-Free
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">
            Vehicle insurance from <span className="text-primary">trusted partners</span>
          </h2>
          <p className="text-sm text-muted-foreground">
            Compare quotes and buy car or bike insurance in minutes from India's top insurers.
          </p>
        </div>
        <a
          href="/insurance"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          Get a quote <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {insurers.map((p) => (
          <a
            key={p.slug}
            href="/insurance"
            className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card p-4 text-center shadow-card transition-smooth hover:-translate-y-1 hover:border-primary hover:shadow-elegant"
          >
            <div
              className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary p-2 text-sm font-extrabold"
              style={{ color: `#${p.color}` }}
            >
              <img
                src={`https://cdn.simpleicons.org/${p.slug}/${p.color}`}
                alt={`${p.name} logo`}
                className="h-10 w-10 object-contain"
                loading="lazy"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.style.display = "none";
                  const parent = img.parentElement;
                  if (parent && !parent.dataset.fb) {
                    parent.dataset.fb = "1";
                    parent.textContent = p.short;
                  }
                }}
              />
            </div>
            <div className="text-xs font-semibold leading-tight">{p.name}</div>
          </a>
        ))}
      </div>
    </section>
  );
};
