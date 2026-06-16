export interface VehicleVariantResponse {
    id: number;
    modelId: number;
    modelName: string;
    modelCode: string;
    name: string;
    code: string;
    description?: string;
    fuelTypeId?: number;
    fuelTypeName?: string;
    transmissionId?: number;
    transmissionName?: string;
    driveType?: string;
    engineSize?: string;
    horsepower?: number;
    torque?: number;
    seatingCapacity?: number;
    doorsCount?: number;
    basePrice?: number;
    isAvailable: boolean;
    displayOrder: number;
    isActive: boolean;
    metadata?: Record<string, any>;
    createdAt: string;
    updatedAt: string;
}