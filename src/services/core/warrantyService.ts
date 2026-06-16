// services/warrantyService.ts
import { WarrantyTypeResponse } from "@/models/warrantyTypeResponse";
import {  WarrantyComparison } from "@/models/warrantyComparison";
import { apiClient } from "@/services/apiClient";

class WarrantyService {
    // Get all warranties
    async getAllWarranties(): Promise<WarrantyTypeResponse[]> {
        const response = await apiClient.get<{ success: boolean; data: WarrantyTypeResponse[] }>(
            '/warranties'
        );
        return response.data.data;
    }

    // Get warranty by ID
    async getWarrantyById(id: number): Promise<WarrantyTypeResponse | null> {
        const response = await apiClient.get<{ success: boolean; data: WarrantyTypeResponse }>(
            `/warranties/${id}`
        );
        return response.data.success ? response.data.data : null;
    }

    // Compare two warranties
    async compareWarranties(warrantyIdA: number, warrantyIdB: number): Promise<WarrantyComparison> {
        const response = await apiClient.get<{ success: boolean; data: WarrantyComparison }>(
            `/warranties/compare/${warrantyIdA}/${warrantyIdB}`
        );
        return response.data.data;
    }
}

export default new WarrantyService();