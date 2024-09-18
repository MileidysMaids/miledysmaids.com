import { CleaningItems } from "@/types/cleaningTypes";

const bedroom_cost = 17;
const bathroom_cost = 19;
const windows_cost = 5;
const oven_cost = 18;
const microwave_cost = 10;
const baseboard_cost = 0.04;
const basement_cost = 65;
const kitchen_cab_cost = 40;
const bathroom_cab_cost = 30;
const change_linens_cost = 5;
const pet_charge_cost = 25;
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
  0: 100, // 0+ sqft
  1101: 115, // 1100+ sqft
  1501: 125, // 1500+ sqft
  2001: 135, // 2000+ sqft
  2501: 145, // 2500+ sqft
  3001: 190, // default
};

export const service_type_charges: Record<NonNullable<CleaningItems["package_type"]>, number> = {
  STANDARD: 0, // 0% charge
  DETAILED: 0.5, // 50% charge
  LUXURY: 0.5, // 50% charge
};

export const service_frequency_discounts: Record<NonNullable<CleaningItems["service_frequency"]>, number> = {
  ONE_TIME: 0,
  WEEKLY: 0.2, // 20% discount
  BIWEEKLY: 0.1, // 10% discount
  MONTHLY: 0.1, // 10% discount
};
