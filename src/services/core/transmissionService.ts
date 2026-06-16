// services/transmissionService.ts
import { TransmissionResponse } from "@/models/transmissionResponse";
import { apiClient } from "@/services/apiClient";
import { ApiEndpoints } from "@/services/apiEndpoints";

class TransmissionService {
    // Get all transmissions
    async getAllTransmissions(): Promise<TransmissionResponse[]> {
        const response = await apiClient.get<{ success: boolean; data: TransmissionResponse[] }>(
            ApiEndpoints.Transmissions.Base
        );
        return response.data.data;
    }

    // Get transmission by ID
    async getTransmissionById(id: number): Promise<TransmissionResponse | null> {
        const url = ApiEndpoints.Transmissions.ById.replace('{id}', String(id));
        const response = await apiClient.get<{ success: boolean; data: TransmissionResponse }>(url);
        return response.data.success ? response.data.data : null;
    }

    // Get transmission by code
    async getTransmissionByCode(code: string): Promise<TransmissionResponse | null> {
        const url = ApiEndpoints.Transmissions.ByCode.replace('{code}', code);
        const response = await apiClient.get<{ success: boolean; data: TransmissionResponse }>(url);
        return response.data.success ? response.data.data : null;
    }

    // Get transmissions by gears count
    async getTransmissionsByGears(gearsCount: number): Promise<TransmissionResponse[]> {
        const url = ApiEndpoints.Transmissions.ByGears.replace('{gearsCount}', String(gearsCount));
        const response = await apiClient.get<{ success: boolean; data: TransmissionResponse[] }>(url);
        return response.data.data;
    }

    // Get automatic transmissions only
    async getAutomaticTransmissions(): Promise<TransmissionResponse[]> {
        const response = await apiClient.get<{ success: boolean; data: TransmissionResponse[] }>(
            ApiEndpoints.Transmissions.Automatic
        );
        return response.data.data;
    }

    // Get manual transmissions only
    async getManualTransmissions(): Promise<TransmissionResponse[]> {
        const response = await apiClient.get<{ success: boolean; data: TransmissionResponse[] }>(
            ApiEndpoints.Transmissions.Manual
        );
        return response.data.data;
    }
}

export default new TransmissionService();