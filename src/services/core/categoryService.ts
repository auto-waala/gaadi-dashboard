// services/categoryService.ts
import { CategoryResponse } from "@/models/categoryResponse";
import { CategoryTree } from "@/models/categoryTree";
import apiClient from "@/services/apiClient";
import { ApiEndpoints } from "@/services/apiEndpoints";

class CategoryService {
    // Get all categories
    async getAllCategories(): Promise<CategoryResponse[]> {
        const response = await apiClient.get<{ success: boolean; data: CategoryResponse[] }>(
            ApiEndpoints.Categories.Base
        );
        return response.data;
    }

    // Get active categories only
    async getActiveCategories(): Promise<CategoryResponse[]> {
        const response = await apiClient.get<{ success: boolean; data: CategoryResponse[] }>(
            ApiEndpoints.Categories.Active
        );
        return response.data;
    }

    // Get main categories
    async getMainCategories(): Promise<CategoryResponse[]> {
        const response = await apiClient.get<{ success: boolean; data: CategoryResponse[] }>(
            ApiEndpoints.Categories.Main
        );
        return response.data;
    }

    // Get category tree
    async getCategoryTree(): Promise<CategoryTree[]> {
        const response = await apiClient.get<{ success: boolean; data: CategoryTree[] }>(
            ApiEndpoints.Categories.Tree
        );
        return response.data;
    }

    // Get category by ID
    async getCategoryById(id: number): Promise<CategoryResponse | null> {
        const url = ApiEndpoints.Categories.ById.replace('{categoryId}', String(id));
        const response = await apiClient.get<{ success: boolean; data: CategoryResponse }>(url);
        return response.data.success ? response.data : null;
    }

    // Get category by code
    async getCategoryByCode(code: string): Promise<CategoryResponse | null> {
        const url = ApiEndpoints.Categories.ByCode.replace('{code}', code);
        const response = await apiClient.get<{ success: boolean; data: CategoryResponse }>(url);
        return response.data.success ? response.data : null;
    }

    // Get category by slug
    async getCategoryBySlug(slug: string): Promise<CategoryResponse | null> {
        const url = ApiEndpoints.Categories.BySlug.replace('{slug}', slug);
        const response = await apiClient.get<{ success: boolean; data: CategoryResponse }>(url);
        return response.data.success ? response.data : null;
    }

    // Get subcategories by parent category ID
    async getSubCategories(parentId: number): Promise<CategoryResponse[]> {
        const url = ApiEndpoints.Categories.SubCategories.replace('{parentCategoryId}', String(parentId));
        const response = await apiClient.get<{ success: boolean; data: CategoryResponse[] }>(url);
        return response.data.success ? response.data : [];
    }
}

export default new CategoryService();