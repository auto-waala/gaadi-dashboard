export interface VehicleTypeResponse {
  id: number;
  categoryId: number;
  categoryName?: string;
  name: string;
  code: string;
  slug: string;
  description?: string;
  iconUrl?: string;
  imageUrl?: string;
  displayOrder: number;
  isActive: boolean;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}