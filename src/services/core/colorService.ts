// services/colorService.ts
import { ColorResponse } from "@/models/colorResponse";
import apiClient from "@/services/apiClient";
import { ApiEndpoints } from "@/services/apiEndpoints";

class ColorService {
    // Get all colors
    async getAllColors(): Promise<ColorResponse[]> {
        const response = await apiClient.get<{ success: boolean; data: ColorResponse[] }>(
            ApiEndpoints.Colors.Base
        );
        return response.data;
    }

    // Get active colors only
    async getActiveColors(): Promise<ColorResponse[]> {
        const response = await apiClient.get<{ success: boolean; data: ColorResponse[] }>(
            ApiEndpoints.Colors.Active
        );
        return response.data;
    }

    // Get ordered colors
    async getOrderedColors(): Promise<ColorResponse[]> {
        const response = await apiClient.get<{ success: boolean; data: ColorResponse[] }>(
            ApiEndpoints.Colors.Ordered
        );
        return response.data;
    }

    // Get color by ID
    async getColorById(id: number): Promise<ColorResponse | null> {
        const url = ApiEndpoints.Colors.ById.replace('{colorId}', String(id));
        const response = await apiClient.get<{ success: boolean; data: ColorResponse }>(url);
        return response.data.success ? response.data : null;
    }

    // Get color by code
    async getColorByCode(code: string): Promise<ColorResponse | null> {
        const url = ApiEndpoints.Colors.ByCode.replace('{code}', code);
        const response = await apiClient.get<{ success: boolean; data: ColorResponse }>(url);
        return response.data.success ? response.data : null;
    }
}

export default new ColorService();