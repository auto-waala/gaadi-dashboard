export interface TaxRateResponse {
  id: number;
  name: string;
  code: string;
  taxType?: string;
  country?: string;
  state?: string;
  city?: string;
  ratePercentage: number;
  isCompound: boolean;
  appliesToVehicleTypes?: string[];
  minPriceThreshold?: number;
  maxPriceThreshold?: number;
  effectiveFrom: string;
  effectiveTo?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}