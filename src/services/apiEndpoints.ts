// constants/apiEndpoints.ts
export const ApiEndpoints = {
  Brands: {
    Base: "brands",
    Active: "brands/active",
    ById: "brands/{brandId}",
    ByCategory: "brands/category/{categoryCode}",
    ByCountry: "brands/country/{countryCode}",
    // Removed: ToggleActive (PATCH operation)
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
    // Removed: ToggleActive (PATCH), Reorder (POST)
  },

  Colors: {
    Base: "colors",
    Active: "colors/active",
    Ordered: "colors/ordered",
    ById: "colors/{colorId}",
    ByCode: "colors/code/{code}",
    // Removed: ToggleActive (PATCH), Reorder (POST), ValidateHex (POST), ConvertHexToRgb (POST)
  },

  FuelTypes: {
    Base: "fueltypes",
    ById: "fueltypes/{id}",
    ByCode: "fueltypes/by-code/{code}",
    // Removed: ToggleActive (PATCH), Bulk (POST)
  },

  VehicleTypes: {
    Base: "vehicletypes",
    ById: "vehicletypes/{id}",
    // Removed: ToggleActive (PATCH)
  },

  Transmissions: {
    Base: "transmissions",
    ById: "transmissions/{id}",
    ByCode: "transmissions/by-code/{code}",
    ByGears: "transmissions/by-gears/{gearsCount}",
    Automatic: "transmissions/automatic",
    Manual: "transmissions/manual",
  },
} as const;