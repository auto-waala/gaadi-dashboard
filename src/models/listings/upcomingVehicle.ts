// models/upcomingVehicle.ts
import type { VehicleListing } from './vehicleListingResponse';

export interface UpcomingVehicle extends VehicleListing {
  launchDate?: string;
  launchPeriod?: 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'H1' | 'H2' | 'TBD';
  expectedPriceRange?: string;
  bookingStatus?: 'open' | 'coming_soon' | 'closed';
  bookingAmount?: number;
}

export interface UpcomingVehicleListResponse {
  isSuccess: boolean;
  message: string;
  statusCode: number;
  data: {
    items: UpcomingVehicle[];
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export interface UpcomingVehicleSingleResponse {
  isSuccess: boolean;
  message: string;
  statusCode: number;
  data: UpcomingVehicle;
}