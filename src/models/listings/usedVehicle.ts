// models/usedVehicle.ts
import type { VehicleListing } from './vehicleListingResponse';

export interface UsedVehicle extends VehicleListing {
  ownerCount: number;
  kmDriven: number;
  registrationYear: number;
  registrationMonth: number;
  accidentalHistory: boolean;
  serviceHistoryAvailable: boolean;
  sellerType: 'dealer' | 'individual';
}

export interface UsedVehicleListResponse {
  isSuccess: boolean;
  message: string;
  statusCode: number;
  data: {
    items: UsedVehicle[];
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export interface UsedVehicleSingleResponse {
  isSuccess: boolean;
  message: string;
  statusCode: number;
  data: UsedVehicle;
}