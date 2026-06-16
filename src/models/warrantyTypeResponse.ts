export interface WarrantyTypeResponse {
    id: number;
    name: string;
    code: string;
    description?: string;
    durationMonths?: number;
    durationKm?: number;
    formattedDuration?: string;
    isTransferable: boolean;
    applicableCategories?: string[];
    displayOrder: number;
    isActive: boolean;
    metadata?: Record<string, any>;
    createdAt: string;
    updatedAt: string;
}