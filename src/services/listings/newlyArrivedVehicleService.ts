// services/listing/newlyArrivedService.ts
import apiClient from "@/services/apiClient";
import { ApiEndpoints } from "@/services/apiEndpoints";
import type {
  NewlyArrived,
  NewlyArrivedListResponse,
  NewlyArrivedSingleResponse
} from "@/models/listings/newlyArrived";

const replaceParams = (url: string, params: Record<string, string | number>): string => {
  let result = url;
  Object.entries(params).forEach(([key, value]) => {
    result = result.replace(`{${key}}`, String(value));
  });
  return result;
};

class NewlyArrivedService {
  // Get all newly arrived
  async getNewlyArrived(page: number = 1, pageSize: number = 10): Promise<NewlyArrivedListResponse['data']> {
    const response = await apiClient.get<NewlyArrivedListResponse>(
      `${ApiEndpoints.NewlyArrived.Base}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // Get weekly arrivals
  async getWeeklyArrivals(page: number = 1, pageSize: number = 10): Promise<NewlyArrivedListResponse['data']> {
    const response = await apiClient.get<NewlyArrivedListResponse>(
      `${ApiEndpoints.NewlyArrived.Weekly}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // Get monthly arrivals
  async getMonthlyArrivals(page: number = 1, pageSize: number = 10): Promise<NewlyArrivedListResponse['data']> {
    const response = await apiClient.get<NewlyArrivedListResponse>(
      `${ApiEndpoints.NewlyArrived.Monthly}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // Get yearly arrivals
  async getYearlyArrivals(year: number, page: number = 1, pageSize: number = 10): Promise<NewlyArrivedListResponse['data']> {
    const url = replaceParams(ApiEndpoints.NewlyArrived.Yearly, { year });
    const response = await apiClient.get<NewlyArrivedListResponse>(
      `${url}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // Get current year arrivals
  async getCurrentYearArrivals(page: number = 1, pageSize: number = 10): Promise<NewlyArrivedListResponse['data']> {
    const response = await apiClient.get<NewlyArrivedListResponse>(
      `${ApiEndpoints.NewlyArrived.CurrentYear}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // Get featured newly arrived
  async getFeaturedNewArrivals(page: number = 1, pageSize: number = 10): Promise<NewlyArrivedListResponse['data']> {
    const response = await apiClient.get<NewlyArrivedListResponse>(
      `${ApiEndpoints.NewlyArrived.Featured}?page=${page}&pageSize=${pageSize}`
    );
    return response.data.data;
  }

  // Get single by ID
  async getNewlyArrivedById(id: string): Promise<NewlyArrived | null> {
    const url = replaceParams(ApiEndpoints.NewlyArrived.ById, { id });
    const response = await apiClient.get<NewlyArrivedSingleResponse>(url);
    return response.data.isSuccess ? response.data.data : null;
  }

  // Get single by slug
  async getNewlyArrivedBySlug(slug: string): Promise<NewlyArrived | null> {
    const url = replaceParams(ApiEndpoints.NewlyArrived.BySlug, { slug });
    const response = await apiClient.get<NewlyArrivedSingleResponse>(url);
    return response.data.isSuccess ? response.data.data : null;
  }
}

export default new NewlyArrivedService();