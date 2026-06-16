// services/listing/usedVehicleService.ts
import apiClient from "@/services/apiClient";
import { ApiEndpoints } from "@/services/apiEndpoints";
import type {
  UsedVehicle,
  UsedVehicleListResponse,
  UsedVehicleSingleResponse
} from "@/models/listings/usedVehicle";

const replaceParams = (url: string, params: Record<string, string | number>): string => {
  let result = url;
  Object.entries(params).forEach(([key, value]) => {
    result = result.replace(`{${key}}`, String(value));
  });
  return result;
};

class UsedVehicleService {
  // Get all used vehicles
  async getUsedVehicles(page: number = 1, pageSize: number = 10): Promise<UsedVehicleListResponse['data']> {
    const response = await apiClient.get<UsedVehicleListResponse>(
      `${ApiEndpoints.UsedVehicles.Base}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // Get active used vehicles
  async getActiveUsedVehicles(page: number = 1, pageSize: number = 10): Promise<UsedVehicleListResponse['data']> {
    const response = await apiClient.get<UsedVehicleListResponse>(
      `${ApiEndpoints.UsedVehicles.Active}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // Get top priority used
  async getTopPriorityUsed(page: number = 1, pageSize: number = 10): Promise<UsedVehicleListResponse['data']> {
    const response = await apiClient.get<UsedVehicleListResponse>(
      `${ApiEndpoints.UsedVehicles.TopPriority}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // Get recent used
  async getRecentUsed(page: number = 1, pageSize: number = 10): Promise<UsedVehicleListResponse['data']> {
    const response = await apiClient.get<UsedVehicleListResponse>(
      `${ApiEndpoints.UsedVehicles.Recent}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // Get single by ID
  async getUsedVehicleById(id: string): Promise<UsedVehicle | null> {
    const url = replaceParams(ApiEndpoints.UsedVehicles.ById, { id });
    const response = await apiClient.get<UsedVehicleSingleResponse>(url);
    return response.data.isSuccess ? response.data.data : null;
  }

  // Get single by slug
  async getUsedVehicleBySlug(slug: string): Promise<UsedVehicle | null> {
    const url = replaceParams(ApiEndpoints.UsedVehicles.BySlug, { slug });
    const response = await apiClient.get<UsedVehicleSingleResponse>(url);
    return response.data.isSuccess ? response.data.data : null;
  }

  // Get used by model
  async getUsedByModel(modelSlug: string, page: number = 1, pageSize: number = 10): Promise<UsedVehicleListResponse['data']> {
    const url = replaceParams(ApiEndpoints.UsedVehicles.ByModel, { modelSlug });
    const response = await apiClient.get<UsedVehicleListResponse>(
      `${url}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // Get used by brand
  async getUsedByBrand(brandName: string, page: number = 1, pageSize: number = 10): Promise<UsedVehicleListResponse['data']> {
    const url = replaceParams(ApiEndpoints.UsedVehicles.ByBrand, { brandName });
    const response = await apiClient.get<UsedVehicleListResponse>(
      `${url}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // Get used by type
  async getUsedByType(vehicleType: string, page: number = 1, pageSize: number = 10): Promise<UsedVehicleListResponse['data']> {
    const url = replaceParams(ApiEndpoints.UsedVehicles.ByType, { vehicleType });
    const response = await apiClient.get<UsedVehicleListResponse>(
      `${url}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // Get used by city
  async getUsedByCity(city: string, page: number = 1, pageSize: number = 10): Promise<UsedVehicleListResponse['data']> {
    const url = replaceParams(ApiEndpoints.UsedVehicles.ByCity, { city });
    const response = await apiClient.get<UsedVehicleListResponse>(
      `${url}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // Get used by fuel type
  async getUsedByFuelType(fuelType: string, page: number = 1, pageSize: number = 10): Promise<UsedVehicleListResponse['data']> {
    const url = replaceParams(ApiEndpoints.UsedVehicles.ByFuelType, { fuelType });
    const response = await apiClient.get<UsedVehicleListResponse>(
      `${url}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // Get used by transmission
  async getUsedByTransmission(transmission: string, page: number = 1, pageSize: number = 10): Promise<UsedVehicleListResponse['data']> {
    const url = replaceParams(ApiEndpoints.UsedVehicles.ByTransmission, { transmission });
    const response = await apiClient.get<UsedVehicleListResponse>(
      `${url}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // Get used by seller type
  async getUsedBySellerType(sellerType: string, page: number = 1, pageSize: number = 10): Promise<UsedVehicleListResponse['data']> {
    const url = replaceParams(ApiEndpoints.UsedVehicles.BySellerType, { sellerType });
    const response = await apiClient.get<UsedVehicleListResponse>(
      `${url}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // Get used by seller
  async getUsedBySeller(sellerId: string, page: number = 1, pageSize: number = 10): Promise<UsedVehicleListResponse['data']> {
    const url = replaceParams(ApiEndpoints.UsedVehicles.BySeller, { sellerId });
    const response = await apiClient.get<UsedVehicleListResponse>(
      `${url}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // Get used statistics
  async getUsedStatistics(): Promise<any> {
    const response = await apiClient.get<{ isSuccess: boolean; data: any }>(
      ApiEndpoints.UsedVehicles.StatisticsCounts
    );
    return response.data.data;
  }

  // Search used vehicles
  async searchUsed(query: string, page: number = 1, pageSize: number = 10): Promise<UsedVehicleListResponse['data']> {
    const response = await apiClient.get<UsedVehicleListResponse>(
      `${ApiEndpoints.UsedVehicles.Search}?q=${encodeURIComponent(query)}&page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }
}

export default new UsedVehicleService();