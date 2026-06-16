export interface TitleTypeResponse {
  id: number;
  name: string;
  code: string;
  description?: string;
  isClean: boolean;
  affectsValue: boolean;
  valueDeductionPercentage?: number;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
