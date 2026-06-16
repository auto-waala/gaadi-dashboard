
export interface FuelTypeResponse {
  id: number;
  name: string;
  code: string;
  description?: string;
  iconUrl?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}