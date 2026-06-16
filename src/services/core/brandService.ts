// services/brandService.ts
import { BrandResponse } from "@/models/brandResponse";
import { apiClient } from "@/services/apiClient";
import { ApiEndpoints } from "@/services/apiEndpoints";

class BrandService {
    // Get all brands
    async getAllBrands(): Promise<BrandResponse[]> {
        const response = await apiClient.get<{ success: boolean; data: BrandResponse[] }>(
            ApiEndpoints.Brands.Base
        );
        return response.data.data;
    }

    // Get active brands only
    async getActiveBrands(): Promise<BrandResponse[]> {
        const response = await apiClient.get<{ success: boolean; data: BrandResponse[] }>(
            ApiEndpoints.Brands.Active
        );
        return response.data.data;
    }

    // Get brand by ID
    async getBrandById(id: number): Promise<BrandResponse | null> {
        const url = ApiEndpoints.Brands.ById.replace('{brandId}', String(id));
        const response = await apiClient.get<{ success: boolean; data: BrandResponse }>(url);
        return response.data.success ? response.data.data : null;
    }

    // Get brands by category code
    async getBrandsByCategory(categoryCode: string): Promise<BrandResponse[]> {
        const url = ApiEndpoints.Brands.ByCategory.replace('{categoryCode}', categoryCode);
        const response = await apiClient.get<{ success: boolean; data: BrandResponse[] }>(url);
        return response.data.data;
    }

    // Get brands by country code
    async getBrandsByCountry(countryCode: string): Promise<BrandResponse[]> {
        const url = ApiEndpoints.Brands.ByCountry.replace('{countryCode}', countryCode);
        const response = await apiClient.get<{ success: boolean; data: BrandResponse[] }>(url);
        return response.data.data;
    }
}

export default new BrandService();