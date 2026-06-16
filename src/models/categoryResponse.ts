export interface CategoryResponse {
    id: number;
    name: string;
    code: string;
    slug: string;
    description?: string;
    iconUrl?: string;
    imageUrl?: string;
    parentCategoryId?: number;
    parentCategoryName?: string;
    displayOrder: number;
    isActive: boolean;
    metadata?: Record<string, any>;
    createdAt: string;
    updatedAt: string;
    subCategories?: CategoryResponse[];
}