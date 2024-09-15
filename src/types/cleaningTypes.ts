// src/types/cleaningTypes.ts

export enum CleaningCategory {
  Residential = "Residential",
  Commercial = "Commercial",
  Other = "Other",
}

export enum CleaningSubCategory {
  // Residential
  House = "House",
  Apartment = "Apartment",
  AirBnb = "AirBnb",

  // Workplace & Specialized
  Office = "Office",
  Construction = "Construction",
  RealEstate = "Real Estate",
  PostRenovation = "Post Renovation",

  // Event Spaces & Facilities
  Event = "Event",
  Hotel = "Hotel",
  Retail = "Retail",
  Warehouse = "Warehouse",
}

export type CleaningItems = {
  cleaning_category: CleaningCategory;
  cleaning_sub_category: CleaningSubCategory;
  package_type?: "standard" | "detailed" | "luxury";
  service_frequency?: "one_time" | "weekly" | "biweekly" | "monthly";
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
  includes_linen_change?: boolean;
  includes_garage?: boolean;
  parking_availability?: boolean;
  floor_type?: "carpet" | "hardwood" | "tile" | "vinyl" | "other";
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
