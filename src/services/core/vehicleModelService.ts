// services/vehicleModelService.ts
import { VehicleModelResponse } from "@/models/vehicleModelResponse";
import { apiClient } from "@/services/apiClient";

class VehicleModelService {
    // Get all vehicle models
    async getAllModels(): Promise<VehicleModelResponse[]> {
        const response = await apiClient.get<{ success: boolean; data: VehicleModelResponse[] }>(
            '/vehicle-models'
        );
        return response.data.data;
    }

    // Get models by brand ID
    async getModelsByBrand(brandId: number): Promise<VehicleModelResponse[]> {
        const response = await apiClient.get<{ success: boolean; data: VehicleModelResponse[] }>(
            `/vehicle-models/brand/${brandId}`
        );
        return response.data.data;
    }

    // Get model by ID
    async getModelById(id: number): Promise<VehicleModelResponse | null> {
        const response = await apiClient.get<{ success: boolean; data: VehicleModelResponse }>(
            `/vehicle-models/${id}`
        );
        return response.data.success ? response.data.data : null;
    }

    // Get models by vehicle type
    async getModelsByVehicleType(vehicleTypeId: number): Promise<VehicleModelResponse[]> {
        const response = await apiClient.get<{ success: boolean; data: VehicleModelResponse[] }>(
            `/vehicle-models/vehicle-type/${vehicleTypeId}`
        );
        return response.data.data;
    }
}

export default new VehicleModelService();