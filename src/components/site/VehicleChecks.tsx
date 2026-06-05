import {
  ShieldCheck,
  Wrench,
  Gauge,
  Battery,
  Car,
  Settings2,
  Cog,
  Disc,
  Fuel,
  Snowflake,
  Lightbulb,
  Radio,
} from "lucide-react";

const groups = [
  {
    icon: Car,
    title: "Exterior",
    items: [
      "Body panels",
      "Paint condition",
      "Bumpers",
      "Glass & mirrors",
      "Doors & boot",
    ],
  },
  {
    icon: Wrench,
    title: "Engine",
    items: [
      "Oil leaks",
      "Coolant level",
      "Belts & hoses",
      "Mounts",
      "Idle response",
    ],
  },
  {
    icon: Cog,
    title: "Transmission",
    items: [
      "Gear shifts",
      "Clutch wear",
      "Linkage",
      "Fluid quality",
    ],
  },
  {
    icon: Disc,
    title: "Brakes & Tyres",
    items: [
      "Brake pads",
      "Discs / drums",
      "ABS function",
      "Tyre tread",
      "Wheel alignment",
    ],
  },
  {
    icon: Settings2,
    title: "Suspension",
    items: [
      "Shock absorbers",
      "Bushes",
      "Steering play",
    ],
  },
  {
    icon: Battery,
    title: "Electricals",
    items: [
      "Battery health",
      "Alternator",
      "Starter",
      "Wiring",
    ],
  },
  {
    icon: Lightbulb,
    title: "Lights",
    items: [
      "Headlamps",
      "Tail lamps",
      "Indicators",
    ],
  },
  {
    icon: Snowflake,
    title: "AC & Heater",
    items: [
      "Cooling performance",
      "Blower",
      "Heater",
    ],
  },
  {
    icon: Radio,
    title: "Interior & Tech",
    items: [
      "Infotainment",
      "Power windows",
      "Seat upholstery",
    ],
  },
  {
    icon: Gauge,
    title: "Road Test",
    items: [
      "Acceleration",
      "Braking",
      "NVH levels",
    ],
  },
  {
    icon: Fuel,
    title: "Documents",
    items: [
      "RC verification",
      "Insurance status",
      "Service history",
      "Loan / hypothecation check",
    ],
  },
];

const total = groups.reduce((n, g) => n + g.items.length, 0);

export const VehicleChecks = () => (
  <section className="container py-12">
    <div className="mb-8 text-center">
      <div className="inline-flex items-center gap-1.5 rounded-full bg-india-green/10 px-3 py-1 text-xs font-semibold text-india-green">
        <ShieldCheck className="h-3 w-3" /> AutoNext Assured
      </div>
      <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
        Every vehicle passes a{" "}
        <span className="text-primary">{total}-point inspection</span>
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Our certified engineers check {total}+ parameters across body, engine,
        electricals, road performance and paperwork before any car is listed.
      </p>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {groups.map((g) => (
        <div
          key={g.title}
          className="rounded-xl border border-border bg-card p-4 shadow-card transition-smooth hover:-translate-y-0.5 hover:border-primary hover:shadow-elegant"
        >
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <g.icon className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-bold">{g.title}</h3>
            <span className="ml-auto text-[10px] font-semibold text-muted-foreground">
              {g.items.length} checks
            </span>
          </div>
          <ul className="space-y-1.5 text-xs text-muted-foreground">
            {g.items.map((it) => (
              <li key={it} className="flex items-start gap-1.5">
                <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-india-green" />
                {it}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);
