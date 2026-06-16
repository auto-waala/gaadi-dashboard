export interface InspectionChecklistResponse {
  id: number;
  name: string;
  code: string;
  category?: string;
  applicableVehicleTypes?: string[];
  isCritical: boolean;
  weightage: number;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}