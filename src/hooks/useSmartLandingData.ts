// hooks/useSmartLandingData.ts
import { useState, useEffect, useCallback, useRef } from "react";
import featuredVehicleService from "@/services/listings/featuredVehicleService";
import newlyArrivedService from "@/services/listings/newlyArrivedVehicleService";
import premiumVehicleService from "@/services/listings/premiumVehicleService";
import upcomingVehicleService from "@/services/listings/upComingVehicleService";
import usedVehicleService from "@/services/listings/usedVehicleService";
import type { VehicleListing } from "@/models//listings/vehicleListingResponse";

// ─── Types ──────────────────────────────────────────────────────────────

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

interface SectionConfig {
    key: keyof LandingData;
    priority: 1 | 2 | 3 | 4 | 5;
    label: string;
    fetchFn: (page?: number, pageSize?: number) => Promise<any>;
    loadMoreFn: (page?: number, pageSize?: number) => Promise<any>;
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

    // ─── Refs ─────────────────────────────────────────────────────────────

    const loadStatus = useRef({
        featured: false,
        newlyArrived: false,
        premium: false,
        upcoming: false,
        used: false,
    });

    const isMounted = useRef(true);

    // ─── Section Configurations ──────────────────────────────────────────

    const sections: SectionConfig[] = [
        {
            key: 'featured',
            priority: 1,
            label: 'Featured Vehicles',
            fetchFn: (page = 1, pageSize = 10) =>
                featuredVehicleService.getActiveFeaturedVehicles(page, pageSize),
            loadMoreFn: (page = 2, pageSize = 10) =>
                featuredVehicleService.getActiveFeaturedVehicles(page, pageSize),
        },
        {
            key: 'newlyArrived',
            priority: 2,
            label: 'Newly Arrived',
            fetchFn: (page = 1, pageSize = 10) =>
                newlyArrivedService.getCurrentYearArrivals(page, pageSize),
            loadMoreFn: (page = 2, pageSize = 10) =>
                newlyArrivedService.getCurrentYearArrivals(page, pageSize),
        },
        {
            key: 'premium',
            priority: 3,
            label: 'Premium Vehicles',
            fetchFn: (page = 1, pageSize = 10) =>
                premiumVehicleService.getActivePremiumVehicles(page, pageSize),
            loadMoreFn: (page = 2, pageSize = 10) =>
                premiumVehicleService.getActivePremiumVehicles(page, pageSize),
        },
        {
            key: 'upcoming',
            priority: 4,
            label: 'Upcoming Vehicles',
            fetchFn: (page = 1, pageSize = 10) =>
                upcomingVehicleService.getActiveUpcoming(page, pageSize),
            loadMoreFn: (page = 2, pageSize = 10) =>
                upcomingVehicleService.getActiveUpcoming(page, pageSize),
        },
        {
            key: 'used',
            priority: 5,
            label: 'Used Vehicles',
            fetchFn: (page = 1, pageSize = 10) =>
                usedVehicleService.getActiveUsedVehicles(page, pageSize),
            loadMoreFn: (page = 2, pageSize = 10) =>
                usedVehicleService.getActiveUsedVehicles(page, pageSize),
        },
    ];

    // ─── Cleanup ──────────────────────────────────────────────────────────

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    // ─── Load Single Section ─────────────────────────────────────────────

    const loadSection = useCallback(async (
        section: SectionConfig
    ): Promise<void> => {
        if (!isMounted.current) return;

        const { key, priority, label, fetchFn } = section;
        console.log(`🔄 [${priority}/5] Loading ${label}...`);
        setActiveSection(label);

        try {
            const response = await fetchFn(1, 10);
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
                loadStatus.current[key] = true;

                console.log(`✅ ${label} loaded: ${items.length} vehicles`);

                // Update progress
                const loadedCount = Object.values(loadStatus.current).filter(Boolean).length;
                setProgress((loadedCount / sections.length) * 100);
            }
        } catch (err) {
            console.error(`❌ ${label} load failed:`, err);
            if (isMounted.current) {
                setLoading(prev => ({
                    ...prev,
                    [key]: false,
                }));
                // Don't set global error for single section failure
            }
        }
    }, [sections.length]);

    // ─── Sequential Loading ──────────────────────────────────────────────

    const loadSequentially = useCallback(async () => {
        if (!isMounted.current) return;

        setError(null);
        setProgress(0);
        setIsComplete(false);
        console.log('🚀 Smart loading started...');
        console.time('Total Smart Load Time');

        // Load sections in priority order
        for (const section of sections) {
            await loadSection(section);

            // Small delay for UI to breathe
            if (section.priority < sections.length) {
                await new Promise(resolve => setTimeout(resolve, 150));
            }
        }

        // ─── Complete ──────────────────────────────────────────────────────

        if (isMounted.current) {
            setIsComplete(true);
            setProgress(100);
            setActiveSection(null);
            console.log('✅ All sections loaded!');
            console.timeEnd('Total Smart Load Time');

            // Log final stats
            const stats = sections.map(({ key, label }) => ({
                section: label,
                count: data[key as keyof LandingData].length,
            }));
            console.log('📊 Final Stats:', stats);
        }
    }, [loadSection, sections, data]);

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

    // ─── Refetch All ──────────────────────────────────────────────────────

    const refetch = useCallback(async () => {
        // Reset all loading states
        setLoading({
            featured: true,
            newlyArrived: true,
            premium: true,
            upcoming: true,
            used: true,
        });
        loadStatus.current = {
            featured: false,
            newlyArrived: false,
            premium: false,
            upcoming: false,
            used: false,
        };
        await loadSequentially();
    }, [loadSequentially]);

    // ─── Initial Load ─────────────────────────────────────────────────────

    useEffect(() => {
        loadSequentially();
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

        // Section-specific data (convenience)
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
        getSectionData: (section: keyof LandingData) => data[section],
        isSectionLoading: (section: keyof LandingData) => loading[section],
        getSectionCount: (section: keyof LandingData) => data[section].length,
    };
};

// ─── Type Guard ────────────────────────────────────────────────────────

export type UseSmartLandingDataReturn = ReturnType<typeof useSmartLandingData>;