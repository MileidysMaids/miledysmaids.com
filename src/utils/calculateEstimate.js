/**
 * Calculates the estimate for a cleaning service based on various parameters.
 * @param {Object} props - The input parameters for the estimate calculation.
 * @param {number} props.bedroom_count - The number of bedrooms. (Cost: $17 per bedroom)
 * @param {number} props.bathroom_count - The number of bathrooms. (Cost: $19 per bathroom)
 * @param {number} props.window_count - The number of windows. (Cost: $5 per window)
 * @param {number} props.oven_count - The number of ovens. (Cost: $18 per oven)
 * @param {number} props.square_feet - The square footage of the property. (Cost: $0.04 per sqft)
 * @param {number} props.bedroom_count - The number of bedrooms.
 * @param {number} props.bathroom_count - The number of bathrooms.
 * @param {number} props.window_count - The number of windows.
 * @param {number} props.oven_count - The number of ovens.
 * @param {number} props.square_feet - The square footage of the property.
 * @param {string} props.service_type - The type of service (standard, deep, move_in_out).
 *   Standard: $0 (0% charge)
 *   Deep: $0.5 (50% charge)
 *   Move-in/Move-out: $0.5 (50% charge)
 * @param {string} props.service_frequency - The frequency of the service (one_time, weekly, biweekly, monthly).
 *   One time: $0 (0% discount)
 *   Weekly: $0.2 (20% discount)
 *   Biweekly: $0.1 (10% discount)
 *   Monthly: $0.1 (10% discount)
 * @param {number} props.refrigerator_count - The number of refrigerators.
 * @param {number} props.microwave_count - The number of microwaves. (Cost: $10 per microwave)
 * @param {boolean} props.has_basement - Indicates if the property has a basement. (Cost: $75)
 * @param {number} props.microwave_count - The number of microwaves.
 * @param {boolean} props.has_basement - Indicates if the property has a basement.
 * @param {boolean} props.has_pet - Indicates if the property has a pet.
 * @param {boolean} props.has_baseboard - Indicates if the property has baseboard. (Cost: $0.04 per sqft)
 * @param {boolean} props.has_kitchen_cabinets - Indicates if the property has kitchen cabinets. (Cost: $40)
 * @param {boolean} props.has_baseboard - Indicates if the property has baseboard.
 * @param {boolean} props.has_kitchen_cabinets - Indicates if the property has kitchen cabinets.
 * @param {boolean} props.has_bathroom_cabinets - Indicates if the property has bathroom cabinets.
 * @param {boolean} props.has_change_linens - Indicates if the property requires changing linens.
 * @returns {Object} - The calculated estimate including total, taxes, subtotal, and discount.
 */
export const calculateEstimate = (props) => {
  const {
    bedroom_count = 0,
    bathroom_count = 0,
    window_count = 0,
    oven_count = 0,
    square_feet = 0,
    service_type = "standard",
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

  const base_service_cost_ranges = {
    0: 110, // 0+ sqft
    1101: 125, // 1100+ sqft
    1501: 135, // 1500+ sqft
    2001: 145, // 2000+ sqft
    2501: 155, // 2500+ sqft
    3001: 200, // default
  };

  const service_type_charges = {
    standard: 0, // 0% charge
    deep: 0.5, // 50% charge
    move_in_out: 0.5, // 50% charge
  };

  const service_frequency_discounts = {
    one_time: 0,
    weekly: 0.2, // 20% discount
    biweekly: 0.1, // 10% discount
    monthly: 0.1, // 10% discount
  };

  const TAXES = 0.06;
  const bedroom_cost = 17;
  const bathroom_cost = 19;
  const windows_cost = 5;
  const oven_cost = 18;
  const microwave_cost = 10;
  const baseboard_cost = 0.04;
  const basement_cost = 75;
  const kitchen_cab_cost = 40;
  const bathroom_cab_cost = 30;
  const change_linens_cost = 5;
  const pet_charge_cost = 25;
  const refrigerator_cost = 40;

  const prices = {
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

  // Determine base service cost
  const base_service_cost =
    Object.entries(base_service_cost_ranges)
      .reverse()
      .find(([range, _]) => Number(square_feet) >= Number(range))?.[1] ?? 200;

  // Calculate additional costs
  const additional_costs = [
    { count: bedroom_count, cost: bedroom_cost },
    { count: bathroom_count, cost: bathroom_cost },
    { count: window_count, cost: windows_cost },
    { count: oven_count, cost: oven_cost },
    { count: microwave_count, cost: microwave_cost },
    { count: refrigerator_count, cost: refrigerator_cost },
    { count: has_basement ? 1 : 0, cost: basement_cost },
    { count: has_baseboard ? 1 : 0, cost: baseboard_cost * square_feet },
    { count: has_kitchen_cabinets ? 1 : 0, cost: kitchen_cab_cost },
    { count: has_bathroom_cabinets ? 1 : 0, cost: bathroom_cab_cost },
    { count: has_change_linens ? 1 : 0, cost: change_linens_cost },
    { count: has_pet ? 1 : 0, cost: pet_charge_cost },
  ];

  // Sum up all costs
  const base_charges = additional_costs.reduce((acc, { count, cost }) => acc + count * cost, base_service_cost);

  // Apply service frequency discounts
  const discount = base_charges * service_frequency_discounts[service_frequency];
  const discounted_charges = base_charges - discount;

  // Apply service type charges
  const subtotal = discounted_charges * (1 + service_type_charges[service_type]);

  // Calculate taxes
  const taxes = subtotal * TAXES;

  // Calculate final total
  const total = subtotal + taxes;

  return { total, taxes, subtotal, discount, before_discount: base_charges, prices };
};
