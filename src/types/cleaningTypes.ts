// src/types/cleaningTypes.ts

export enum CleaningCategory {
  Residential = "RESIDENTIAL",
  Commercial = "COMMERCIAL",
  Other = "OTHER",
}

export enum CleaningSubCategory {
  // Residential
  House = "HOUSE",
  Apartment = "APARTMENT",
  AirBnb = "AIRBNB",

  // Workplace & Specialized
  Office = "OFFICE",
  Construction = "CONSTRUCTION",
  RealEstate = "REAL ESTATE",
  PostRenovation = "POST RENOVATION",

  // Event Spaces & Facilities
  Event = "EVENT",
  Hotel = "HOTEL",
  Retail = "RETAIL",
  Warehouse = "WAREHOUSE",
}

export type CleaningItems = {
  cleaning_category: CleaningCategory;
  cleaning_sub_category: CleaningSubCategory;
  package_type?: "STANDARD" | "DETAILED" | "LUXURY";
  service_frequency: "ONE_TIME" | "WEEKLY" | "BIWEEKLY" | "MONTHLY";
  is_recurring?: boolean;
  bedroom_count?: number;
  bathroom_count?: number;
  has_multiple_toilets?: boolean;
  toilet_count?: number;
  window_count?: number;
  oven_count?: number;
  square_feet: number;
  refrigerator_count?: number;
  microwave_count?: number;
  pet_present?: boolean;
  includes_basement?: boolean;
  includes_baseboard_cleaning?: boolean;
  includes_kitchen_cabinet_cleaning?: boolean;
  includes_bathroom_cabinet_cleaning?: boolean;
  linen_change_count?: number;
  includes_garage?: boolean;
  parking_availability?: boolean;
  floor_type?: "CARPET" | "HARDWOOD" | "TILE" | "VINYL" | "OTHER";
  special_requests?: string;
  floor_count?: number;
  cleaning_supplies_provided?: boolean;
  eco_friendly_products?: boolean;
};

export type EstimateTotal = {
  total: number;
  taxes: number;
  subtotal: number;
  discount: number;
  before_discount: number;
};

export type CleaningItemsKeys = keyof CleaningItems;
