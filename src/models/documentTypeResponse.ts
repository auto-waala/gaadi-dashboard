
export interface DocumentTypeResponse {
    id: number;
    name: string;
    code: string;
    category?: string;
    isRequired: boolean;
    isVerifiable: boolean;
    expiryMonths?: number;
    applicableVehicleTypes?: string[];
    displayOrder: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}