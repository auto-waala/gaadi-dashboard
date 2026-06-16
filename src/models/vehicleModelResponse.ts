export interface VehicleModelResponse {
  id: number;
  brandId: number;
  brandName?: string;
  vehicleTypeId: number;
  vehicleTypeName?: string;
  name: string;
  code: string;
  slug: string;
  description?: string;
  startYear?: number;
  endYear?: number;
  isCurrentModel: boolean;
  imageUrl?: string;
  displayOrder: number;
  isActive: boolean;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}