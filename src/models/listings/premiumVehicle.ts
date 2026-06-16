// models/premiumVehicle.ts
import type { VehicleListing } from './vehicleListingResponse';

export interface PremiumVehicle extends VehicleListing {
  premiumType?: 'platinum' | 'gold' | 'silver';
  premiumFeatures?: string[];
}

export interface PremiumVehicleListResponse {
  isSuccess: boolean;
  message: string;
  statusCode: number;
  data: {
    items: PremiumVehicle[];
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export interface PremiumVehicleSingleResponse {
  isSuccess: boolean;
  message: string;
  statusCode: number;
  data: PremiumVehicle;
}