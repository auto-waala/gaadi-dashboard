export interface TransmissionResponse {
  id: number;
  name: string;
  code: string;
  description?: string;
  gearsCount?: number;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}