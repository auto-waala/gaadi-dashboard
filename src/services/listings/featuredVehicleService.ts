// services/listing/featuredVehicleService.ts
import apiClient from "@/services/apiClient";
import { ApiEndpoints } from "@/services/apiEndpoints";
import type {
  FeaturedVehicle,
  FeaturedVehicleListResponse,
  FeaturedVehicleSingleResponse
} from "@/models/listings/featuredVehicle";

// ─── Helper to replace URL params ──────────────────────────────────────

const replaceParams = (url: string, params: Record<string, string | number>): string => {
  let result = url;
  Object.entries(params).forEach(([key, value]) => {
    result = result.replace(`{${key}}`, String(value));
  });
  return result;
};

class FeaturedVehicleService {
  // ─── List Endpoints ────────────────────────────────────────────────────

  // Get all featured vehicles (with pagination)
  async getFeaturedVehicles(page: number = 1, pageSize: number = 10): Promise<FeaturedVehicleListResponse['data']> {
    const response = await apiClient.get<FeaturedVehicleListResponse>(
      `${ApiEndpoints.FeaturedVehicle.Base}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // Get active featured vehicles
  async getActiveFeaturedVehicles(page: number = 1, pageSize: number = 10): Promise<FeaturedVehicleListResponse['data']> {
    const response = await apiClient.get<FeaturedVehicleListResponse>(
      `${ApiEndpoints.FeaturedVehicle.Active}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // Get top priority featured vehicles
  async getTopPriorityFeatured(page: number = 1, pageSize: number = 10): Promise<FeaturedVehicleListResponse['data']> {
    const response = await apiClient.get<FeaturedVehicleListResponse>(
      `${ApiEndpoints.FeaturedVehicle.TopPriority}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // ─── Single Item Endpoints ────────────────────────────────────────────

  // Get featured vehicle by ID
  async getFeaturedVehicleById(id: string): Promise<FeaturedVehicle | null> {
    const url = replaceParams(ApiEndpoints.FeaturedVehicle.ById, { id });
    const response = await apiClient.get<FeaturedVehicleSingleResponse>(url);
    return response.data.isSuccess ? response.data.data : null;
  }

  // Get featured vehicle by slug
  async getFeaturedVehicleBySlug(slug: string): Promise<FeaturedVehicle | null> {
    const url = replaceParams(ApiEndpoints.FeaturedVehicle.BySlug, { slug });
    const response = await apiClient.get<FeaturedVehicleSingleResponse>(url);
    return response.data.isSuccess ? response.data.data : null;
  }

  // ─── Filter Endpoints ──────────────────────────────────────────────────

  // Get featured by model slug
  async getFeaturedByModel(modelSlug: string, page: number = 1, pageSize: number = 10): Promise<FeaturedVehicleListResponse['data']> {
    const url = replaceParams(ApiEndpoints.FeaturedVehicle.ByModel, { modelSlug });
    const response = await apiClient.get<FeaturedVehicleListResponse>(
      `${url}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // Get featured by brand name
  async getFeaturedByBrand(brandName: string, page: number = 1, pageSize: number = 10): Promise<FeaturedVehicleListResponse['data']> {
    const url = replaceParams(ApiEndpoints.FeaturedVehicle.ByBrand, { brandName });
    const response = await apiClient.get<FeaturedVehicleListResponse>(
      `${url}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // Get featured by vehicle type
  async getFeaturedByType(vehicleType: string, page: number = 1, pageSize: number = 10): Promise<FeaturedVehicleListResponse['data']> {
    const url = replaceParams(ApiEndpoints.FeaturedVehicle.ByType, { vehicleType });
    const response = await apiClient.get<FeaturedVehicleListResponse>(
      `${url}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // Get featured by city
  async getFeaturedByCity(city: string, page: number = 1, pageSize: number = 10): Promise<FeaturedVehicleListResponse['data']> {
    const url = replaceParams(ApiEndpoints.FeaturedVehicle.ByCity, { city });
    const response = await apiClient.get<FeaturedVehicleListResponse>(
      `${url}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // Get featured by price range
  async getFeaturedByPriceRange(min: number, max: number, page: number = 1, pageSize: number = 10): Promise<FeaturedVehicleListResponse['data']> {
    const response = await apiClient.get<FeaturedVehicleListResponse>(
      `${ApiEndpoints.FeaturedVehicle.PriceRange}?min=${min}&max=${max}&page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // ─── Search ─────────────────────────────────────────────────────────────

  async searchFeatured(query: string, page: number = 1, pageSize: number = 10): Promise<FeaturedVehicleListResponse['data']> {
    const response = await apiClient.get<FeaturedVehicleListResponse>(
      `${ApiEndpoints.FeaturedVehicle.Search}?q=${encodeURIComponent(query)}&page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }
}

export default new FeaturedVehicleService();