// hooks/useCoreData.ts (Alternative with placeholderData)
import { useQuery } from "@tanstack/react-query";
import brandService from "@/services/core/brandService";
import categoryService from "@/services/core/categoryService";
import colorService from "@/services/core/colorService";
import fuelTypeService from "@/services/core/fuelTypeService";
import transmissionService from "@/services/core/transmissionService";
import vehicleTypeService from "@/services/core/vehicleTypeService";

export const coreDataKeys = {
  all: ['coreData'] as const,
};

// Get cached data from localStorage
const getCachedData = () => {
  const cached = localStorage.getItem('core-data-cache');
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      const isValid = parsed.timestamp && (Date.now() - parsed.timestamp) < 30 * 60 * 1000;
      if (isValid && parsed.data) {
        console.log('Found cached core data');
        return parsed.data;
      }
    } catch (e) {}
  }
  return null;
};

// Background fetch WITHOUT blocking UI
export const useCoreData = () => {
  return useQuery({
    queryKey: coreDataKeys.all,
    queryFn: async () => {
      console.log('Background: Loading core data...');
      
      const [
        brands,
        categories,
        colors,
        fuelTypes,
        transmissions,
        vehicleTypes,
      ] = await Promise.allSettled([
        brandService.getAllBrands(),
        categoryService.getAllCategories(),
        colorService.getAllColors(),
        fuelTypeService.getAllFuelTypes(),
        transmissionService.getAllTransmissions(),
        vehicleTypeService.getAllVehicleTypes(),
      ]);

      const result = {
        brands: brands.status === 'fulfilled' ? brands.value : [],
        categories: categories.status === 'fulfilled' ? categories.value : [],
        colors: colors.status === 'fulfilled' ? colors.value : [],
        fuelTypes: fuelTypes.status === 'fulfilled' ? fuelTypes.value : [],
        transmissions: transmissions.status === 'fulfilled' ? transmissions.value : [],
        vehicleTypes: vehicleTypes.status === 'fulfilled' ? vehicleTypes.value : [],
      };

      // Cache to localStorage
      localStorage.setItem('core-data-cache', JSON.stringify({
        data: result,
        timestamp: Date.now(),
      }));

      console.log('Background: Core data loaded', {
        brands: result.brands.length,
        categories: result.categories.length,
      });

      return result;
    },
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
    // Use placeholderData to show cached data immediately
    placeholderData: getCachedData(),
  });
};

export const useBrands = () => {
  const { data } = useCoreData();
  return data?.brands || [];
};

export const useCategories = () => {
  const { data } = useCoreData();
  return data?.categories || [];
};

export const useMainCategories = () => {
  const { data } = useCoreData();
  return data?.categories?.filter(cat => !cat.parentCategoryId) || [];
};

export const useColors = () => {
  const { data } = useCoreData();
  return data?.colors || [];
};

export const useFuelTypes = () => {
  const { data } = useCoreData();
  return data?.fuelTypes || [];
};

export const useTransmissions = () => {
  const { data } = useCoreData();
  return data?.transmissions || [];
};

export const useVehicleTypes = () => {
  const { data } = useCoreData();
  return data?.vehicleTypes || [];
};