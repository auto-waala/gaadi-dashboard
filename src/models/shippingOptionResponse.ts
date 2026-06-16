export interface ShippingOptionResponse {
  id: number;
  name: string;
  code: string;
  description?: string;
  provider?: string;
  estimatedDaysMin?: number;
  estimatedDaysMax?: number;
  baseCost?: number;
  costPerKm?: number;
  isTrackingAvailable: boolean;
  isInsuranceAvailable: boolean;
  applicableVehicleTypes?: string[];
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}