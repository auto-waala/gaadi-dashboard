export interface FeatureResponse {
  id: number;
  name: string;
  code: string;
  category?: string;
  subCategory?: string;
  iconUrl?: string;
  applicableCategories?: string[];
  isStandard: boolean;
  displayOrder: number;
  isActive: boolean;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}
