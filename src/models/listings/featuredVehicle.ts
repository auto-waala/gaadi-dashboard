// models/featuredVehicle.ts
import type { VehicleListing } from "./vehicleListingResponse";

export interface FeaturedVehicle extends VehicleListing {
    // Featured specific fields
    featuredType?: 'premium' | 'standard';
}

export interface FeaturedVehicleListResponse {
    isSuccess: boolean;
    message: string;
    statusCode: number;
    data: {
        items: FeaturedVehicle[];
        totalCount: number;
        page: number;
        pageSize: number;
        totalPages: number;
    };
}

export interface FeaturedVehicleSingleResponse {
    isSuccess: boolean;
    message: string;
    statusCode: number;
    data: FeaturedVehicle;
}