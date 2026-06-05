// Rich vehicle detail object shape (matches API response)
export type VehicleDetails = {
  id: string;
  title: string;
  descriptions?: string;
  slug?: string;
  metaTitle?: string;
  metaDescription?: string;
  brandName?: string;
  modelName?: string;
  modelSlug?: string;
  vehicleType?: string;
  bodyType?: string;
  launchDate?: string;
  launchPeriod?: string;
  isFeatured?: boolean;
  expectedStatus?: string;
  price?: {
    amount?: number;
    currency?: string;
    negotiable?: boolean;
    onRoadPrice?: number;
    formattedPrice?: string;
    formattedOnRoadPrice?: string;
  };
  priceRange?: string;
  priceRangeFrom?: string;
  priceRangeTo?: string;
  images?: string[];
  videos?: string[];
  shorts?: string[];
  thumbnailImage?: string;
  variants?: { name?: string; price?: string }[];
  keySpecifications?: {
    engine?: string;
    transmission?: string;
    fuelType?: string;
    mileage?: string;
    yearOfManufacture?: string;
    [k: string]: string | undefined;
  };
  topFeatures?: { feature: string }[];
  standOutFeatures?: { feature: string }[];
  pros?: { pro?: string; con?: string }[];
  cons?: { con: string }[];
  tags?: { tagName: string }[];
  rating?: number;
  reviewCount?: number;
  userRatings?: { user?: string; rating?: number; comment?: string }[];
  seller?: {
    userId?: string;
    name?: string;
    phone?: string;
    email?: string;
    sellerType?: string;
    chatEnabled?: boolean;
    callEnabled?: boolean;
    isVerified?: boolean;
  };
  location?: {
    city?: string;
    state?: string;
    pincode?: string;
    fullAddress?: string;
  };
  condition?: {
    isNew?: boolean;
    ownerCount?: number;
    kmDriven?: number;
    accidental?: boolean;
    serviceHistoryAvailable?: boolean;
    conditionStatus?: string;
  };
  listingDetails?: {
    isAvailable?: boolean;
    isPremium?: boolean;
    isSold?: boolean;
    postedDate?: string;
    expiryDate?: string;
    isVerified?: boolean;
    verifiedBy?: string;
    daysListed?: number;
  };
  engagement?: {
    views?: number;
    likes?: number;
    shares?: number;
    enquiries?: number;
    engagementRate?: number;
  };
  badges?: string[];
  highlight?: string;
  testDrive?: { available?: boolean; bookingAmount?: number };
};

// Sample rich record (matches API shape provided by the user)
export const sampleVehicleDetails: Record<string, VehicleDetails> = {
  "u-tvs-apache-rr-450": {
    id: "6a18e9136c35a3bd92dbff2d",
    title: "TVS Apache RR 450 (Apache RR 420)",
    descriptions:
      "TVS is expected to unveil a new fully-faired sports bike based on its 420cc platform. Likely to be called the Apache RR 420 or RR 450, this model will bring a larger engine and more performance to the popular Apache RR series.",
    slug: "tvs-apache-rr-450-2026",
    metaTitle: "TVS Apache RR 450 Sports Bike Launching 2026",
    metaDescription:
      "TVS Apache RR 450 launching 2026 with 420cc platform, fully-faired design, sporty performance.",
    brandName: "TVS",
    modelName: "Apache RR 450",
    vehicleType: "Bike",
    bodyType: "Sports",
    expectedStatus: "Upcoming",
    price: {
      amount: 350000,
      currency: "INR",
      formattedPrice: "INR 3,50,000",
    },
    priceRange: "₹3.50 Lakh - ₹3.80 Lakh",
    priceRangeFrom: "₹3.50 Lakh",
    priceRangeTo: "₹3.80 Lakh",
    keySpecifications: {
      engine: "420cc Single-Cylinder",
      transmission: "6-Speed",
      fuelType: "Petrol",
      mileage: "TBA",
      yearOfManufacture: "2026",
    },
    topFeatures: [
      { feature: "420cc Engine" },
      { feature: "Fully-Faired Design" },
      { feature: "Race-Tuned Suspension" },
    ],
    standOutFeatures: [
      { feature: "Larger Apache RR" },
      { feature: "Track-Ready Performance" },
    ],
    pros: [
      { pro: "More powerful than RR 310", con: "Pricing premium over RR 310" },
      { pro: "TVS's racing pedigree", con: "Less practical for daily use" },
    ],
    tags: [
      { tagName: "Sports Bike" },
      { tagName: "TVS" },
      { tagName: "Apache" },
    ],
    seller: {
      userId: "tvs_motor",
      name: "TVS Motor Company",
      isVerified: true,
    },
    condition: {
      isNew: true,
      conditionStatus: "New",
      serviceHistoryAvailable: true,
    },
    listingDetails: {
      isVerified: true,
      verifiedBy: "system",
      daysListed: 7,
    },
    badges: ["Upcoming", "Performance"],
    highlight: "A new larger-displacement fully-faired sports bike from TVS",
  },
};

export const findVehicleDetails = (id: string): VehicleDetails | undefined =>
  sampleVehicleDetails[id];
