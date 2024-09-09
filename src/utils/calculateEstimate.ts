import { prices, base_service_cost_ranges, service_frequency_discounts, service_type_charges, TAXES } from "./prices";

/**
 * The input parameters for the estimate calculation.
 */
export type CleaningItems = {
  cleaning_type: "Residential" | "Commercial" | "Retail" | "Construction" | "Event Cleaning" | "Warehouse";
  package_type?: "standard" | "detailed" | "luxury";
  service_frequency?: "one_time" | "weekly" | "biweekly" | "monthly";
  is_recurring?: boolean;
  bedroom_count?: number;
  bathroom_count?: number;
  window_count?: number;
  oven_count?: number;
  square_feet?: number;
  refrigerator_count?: number;
  microwave_count?: number;
  has_basement?: boolean;
  has_pet?: boolean;
  has_baseboard?: boolean;
  has_kitchen_cabinets?: boolean;
  has_bathroom_cabinets?: boolean;
  has_change_linens?: boolean;
};

export type EstimateTotal = {
  total: number;
  taxes: number;
  subtotal: number;
  discount: number;
  before_discount: number;
};

export const calculateEstimate = (props: CleaningItems) => {
  const {
    bedroom_count = 0,
    bathroom_count = 0,
    window_count = 0,
    oven_count = 0,
    square_feet = 0,
    package_type = "standard",
    service_frequency = "one_time",
    refrigerator_count = 0,
    microwave_count = 0,
    has_basement = false,
    has_pet = false,
    has_baseboard = false,
    has_kitchen_cabinets = false,
    has_bathroom_cabinets = false,
    has_change_linens = false,
  } = props;

  // Determine base service cost
  const base_service_cost =
    Object.entries(base_service_cost_ranges)
      .reverse()
      .find(([range, _]) => Number(square_feet) >= Number(range))?.[1] ?? 200;

  // Calculate additional costs
  const additional_costs = [
    { count: bedroom_count, cost: prices.bedroom_cost },
    { count: bathroom_count, cost: prices.bathroom_cost },
    { count: window_count, cost: prices.windows_cost },
    { count: oven_count, cost: prices.oven_cost },
    { count: microwave_count, cost: prices.microwave_cost },
    { count: refrigerator_count, cost: prices.refrigerator_cost },
    { count: has_basement ? 1 : 0, cost: prices.basement_cost },
    { count: has_baseboard ? 1 : 0, cost: prices.baseboard_cost * square_feet },
    { count: has_kitchen_cabinets ? 1 : 0, cost: prices.kitchen_cab_cost },
    { count: has_bathroom_cabinets ? 1 : 0, cost: prices.bathroom_cab_cost },
    { count: has_change_linens ? 1 : 0, cost: prices.change_linens_cost },
    { count: has_pet ? 1 : 0, cost: prices.pet_charge_cost },
  ];

  // Sum up all costs
  const base_charges = additional_costs.reduce((acc, { count, cost }) => acc + count * cost, base_service_cost);

  // Apply service frequency discounts
  const discount = base_charges * service_frequency_discounts[service_frequency];
  const discounted_charges = base_charges - discount;

  // Apply service type charges
  const subtotal = discounted_charges * (1 + service_type_charges[package_type]);

  // Calculate taxes
  const taxes = subtotal * TAXES;
  // const taxes = parseFloat((subtotal * (TAXES / 100)).toFixed(2));

  // Calculate final total
  const total = subtotal + taxes;

  return { total, taxes, subtotal, discount, before_discount: base_charges } as EstimateTotal;
};
