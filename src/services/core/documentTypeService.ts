// services/documentTypeService.ts
import { DocumentTypeResponse } from "@/models/documentTypeResponse";
import { DocumentTypeCategory } from "@/models/documentTypeCategory";
import { apiClient } from "@/services/apiClient";

class DocumentTypeService {
    // Get all document types
    async getAllDocumentTypes(): Promise<DocumentTypeResponse[]> {
        const response = await apiClient.get<{ success: boolean; data: DocumentTypeResponse[] }>(
            '/document-types'
        );
        return response.data.data;
    }

    // Get document types by category
    async getDocumentTypesByCategory(): Promise<DocumentTypeCategory[]> {
        const response = await apiClient.get<{ success: boolean; data: DocumentTypeCategory[] }>(
            '/document-types/by-category'
        );
        return response.data.data;
    }

    // Get document type by ID
    async getDocumentTypeById(id: number): Promise<DocumentTypeResponse | null> {
        const response = await apiClient.get<{ success: boolean; data: DocumentTypeResponse }>(
            `/document-types/${id}`
        );
        return response.data.success ? response.data.data : null;
    }
}

export default new DocumentTypeService();