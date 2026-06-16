// services/fuelTypeService.ts
import { FuelTypeResponse } from "@/models/fuelTypeResponse";
import { apiClient } from "@/services/apiClient";
import { ApiEndpoints } from "@/services/apiEndpoints";

class FuelTypeService {
    // Get all fuel types
    async getAllFuelTypes(): Promise<FuelTypeResponse[]> {
        const response = await apiClient.get<{ success: boolean; data: FuelTypeResponse[] }>(
            ApiEndpoints.FuelTypes.Base
        );
        return response.data.data;
    }

    // Get fuel type by ID
    async getFuelTypeById(id: number): Promise<FuelTypeResponse | null> {
        const url = ApiEndpoints.FuelTypes.ById.replace('{id}', String(id));
        const response = await apiClient.get<{ success: boolean; data: FuelTypeResponse }>(url);
        return response.data.success ? response.data.data : null;
    }

    // Get fuel type by code
    async getFuelTypeByCode(code: string): Promise<FuelTypeResponse | null> {
        const url = ApiEndpoints.FuelTypes.ByCode.replace('{code}', code);
        const response = await apiClient.get<{ success: boolean; data: FuelTypeResponse }>(url);
        return response.data.success ? response.data.data : null;
    }
}

export default new FuelTypeService();