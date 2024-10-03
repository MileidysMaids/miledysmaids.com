import { prices, base_service_cost_ranges, service_frequency_discounts, service_type_charges, TAXES } from "./prices";

import { CleaningItems, EstimateTotal, CleaningSubCategory } from "@/types/cleaningTypes";

export const residentialSubCategories: Array<CleaningSubCategory> = [
  CleaningSubCategory.House,
  CleaningSubCategory.Apartment,
  CleaningSubCategory.AirBnb,
];

export const workplaceSubCategories: Array<CleaningSubCategory> = [
  CleaningSubCategory.Office,
  CleaningSubCategory.Construction,
  CleaningSubCategory.RealEstate,
  CleaningSubCategory.PostRenovation,
];

export const facilitiesSubCategories: Array<CleaningSubCategory> = [
  CleaningSubCategory.Warehouse,
  CleaningSubCategory.Retail,
  CleaningSubCategory.Event,
  CleaningSubCategory.Hotel,
];

export const calculateEstimate = (props: Partial<CleaningItems>) => {
  const {
    bedroom_count = 0,
    bathroom_count = 0,
    window_count = 0,
    oven_count = 0,
    square_feet = 0,
    package_type = "STANDARD",
    service_frequency = "ONE_TIME",
    refrigerator_count = 0,
    microwave_count = 0,
    includes_basement = false,
    pet_present = false,
    includes_baseboard_cleaning = false,
    includes_kitchen_cabinet_cleaning = false,
    includes_bathroom_cabinet_cleaning = false,
    includes_linen_change = false,
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
    { count: includes_basement ? 1 : 0, cost: prices.basement_cost },
    { count: includes_baseboard_cleaning ? 1 : 0, cost: prices.baseboard_cost * square_feet },
    { count: includes_kitchen_cabinet_cleaning ? 1 : 0, cost: prices.kitchen_cab_cost },
    { count: includes_bathroom_cabinet_cleaning ? 1 : 0, cost: prices.bathroom_cab_cost },
    { count: includes_linen_change ? 1 : 0, cost: prices.change_linens_cost },
    { count: pet_present ? 1 : 0, cost: prices.pet_charge_cost },
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
