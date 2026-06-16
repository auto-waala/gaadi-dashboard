// services/listing/upcomingVehicleService.ts
import apiClient from "@/services/apiClient";
import { ApiEndpoints } from "@/services/apiEndpoints";
import type {
  UpcomingVehicle,
  UpcomingVehicleListResponse,
  UpcomingVehicleSingleResponse
} from "@/models/listings/upcomingVehicle";

const replaceParams = (url: string, params: Record<string, string | number>): string => {
  let result = url;
  Object.entries(params).forEach(([key, value]) => {
    result = result.replace(`{${key}}`, String(value));
  });
  return result;
};

class UpcomingVehicleService {
  // Get all upcoming vehicles
  async getUpcomingVehicles(page: number = 1, pageSize: number = 10): Promise<UpcomingVehicleListResponse['data']> {
    const response = await apiClient.get<UpcomingVehicleListResponse>(
      `${ApiEndpoints.UpcomingVehicle.Base}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // Get active upcoming
  async getActiveUpcoming(page: number = 1, pageSize: number = 10): Promise<UpcomingVehicleListResponse['data']> {
    const response = await apiClient.get<UpcomingVehicleListResponse>(
      `${ApiEndpoints.UpcomingVehicle.Active}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // Get featured upcoming
  async getFeaturedUpcoming(page: number = 1, pageSize: number = 10): Promise<UpcomingVehicleListResponse['data']> {
    const response = await apiClient.get<UpcomingVehicleListResponse>(
      `${ApiEndpoints.UpcomingVehicle.Featured}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // Get latest upcoming
  async getLatestUpcoming(page: number = 1, pageSize: number = 10): Promise<UpcomingVehicleListResponse['data']> {
    const response = await apiClient.get<UpcomingVehicleListResponse>(
      `${ApiEndpoints.UpcomingVehicle.Latest}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // Get upcoming launches
  async getUpcomingLaunches(page: number = 1, pageSize: number = 10): Promise<UpcomingVehicleListResponse['data']> {
    const response = await apiClient.get<UpcomingVehicleListResponse>(
      `${ApiEndpoints.UpcomingVehicle.UpcomingLaunches}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // Get single by ID
  async getUpcomingVehicleById(id: string): Promise<UpcomingVehicle | null> {
    const url = replaceParams(ApiEndpoints.UpcomingVehicle.ById, { id });
    const response = await apiClient.get<UpcomingVehicleSingleResponse>(url);
    return response.data.isSuccess ? response.data.data : null;
  }

  // Get single by slug
  async getUpcomingVehicleBySlug(slug: string): Promise<UpcomingVehicle | null> {
    const url = replaceParams(ApiEndpoints.UpcomingVehicle.BySlug, { slug });
    const response = await apiClient.get<UpcomingVehicleSingleResponse>(url);
    return response.data.isSuccess ? response.data.data : null;
  }

  // Get upcoming by model
  async getUpcomingByModel(modelSlug: string, page: number = 1, pageSize: number = 10): Promise<UpcomingVehicleListResponse['data']> {
    const url = replaceParams(ApiEndpoints.UpcomingVehicle.ByModel, { modelSlug });
    const response = await apiClient.get<UpcomingVehicleListResponse>(
      `${url}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // Get upcoming by brand
  async getUpcomingByBrand(brandName: string, page: number = 1, pageSize: number = 10): Promise<UpcomingVehicleListResponse['data']> {
    const url = replaceParams(ApiEndpoints.UpcomingVehicle.ByBrand, { brandName });
    const response = await apiClient.get<UpcomingVehicleListResponse>(
      `${url}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // Get upcoming by type
  async getUpcomingByType(vehicleType: string, page: number = 1, pageSize: number = 10): Promise<UpcomingVehicleListResponse['data']> {
    const url = replaceParams(ApiEndpoints.UpcomingVehicle.ByType, { vehicleType });
    const response = await apiClient.get<UpcomingVehicleListResponse>(
      `${url}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // Get upcoming by launch period
  async getUpcomingByLaunchPeriod(launchPeriod: string, page: number = 1, pageSize: number = 10): Promise<UpcomingVehicleListResponse['data']> {
    const url = replaceParams(ApiEndpoints.UpcomingVehicle.LaunchPeriod, { launchPeriod });
    const response = await apiClient.get<UpcomingVehicleListResponse>(
      `${url}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // Search upcoming
  async searchUpcoming(query: string, page: number = 1, pageSize: number = 10): Promise<UpcomingVehicleListResponse['data']> {
    const response = await apiClient.get<UpcomingVehicleListResponse>(
      `${ApiEndpoints.UpcomingVehicle.Search}?q=${encodeURIComponent(query)}&page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }
}

export default new UpcomingVehicleService();