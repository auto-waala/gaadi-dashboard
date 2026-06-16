import { CityArea } from "./cityArea";

export interface LocationResponse {
    id: number;
    countryName: string;
    countryCode: string;
    stateName: string;
    stateCode: string;
    cityName: string;
    district?: string;
    pincode?: string;
    latitude?: number;
    longitude?: number;
    areas?: CityArea[];
}