import { CleaningItems } from "@/types/cleaningTypes";

const bedroom_cost = 17;
const bathroom_cost = 19;
const windows_cost = 5;
const oven_cost = 25;
const microwave_cost = 10;
const baseboard_cost = 0.04;
const basement_cost = 65;
const kitchen_cab_cost = 40;
const bathroom_cab_cost = 30;
const change_linens_cost = 5;
const pet_charge_cost = 10;
const refrigerator_cost = 40;
export const TAXES = 0.06;

export const prices = {
  bedroom_cost,
  bathroom_cost,
  windows_cost,
  oven_cost,
  microwave_cost,
  baseboard_cost,
  basement_cost,
  kitchen_cab_cost,
  bathroom_cab_cost,
  change_linens_cost,
  pet_charge_cost,
  refrigerator_cost,
};

export const base_service_cost_ranges: Record<NonNullable<CleaningItems["square_feet"]>, number> = {
  0: 40, // 0+ sqft
  1101: 45, // 1100+ sqft
  1501: 50, // 1500+ sqft
  2001: 55, // 2000+ sqft
  2501: 60, // 2500+ sqft
  3001: 65, // 3000+ sqft
  3501: 70, // 3500+ sqft
  4001: 75, // 4000+ sqft
  4501: 80, // 4500+ sqft
  5001: 85, // 5000+ sqft
};

export const service_type_charges: Record<NonNullable<CleaningItems["package_type"]>, number> = {
  STANDARD: 0, // 0% charge
  DETAILED: 0.5, // 50% charge
  LUXURY: 0.5, // 50% charge
};

export const service_frequency_discounts: Record<NonNullable<CleaningItems["service_frequency"]>, number> = {
  ONE_TIME: 0, // 0% discount
  WEEKLY: 0.3, // 20% discount
  BIWEEKLY: 0.2, // 10% discount
  MONTHLY: 0, // 5% discount
};
