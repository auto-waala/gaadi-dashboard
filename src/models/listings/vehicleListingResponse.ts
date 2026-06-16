// models/vehicleListing.ts
export interface Price {
  amount: number;
  currency: string;
  negotiable: boolean;
  onRoadPrice: number;
  formattedPrice: string;
  formattedOnRoadPrice: string;
}

export interface Image {
  fileId: string;
  fileUrl: string;
  isPrimary: boolean;
}

export interface Video {
  fileUrl: string;
}

export interface Short {
  fileUrl: string;
}

export interface Variant {
  color: string;
  colorCode: string;
  engine: string;
  transmission: string;
  fuelType: string;
  mileage: string;
  yearOfManufacture: string;
}

export interface KeySpecifications {
  engine: string;
  transmission: string;
  fuelType: string;
  mileage: string;
  yearOfManufacture: string;
}

export interface Feature {
  feature: string;
}

export interface ProCon {
  pro: string;
  con: string;
}

export interface Tag {
  tagName: string;
}

export interface UserRating {
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Seller {
  userId: string;
  name: string;
  phone: string;
  email: string;
  sellerType: string;
  dealerId: string;
  location: string;
  chatEnabled: boolean;
  callEnabled: boolean;
  isVerified: boolean;
}

export interface Location {
  city: string;
  state: string;
  pincode: string;
  latitude: string;
  longitude: string;
  fullAddress: string;
}

export interface Condition {
  isNew: boolean;
  ownerCount: number;
  kmDriven: number;
  accidental: boolean;
  serviceHistoryAvailable: boolean;
  registrationYear: number;
  registrationMonth: number;
  conditionStatus: 'New' | 'Used' | 'Certified' | 'Accidental';
}

export interface ListingDetails {
  isAvailable: boolean;
  isFeatured: boolean;
  isSold: boolean;
  postedDate: string;
  expiryDate?: string;
  isVerified: boolean;
  verifiedBy?: string;
  verificationDate?: string;
  daysListed: number;
}

export interface Engagement {
  views: number;
  likes: number;
  shares: number;
  enquiries: number;
  engagementRate: number;
}

export interface ShareUrls {
  facebook: string;
  twitter: string;
  whatsApp: string;
  linkedIn: string;
}

export interface TestDrive {
  available: boolean;
  bookingAmount: number;
}

export interface VehicleListing {
  id: string;
  title: string;
  descriptions: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  brandName: string;
  modelName: string;
  modelSlug: string;
  vehicleType: string;
  bodyType: string;
  price: Price;
  priceRange: string;
  priceRangeFrom: string;
  priceRangeTo: string;
  images: Image[];
  videos: Video[];
  shorts: Short[];
  thumbnailImage: string;
  thumbnailWebp: string;
  variants: Variant[];
  keySpecifications: KeySpecifications;
  topFeatures: Feature[];
  standOutFeatures: Feature[];
  pros: ProCon[];
  cons: ProCon[];
  tags: Tag[];
  rating: number;
  reviewCount: number;
  userRatings: UserRating[];
  seller: Seller;
  location: Location;
  condition: Condition;
  listingDetails: ListingDetails;
  engagement: Engagement;
  shareUrls: ShareUrls;
  badges: string[];
  highlight: string;
  testDrive: TestDrive;
  priority: number;
  isActive: boolean;
  isFeatured: boolean;
  startDate: string;
  endDate?: string;
  isExpired: boolean;
  createdAt: string;
  updatedAt: string;
}