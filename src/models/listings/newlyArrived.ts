// models/newlyArrived.ts
import type { VehicleListing } from './vehicleListingResponse';

export interface NewlyArrived extends VehicleListing {
  arrivalDate?: string;
  weekNumber?: number;
  monthNumber?: number;
  year?: number;
}

export interface NewlyArrivedListResponse {
  isSuccess: boolean;
  message: string;
  statusCode: number;
  data: {
    items: NewlyArrived[];
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export interface NewlyArrivedSingleResponse {
  isSuccess: boolean;
  message: string;
  statusCode: number;
  data: NewlyArrived;
}