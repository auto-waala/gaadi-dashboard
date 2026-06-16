export interface ServiceTypeResponse {
  id: number;
  name: string;
  code: string;
  category?: string;
  intervalMonths?: number;
  intervalKm?: number;
  description?: string;
  iconUrl?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}