// services/vehicleTypeService.ts
import { VehicleTypeResponse } from "@/models/vehicleTypeResponse";
import apiClient from "@/services/apiClient";
import { ApiEndpoints } from "@/services/apiEndpoints";

class VehicleTypeService {
    // Get all vehicle types
    async getAllVehicleTypes(): Promise<VehicleTypeResponse[]> {
        const response = await apiClient.get<{ success: boolean; data: VehicleTypeResponse[] }>(
            ApiEndpoints.VehicleTypes.Base
        );
        return response.data;
    }

    // Get vehicle type by ID
    async getVehicleTypeById(id: number): Promise<VehicleTypeResponse | null> {
        const url = ApiEndpoints.VehicleTypes.ById.replace('{id}', String(id));
        const response = await apiClient.get<{ success: boolean; data: VehicleTypeResponse }>(url);
        return response.data.success ? response.data : null;
    }
}

export default new VehicleTypeService();