export interface BrandResponse {
    id: number;
    name: string;
    code: string;
    slug: string;
    description?: string;
    logoUrl?: string;
    websiteUrl?: string;
    countryOfOrigin?: string;
    foundedYear?: number;
    applicableCategories?: string[];
    displayOrder: number;
    isActive: boolean;
    metadata?: Record<string, any>;
    createdAt: string;
    updatedAt: string;
}

