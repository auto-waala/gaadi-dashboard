// pages/Index.tsx
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { CarSection } from "@/components/site/CarSection";
import { TrendingCars } from "@/components/site/TrendingCars";
import { VehicleVideos } from "@/components/site/VehicleVideos";
import { BrandCategories } from "@/components/site/BrandCategories";
import { BankPartners } from "@/components/site/BankPartners";
import { InsurancePartners } from "@/components/site/InsurancePartners";
import { DealerPartners } from "@/components/site/DealerPartners";
import { VehicleChecks } from "@/components/site/VehicleChecks";
import { Footer } from "@/components/site/Footer";
import { CategoryGrid } from "@/components/site/CategoryGrid";
import { ListingCard } from "@/components/site/ListingCard";
import { Filters } from "@/components/site/Filters";
import { useSmartLandingData } from "@/hooks/useSmartLandingData";
import { useMemo, useState, useEffect } from "react";
import { LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { listings } from "@/data/listings";

const Index = () => {
  const [type, setType] = useState("All");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState("recent");

  // ─── Smart Data Loading (Logging Only) ─────────────────────────────

  const {
    data,
    loading,
    progress,
    activeSection,
    isComplete,
    featured,
    newlyArrived,
    premium,
    upcoming,
    used,
    isLoadingFeatured,
    isLoadingNewlyArrived,
    isLoadingPremium,
    isLoadingUpcoming,
    isLoadingUsed,
    loadMoreFeatured,
    loadMoreNewlyArrived,
    loadMorePremium,
    loadMoreUpcoming,
    loadMoreUsed,
    refetch,
  } = useSmartLandingData();

  // ─── Log API Data ──────────────────────────────────────────────────

  useEffect(() => {
    // Log when data changes
    if (data) {
      console.log('📊 [Index] Smart Landing Data Update:', {
        featured: {
          count: data.featured?.length || 0,
          loading: loading.featured,
          firstItem: data.featured?.[0]?.title || 'N/A',
        },
        newlyArrived: {
          count: data.newlyArrived?.length || 0,
          loading: loading.newlyArrived,
          firstItem: data.newlyArrived?.[0]?.title || 'N/A',
        },
        premium: {
          count: data.premium?.length || 0,
          loading: loading.premium,
          firstItem: data.premium?.[0]?.title || 'N/A',
        },
        upcoming: {
          count: data.upcoming?.length || 0,
          loading: loading.upcoming,
          firstItem: data.upcoming?.[0]?.title || 'N/A',
        },
        used: {
          count: data.used?.length || 0,
          loading: loading.used,
          firstItem: data.used?.[0]?.title || 'N/A',
        },
        progress: progress,
        activeSection: activeSection,
        isComplete: isComplete,
      });
    }
  }, [data, loading, progress, activeSection, isComplete]);

  // ─── Log Individual Section Data ────────────────────────────────────

  useEffect(() => {
    if (featured.length > 0) {
      console.log('🚗 Featured Vehicles Loaded:', {
        count: featured.length,
        vehicles: featured.map(v => ({
          id: v.id,
          title: v.title,
          price: v.price?.formattedPrice,
          brand: v.brandName,
          model: v.modelName,
        })),
      });
    }
  }, [featured]);

  useEffect(() => {
    if (newlyArrived.length > 0) {
      console.log('✨ Newly Arrived Vehicles Loaded:', {
        count: newlyArrived.length,
        vehicles: newlyArrived.map(v => ({
          id: v.id,
          title: v.title,
          price: v.price?.formattedPrice,
          brand: v.brandName,
          model: v.modelName,
        })),
      });
    }
  }, [newlyArrived]);

  useEffect(() => {
    if (premium.length > 0) {
      console.log('💎 Premium Vehicles Loaded:', {
        count: premium.length,
        vehicles: premium.map(v => ({
          id: v.id,
          title: v.title,
          price: v.price?.formattedPrice,
          brand: v.brandName,
          model: v.modelName,
        })),
      });
    }
  }, [premium]);

  useEffect(() => {
    if (upcoming.length > 0) {
      console.log('🚀 Upcoming Vehicles Loaded:', {
        count: upcoming.length,
        vehicles: upcoming.map(v => ({
          id: v.id,
          title: v.title,
          price: v.price?.formattedPrice,
          brand: v.brandName,
          model: v.modelName,
        })),
      });
    }
  }, [upcoming]);

  useEffect(() => {
    if (used.length > 0) {
      console.log('🔄 Used Vehicles Loaded:', {
        count: used.length,
        vehicles: used.map(v => ({
          id: v.id,
          title: v.title,
          price: v.price?.formattedPrice,
          brand: v.brandName,
          model: v.modelName,
        })),
      });
    }
  }, [used]);

  // ─── Log Loading Status ─────────────────────────────────────────────

  useEffect(() => {
    console.log('⏳ Loading Status:', {
      featured: isLoadingFeatured,
      newlyArrived: isLoadingNewlyArrived,
      premium: isLoadingPremium,
      upcoming: isLoadingUpcoming,
      used: isLoadingUsed,
      progress: `${progress}%`,
      activeSection,
      isComplete,
    });
  }, [
    isLoadingFeatured,
    isLoadingNewlyArrived,
    isLoadingPremium,
    isLoadingUpcoming,
    isLoadingUsed,
    progress,
    activeSection,
    isComplete,
  ]);

  // ─── Log When Complete ──────────────────────────────────────────────

  useEffect(() => {
    if (isComplete) {
      console.log('🎉 All sections loaded successfully!');
      console.log('📊 Final Data Summary:', {
        totalVehicles: 
          featured.length + 
          newlyArrived.length + 
          premium.length + 
          upcoming.length + 
          used.length,
        sections: {
          featured: featured.length,
          newlyArrived: newlyArrived.length,
          premium: premium.length,
          upcoming: upcoming.length,
          used: used.length,
        },
      });
    }
  }, [isComplete, featured, newlyArrived, premium, upcoming, used]);

  // ─── Log Load More Events ───────────────────────────────────────────

  const handleLoadMoreFeatured = async () => {
    console.log('📥 Loading more featured vehicles...');
    try {
      const result = await loadMoreFeatured();
      console.log('✅ Load more featured result:', {
        newItems: result?.items?.length || 0,
        total: result?.items?.length || 0,
      });
    } catch (error) {
      console.error('❌ Load more featured failed:', error);
    }
  };

  const handleLoadMoreNewlyArrived = async () => {
    console.log('📥 Loading more newly arrived vehicles...');
    try {
      const result = await loadMoreNewlyArrived();
      console.log('✅ Load more newly arrived result:', {
        newItems: result?.items?.length || 0,
        total: result?.items?.length || 0,
      });
    } catch (error) {
      console.error('❌ Load more newly arrived failed:', error);
    }
  };

  const handleLoadMorePremium = async () => {
    console.log('📥 Loading more premium vehicles...');
    try {
      const result = await loadMorePremium();
      console.log('✅ Load more premium result:', {
        newItems: result?.items?.length || 0,
        total: result?.items?.length || 0,
      });
    } catch (error) {
      console.error('❌ Load more premium failed:', error);
    }
  };

  const handleLoadMoreUpcoming = async () => {
    console.log('📥 Loading more upcoming vehicles...');
    try {
      const result = await loadMoreUpcoming();
      console.log('✅ Load more upcoming result:', {
        newItems: result?.items?.length || 0,
        total: result?.items?.length || 0,
      });
    } catch (error) {
      console.error('❌ Load more upcoming failed:', error);
    }
  };

  const handleLoadMoreUsed = async () => {
    console.log('📥 Loading more used vehicles...');
    try {
      const result = await loadMoreUsed();
      console.log('✅ Load more used result:', {
        newItems: result?.items?.length || 0,
        total: result?.items?.length || 0,
      });
    } catch (error) {
      console.error('❌ Load more used failed:', error);
    }
  };

  // ─── Filter Logic (Using Static Data) ──────────────────────────────

  const filtered = useMemo(() => {
    let arr = [...listings];
    if (type !== "All") arr = arr.filter((l) => l.category === type);
    if (sort === "low") arr.sort((a, b) => a.price - b.price);
    if (sort === "high") arr.sort((a, b) => b.price - a.price);
    return arr;
  }, [type, sort]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        
        {/* ─── Car Sections (Keep as is) ────────────────────────────── */}
        <CarSection section="featured" />
        <CarSection section="newlyarrived" />
        <CarSection section="premium" />
        <CarSection section="upcoming" />
        
        <TrendingCars />
        
        {/* ─── Fresh Listings (Keep as is) ──────────────────────────── */}
        <section id="listings" className="container pb-16">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Fresh listings
              </h2>
              <p className="text-sm text-muted-foreground">
                {filtered.length} results in {type === "All" ? "all categories" : type}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <SlidersHorizontal className="mr-1 h-4 w-4" /> Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[320px] p-4">
                  <Filters active={type} onChange={setType} />
                </SheetContent>
              </Sheet>

              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="h-9 w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most recent</SelectItem>
                  <SelectItem value="low">Price: Low to High</SelectItem>
                  <SelectItem value="high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
              <div className="hidden rounded-md border border-border md:flex">
                <button
                  onClick={() => setView("grid")}
                  className={`p-2 ${view === "grid" ? "bg-primary text-primary-foreground" : ""}`}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`p-2 ${view === "list" ? "bg-primary text-primary-foreground" : ""}`}
                  aria-label="List view"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            <div className="hidden lg:block">
              <Filters active={type} onChange={setType} />
            </div>
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
                  : "flex flex-col gap-4"
              }
            >
              {filtered.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          </div>
        </section>
        
        <CategoryGrid active={type} onChange={setType} />
        <BrandCategories />
        <BankPartners />
        <InsurancePartners />
        <DealerPartners />
        <VehicleChecks />
        <VehicleVideos />
      </main>

      <Footer />
    </div>
  );
};

export default Index;