import { WarrantyComparisonResult } from "./warrantyComparisonResult";
import { WarrantyTypeResponse } from "./warrantyTypeResponse";

export interface WarrantyComparison {
    warrantyA: WarrantyTypeResponse;
    warrantyB: WarrantyTypeResponse;
    comparison: WarrantyComparisonResult;
}