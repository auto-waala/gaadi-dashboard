export interface PaymentMethodResponse {
  id: number;
  name: string;
  code: string;
  type?: string;
  iconUrl?: string;
  processingFeePercentage?: number;
  processingFeeFixed?: number;
  settlementDays?: number;
  isInstant: boolean;
  isAvailableForSellers: boolean;
  isAvailableForBuyers: boolean;
  displayOrder: number;
  isActive: boolean;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}