import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { listings, formatINR } from "@/data/listings";
import {
  Plus,
  Eye,
  MessageCircle,
  IndianRupee,
  CheckCircle2,
  Clock,
  TrendingUp,
} from "lucide-react";

const SellerDashboard = () => {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/auth" replace />;

  // Mock seller data — pulled from listings as demo
  const myListings = listings.slice(0, 6).map((l, i) => ({
    ...l,
    status: i < 4 ? "published" : i === 4 ? "sold" : "pending",
    views: Math.floor(Math.random() * 800) + 120,
    leads: Math.floor(Math.random() * 30) + 2,
  }));

  const stats = {
    published: myListings.filter((l) => l.status === "published").length,
    sold: myListings.filter((l) => l.status === "sold").length,
    pending: myListings.filter((l) => l.status === "pending").length,
    views: myListings.reduce((s, l) => s + l.views, 0),
    leads: myListings.reduce((s, l) => s + l.leads, 0),
    earnings: myListings
      .filter((l) => l.status === "sold")
      .reduce((s, l) => s + l.price, 0),
  };

  const name =
    (user.user_metadata?.first_name as string) || user.email?.split("@")[0] || "Seller";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        {/* Welcome */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold">
              Welcome, <span className="text-primary">{name}</span> 👋
            </h1>
            <p className="text-sm text-muted-foreground">
              Here's how your listings are performing on AutoNext.
            </p>
          </div>
          <Button variant="hero" asChild>
            <Link to="/sell">
              <Plus className="mr-1 h-4 w-4" /> Post new ad
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Published",
              value: stats.published,
              icon: CheckCircle2,
              color: "text-india-green",
            },
            {
              label: "Sold",
              value: stats.sold,
              icon: TrendingUp,
              color: "text-primary",
            },
            {
              label: "Pending Review",
              value: stats.pending,
              icon: Clock,
              color: "text-muted-foreground",
            },
            {
              label: "Total Earnings",
              value: formatINR(stats.earnings),
              icon: IndianRupee,
              color: "text-india-green",
            },
          ].map((s) => (
            <Card key={s.label} className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </span>
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <div className="mt-2 text-2xl font-extrabold">{s.value}</div>
            </Card>
          ))}
        </div>

        {/* Engagement */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Card className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
              <Eye className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-extrabold">{stats.views.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Total ad views</div>
            </div>
          </Card>
          <Card className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
              <MessageCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-extrabold">{stats.leads}</div>
              <div className="text-xs text-muted-foreground">Buyer enquiries</div>
            </div>
          </Card>
        </div>

        {/* Listings */}
        <div className="mt-10">
          <h2 className="mb-4 text-xl font-bold">My listings</h2>
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            <div className="hidden border-b border-border bg-secondary/40 px-5 py-3 text-xs font-bold uppercase tracking-wider text-muted-foreground md:grid md:grid-cols-[1fr_120px_100px_100px_120px]">
              <div>Vehicle</div>
              <div>Price</div>
              <div>Views</div>
              <div>Leads</div>
              <div>Status</div>
            </div>
            {myListings.map((l) => (
              <Link
                to={`/listing/${l.id}`}
                key={l.id}
                className="grid grid-cols-1 items-center gap-3 border-b border-border px-5 py-4 transition-smooth last:border-b-0 hover:bg-accent/40 md:grid-cols-[1fr_120px_100px_100px_120px]"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={l.image}
                    alt=""
                    className="h-14 w-20 rounded-md object-cover"
                  />
                  <div>
                    <div className="font-semibold">{l.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {l.location} · {l.postedAgo}
                    </div>
                  </div>
                </div>
                <div className="font-bold text-primary">{formatINR(l.price)}</div>
                <div className="text-sm">{l.views}</div>
                <div className="text-sm">{l.leads}</div>
                <div>
                  {l.status === "published" && (
                    <Badge className="bg-india-green text-white hover:bg-india-green">
                      Published
                    </Badge>
                  )}
                  {l.status === "sold" && (
                    <Badge className="bg-primary text-primary-foreground hover:bg-primary">
                      Sold
                    </Badge>
                  )}
                  {l.status === "pending" && (
                    <Badge variant="secondary">Pending</Badge>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SellerDashboard;
