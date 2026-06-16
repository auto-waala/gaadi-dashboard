
export interface WarrantyComparisonResult {
    sameDuration: boolean;
    sameTransferability: boolean;
    betterCoverage?: string;
    durationDifferenceMonths?: number;
    durationDifferenceKm?: number;
}
