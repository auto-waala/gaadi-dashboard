import { DocumentTypeResponse } from "./documentTypeResponse";

export interface DocumentTypeCategory {
  category: string;
  count: number;
  documentTypes: DocumentTypeResponse[];
}