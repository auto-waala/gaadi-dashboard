// services/listing/premiumVehicleService.ts
import apiClient from "@/services/apiClient";
import { ApiEndpoints } from "@/services/apiEndpoints";
import type {
  PremiumVehicle,
  PremiumVehicleListResponse,
  PremiumVehicleSingleResponse
} from "@/models/listings/premiumVehicle";

const replaceParams = (url: string, params: Record<string, string | number>): string => {
  let result = url;
  Object.entries(params).forEach(([key, value]) => {
    result = result.replace(`{${key}}`, String(value));
  });
  return result;
};

class PremiumVehicleService {
  // Get all premium vehicles
  async getPremiumVehicles(page: number = 1, pageSize: number = 10): Promise<PremiumVehicleListResponse['data']> {
    const response = await apiClient.get<PremiumVehicleListResponse>(
      `${ApiEndpoints.PremiumVehicle.Base}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // Get active premium vehicles
  async getActivePremiumVehicles(page: number = 1, pageSize: number = 10): Promise<PremiumVehicleListResponse['data']> {
    const response = await apiClient.get<PremiumVehicleListResponse>(
      `${ApiEndpoints.PremiumVehicle.Active}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // Get top priority premium
  async getTopPriorityPremium(page: number = 1, pageSize: number = 10): Promise<PremiumVehicleListResponse['data']> {
    const response = await apiClient.get<PremiumVehicleListResponse>(
      `${ApiEndpoints.PremiumVehicle.TopPriority}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // Get single by ID
  async getPremiumVehicleById(id: string): Promise<PremiumVehicle | null> {
    const url = replaceParams(ApiEndpoints.PremiumVehicle.ById, { id });
    const response = await apiClient.get<PremiumVehicleSingleResponse>(url);
    return response.data.isSuccess ? response.data.data : null;
  }

  // Get single by slug
  async getPremiumVehicleBySlug(slug: string): Promise<PremiumVehicle | null> {
    const url = replaceParams(ApiEndpoints.PremiumVehicle.BySlug, { slug });
    const response = await apiClient.get<PremiumVehicleSingleResponse>(url);
    return response.data.isSuccess ? response.data.data : null;
  }

  // Get premium by model
  async getPremiumByModel(modelSlug: string, page: number = 1, pageSize: number = 10): Promise<PremiumVehicleListResponse['data']> {
    const url = replaceParams(ApiEndpoints.PremiumVehicle.ByModel, { modelSlug });
    const response = await apiClient.get<PremiumVehicleListResponse>(
      `${url}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // Get premium by brand
  async getPremiumByBrand(brandName: string, page: number = 1, pageSize: number = 10): Promise<PremiumVehicleListResponse['data']> {
    const url = replaceParams(ApiEndpoints.PremiumVehicle.ByBrand, { brandName });
    const response = await apiClient.get<PremiumVehicleListResponse>(
      `${url}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // Get premium by type
  async getPremiumByType(vehicleType: string, page: number = 1, pageSize: number = 10): Promise<PremiumVehicleListResponse['data']> {
    const url = replaceParams(ApiEndpoints.PremiumVehicle.ByType, { vehicleType });
    const response = await apiClient.get<PremiumVehicleListResponse>(
      `${url}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // Get premium by city
  async getPremiumByCity(city: string, page: number = 1, pageSize: number = 10): Promise<PremiumVehicleListResponse['data']> {
    const url = replaceParams(ApiEndpoints.PremiumVehicle.ByCity, { city });
    const response = await apiClient.get<PremiumVehicleListResponse>(
      `${url}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // Search premium vehicles
  async searchPremium(query: string, page: number = 1, pageSize: number = 10): Promise<PremiumVehicleListResponse['data']> {
    const response = await apiClient.get<PremiumVehicleListResponse>(
      `${ApiEndpoints.PremiumVehicle.Search}?q=${encodeURIComponent(query)}&page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }
}

export default new PremiumVehicleService();