// constants/apiEndpoints.ts
export const ApiEndpoints = {
  // ─── Core Data Endpoints ───────────────────────────────────────────────
  Brands: {
    Base: "brands",
    Active: "brands/active",
    ById: "brands/{brandId}",
    ByCategory: "brands/category/{categoryCode}",
    ByCountry: "brands/country/{countryCode}",
  },

  Categories: {
    Base: "categories",
    Active: "categories/active",
    Main: "categories/main",
    Tree: "categories/tree",
    ById: "categories/{categoryId}",
    ByCode: "categories/code/{code}",
    BySlug: "categories/slug/{slug}",
    SubCategories: "categories/{parentCategoryId}/subcategories",
  },

  Colors: {
    Base: "colors",
    Active: "colors/active",
    Ordered: "colors/ordered",
    ById: "colors/{colorId}",
    ByCode: "colors/code/{code}",
  },

  FuelTypes: {
    Base: "fueltypes",
    ById: "fueltypes/{id}",
    ByCode: "fueltypes/by-code/{code}",
  },

  VehicleTypes: {
    Base: "vehicletypes",
    ById: "vehicletypes/{id}",
  },

  Transmissions: {
    Base: "transmissions",
    ById: "transmissions/{id}",
    ByCode: "transmissions/by-code/{code}",
    ByGears: "transmissions/by-gears/{gearsCount}",
    Automatic: "transmissions/automatic",
    Manual: "transmissions/manual",
  },

  // ─── Vehicle Listing Endpoints ────────────────────────────────────────
  FeaturedVehicle: {
    Base: "FeaturedVehicle",
    Active: "FeaturedVehicle/active",
    TopPriority: "FeaturedVehicle/top-priority",
    ById: "FeaturedVehicle/{id}",
    BySlug: "FeaturedVehicle/slug/{slug}",
    ByModel: "FeaturedVehicle/model/{modelSlug}",
    ByBrand: "FeaturedVehicle/brand/{brandName}",
    ByType: "FeaturedVehicle/type/{vehicleType}",
    PriceRange: "FeaturedVehicle/price-range",
    ByCity: "FeaturedVehicle/city/{city}",
    Search: "FeaturedVehicle/search",
  },

  NewlyArrived: {
    Base: "NewlyArrived",
    ById: "NewlyArrived/{id}",
    BySlug: "NewlyArrived/slug/{modelSlug}",
    Weekly: "NewlyArrived/weekly",
    Monthly: "NewlyArrived/monthly",
    Yearly: "NewlyArrived/yearly/{year}",
    CurrentYear: "NewlyArrived/yearly/current",
    Featured: "NewlyArrived/featured",
  },

  PremiumVehicle: {
    Base: "PremiumVehicle",
    Active: "PremiumVehicle/active",
    TopPriority: "PremiumVehicle/top-priority",
    ById: "PremiumVehicle/{id}",
    BySlug: "PremiumVehicle/slug/{slug}",
    ByModel: "PremiumVehicle/model/{modelSlug}",
    ByBrand: "PremiumVehicle/brand/{brandName}",
    ByType: "PremiumVehicle/type/{vehicleType}",
    PriceRange: "PremiumVehicle/price-range",
    ByCity: "PremiumVehicle/city/{city}",
    Search: "PremiumVehicle/search",
  },

  UpcomingVehicle: {
    Base: "UpcomingVehicle",
    Active: "UpcomingVehicle/active",
    Featured: "UpcomingVehicle/featured",
    Latest: "UpcomingVehicle/latest",
    UpcomingLaunches: "UpcomingVehicle/upcoming-launches",
    ById: "UpcomingVehicle/{id}",
    BySlug: "UpcomingVehicle/slug/{slug}",
    ByModel: "UpcomingVehicle/model/{modelSlug}",
    ByBrand: "UpcomingVehicle/brand/{brandName}",
    ByType: "UpcomingVehicle/type/{vehicleType}",
    PriceRange: "UpcomingVehicle/price-range",
    LaunchPeriod: "UpcomingVehicle/launch-period/{launchPeriod}",
    Search: "UpcomingVehicle/search",
  },

  UsedVehicles: {
    Base: "UsedVehicles",
    Active: "UsedVehicles/active",
    TopPriority: "UsedVehicles/top-priority",
    Recent: "UsedVehicles/recent",
    ById: "UsedVehicles/{id}",
    BySlug: "UsedVehicles/slug/{slug}",
    ByModel: "UsedVehicles/model/{modelSlug}",
    ByBrand: "UsedVehicles/brand/{brandName}",
    ByType: "UsedVehicles/type/{vehicleType}",
    PriceRange: "UsedVehicles/price-range",
    ByCity: "UsedVehicles/city/{city}",
    ByFuelType: "UsedVehicles/fuel-type/{fuelType}",
    ByTransmission: "UsedVehicles/transmission/{transmission}",
    YearRange: "UsedVehicles/year-range",
    BySellerType: "UsedVehicles/seller-type/{sellerType}",
    BySeller: "UsedVehicles/seller/{sellerId}",
    Search: "UsedVehicles/search",
    StatisticsCounts: "UsedVehicles/statistics/counts",
  },
} as const;

// ─── Type for all endpoints ─────────────────────────────────────────────
export type ApiEndpointKeys = {
  [K in keyof typeof ApiEndpoints]: keyof typeof ApiEndpoints[K];
};