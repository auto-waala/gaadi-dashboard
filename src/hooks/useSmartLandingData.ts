// hooks/useSmartLandingData.ts
import { useState, useEffect, useCallback, useRef } from "react";
import featuredVehicleService from "@/services/listings/featuredVehicleService";
import newlyArrivedService from "@/services/listings/newlyArrivedVehicleService";
import premiumVehicleService from "@/services/listings/premiumVehicleService";
import upcomingVehicleService from "@/services/listings/upComingVehicleService";
import usedVehicleService from "@/services/listings/usedVehicleService";
import type { VehicleListing } from "@/models/listings/vehicleListingResponse";

interface LandingData {
  featured: VehicleListing[];
  newlyArrived: VehicleListing[];
  premium: VehicleListing[];
  upcoming: VehicleListing[];
  used: VehicleListing[];
}

interface LoadingState {
  featured: boolean;
  newlyArrived: boolean;
  premium: boolean;
  upcoming: boolean;
  used: boolean;
}

// ─── Hook ──────────────────────────────────────────────────────────────

export const useSmartLandingData = () => {
  // ─── State ──────────────────────────────────────────────────────────

  const [data, setData] = useState<LandingData>({
    featured: [],
    newlyArrived: [],
    premium: [],
    upcoming: [],
    used: [],
  });

  const [loading, setLoading] = useState<LoadingState>({
    featured: true,
    newlyArrived: true,
    premium: true,
    upcoming: true,
    used: true,
  });

  const [error, setError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // ─── CRITICAL: Prevent Multiple Calls ─────────────────────────────

  const isMounted = useRef(true);
  const hasLoaded = useRef(false); // ✅ Prevents duplicate loads
  const loadInProgress = useRef(false); // ✅ Prevents overlapping loads
  const retryCount = useRef(0); // ✅ Track retries
  const MAX_RETRIES = 2;

  // ─── Cleanup ──────────────────────────────────────────────────────────

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  // ─── Load Section with Retry ────────────────────────────────────────

  const loadSection = useCallback(async (
    key: keyof LandingData,
    fetchFn: () => Promise<any>,
    sectionName: string
  ): Promise<void> => {
    if (!isMounted.current) return;

    try {
      console.log(`🔄 Loading ${sectionName}...`);
      setActiveSection(sectionName);

      const response = await fetchFn();
      const items = response?.items || [];

      if (isMounted.current) {
        setData(prev => ({
          ...prev,
          [key]: items,
        }));
        setLoading(prev => ({
          ...prev,
          [key]: false,
        }));

        console.log(`✅ ${sectionName} loaded: ${items.length} vehicles`);
        retryCount.current = 0; // Reset retry count on success

        // Update progress
        const loadedKeys = Object.keys(loading).filter(k => !loading[k as keyof LoadingState]);
        const totalSections = 5;
        const loadedCount = loadedKeys.length + 1;
        setProgress(Math.min((loadedCount / totalSections) * 100, 100));
      }
    } catch (err: any) {
      console.error(`❌ ${sectionName} load failed:`, err?.message || err);

      // Retry logic for rate limiting (429)
      if (err?.response?.status === 429 && retryCount.current < MAX_RETRIES) {
        retryCount.current++;
        const delay = retryCount.current * 2000; // 2s, 4s
        console.log(`⏳ Rate limited. Retrying ${sectionName} in ${delay}ms... (Attempt ${retryCount.current}/${MAX_RETRIES})`);
        
        await new Promise(resolve => setTimeout(resolve, delay));
        
        if (isMounted.current) {
          return loadSection(key, fetchFn, sectionName);
        }
      }

      if (isMounted.current) {
        setLoading(prev => ({
          ...prev,
          [key]: false,
        }));
        setError(`Failed to load ${sectionName}`);
      }
    }
  }, [loading]);

  // ─── Sequential Loading ──────────────────────────────────────────────

  const loadSequentially = useCallback(async () => {
    // ✅ CRITICAL: Prevent multiple simultaneous loads
    if (loadInProgress.current) {
      console.log('⏳ Load already in progress, skipping...');
      return;
    }

    // ✅ CRITICAL: Prevent duplicate loads
    if (hasLoaded.current) {
      console.log('💾 Data already loaded, skipping...');
      return;
    }

    loadInProgress.current = true;
    hasLoaded.current = true;

    console.log('🚀 Starting sequential load...');
    console.time('Total Load Time');

    try {
      // ─── 1. Featured ─────────────────────────────────────────────────
      await loadSection(
        'featured',
        () => featuredVehicleService.getActiveFeaturedVehicles(1, 10),
        'Featured Vehicles'
      );

      // ─── 2. Newly Arrived ────────────────────────────────────────────
      await loadSection(
        'newlyArrived',
        () => newlyArrivedService.getCurrentYearArrivals(1, 10),
        'Newly Arrived'
      );

      // ─── 3. Premium ──────────────────────────────────────────────────
      await loadSection(
        'premium',
        () => premiumVehicleService.getActivePremiumVehicles(1, 10),
        'Premium Vehicles'
      );

      // ─── 4. Upcoming ─────────────────────────────────────────────────
      await loadSection(
        'upcoming',
        () => upcomingVehicleService.getActiveUpcoming(1, 10),
        'Upcoming Vehicles'
      );

      // ─── 5. Used ────────────────────────────────────────────────────
      await loadSection(
        'used',
        () => usedVehicleService.getActiveUsedVehicles(1, 10),
        'Used Vehicles'
      );

      if (isMounted.current) {
        setIsComplete(true);
        setProgress(100);
        setActiveSection(null);
        console.log('✅ All sections loaded!');
        console.timeEnd('Total Load Time');

        console.log('📊 Final Data Summary:', {
          featured: data.featured.length,
          newlyArrived: data.newlyArrived.length,
          premium: data.premium.length,
          upcoming: data.upcoming.length,
          used: data.used.length,
        });
      }
    } catch (err) {
      console.error('❌ Load failed:', err);
      if (isMounted.current) {
        setError('Failed to load data');
      }
    } finally {
      loadInProgress.current = false;
    }
  }, [data, loadSection]);

  // ─── Initial Load ────────────────────────────────────────────────────

  useEffect(() => {
    // ✅ ONLY LOAD ONCE
    if (!hasLoaded.current && !loadInProgress.current) {
      // Small delay to let React settle
      const timer = setTimeout(() => {
        loadSequentially();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [loadSequentially]);

  // ─── Load More Functions ─────────────────────────────────────────────

  const loadMoreFeatured = useCallback(async (page: number = 2) => {
    try {
      const response = await featuredVehicleService.getActiveFeaturedVehicles(page, 10);
      const newItems = response?.items || [];
      setData(prev => ({
        ...prev,
        featured: [...prev.featured, ...newItems],
      }));
      return response;
    } catch (err) {
      console.error('Load more featured failed:', err);
      throw err;
    }
  }, []);

  const loadMoreNewlyArrived = useCallback(async (page: number = 2) => {
    try {
      const response = await newlyArrivedService.getCurrentYearArrivals(page, 10);
      const newItems = response?.items || [];
      setData(prev => ({
        ...prev,
        newlyArrived: [...prev.newlyArrived, ...newItems],
      }));
      return response;
    } catch (err) {
      console.error('Load more newly arrived failed:', err);
      throw err;
    }
  }, []);

  const loadMorePremium = useCallback(async (page: number = 2) => {
    try {
      const response = await premiumVehicleService.getActivePremiumVehicles(page, 10);
      const newItems = response?.items || [];
      setData(prev => ({
        ...prev,
        premium: [...prev.premium, ...newItems],
      }));
      return response;
    } catch (err) {
      console.error('Load more premium failed:', err);
      throw err;
    }
  }, []);

  const loadMoreUpcoming = useCallback(async (page: number = 2) => {
    try {
      const response = await upcomingVehicleService.getActiveUpcoming(page, 10);
      const newItems = response?.items || [];
      setData(prev => ({
        ...prev,
        upcoming: [...prev.upcoming, ...newItems],
      }));
      return response;
    } catch (err) {
      console.error('Load more upcoming failed:', err);
      throw err;
    }
  }, []);

  const loadMoreUsed = useCallback(async (page: number = 2) => {
    try {
      const response = await usedVehicleService.getActiveUsedVehicles(page, 10);
      const newItems = response?.items || [];
      setData(prev => ({
        ...prev,
        used: [...prev.used, ...newItems],
      }));
      return response;
    } catch (err) {
      console.error('Load more used failed:', err);
      throw err;
    }
  }, []);

  // ─── Refetch ──────────────────────────────────────────────────────────

  const refetch = useCallback(async () => {
    // Reset flags to allow reload
    hasLoaded.current = false;
    loadInProgress.current = false;
    retryCount.current = 0;
    
    setLoading({
      featured: true,
      newlyArrived: true,
      premium: true,
      upcoming: true,
      used: true,
    });
    setProgress(0);
    setIsComplete(false);
    setError(null);
    
    await loadSequentially();
  }, [loadSequentially]);

  // ─── Return ──────────────────────────────────────────────────────────

  return {
    // Data
    data,
    loading,
    error,
    progress,
    activeSection,
    isComplete,

    // Section-specific data
    featured: data.featured,
    newlyArrived: data.newlyArrived,
    premium: data.premium,
    upcoming: data.upcoming,
    used: data.used,

    // Section-specific loading
    isLoadingFeatured: loading.featured,
    isLoadingNewlyArrived: loading.newlyArrived,
    isLoadingPremium: loading.premium,
    isLoadingUpcoming: loading.upcoming,
    isLoadingUsed: loading.used,

    // Load more functions
    loadMoreFeatured,
    loadMoreNewlyArrived,
    loadMorePremium,
    loadMoreUpcoming,
    loadMoreUsed,

    // Utilities
    refetch,
  };
};

export type UseSmartLandingDataReturn = ReturnType<typeof useSmartLandingData>;