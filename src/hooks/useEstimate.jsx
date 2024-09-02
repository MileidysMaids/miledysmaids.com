import { useState } from "react";
import { calculateEstimate } from "../utils/calculateEstimate";

const defaultProps = {
  defaultValues: {},
};

export const useEstimate = (props = defaultProps) => {
  const { defaultValues } = props;
  const [estimate, setEstimate] = useState(calculateEstimate(defaultValues));

  /**
   * Calculate the estimate based on the given parameters.
   * @param {Object} props - The properties for estimating the cost.
   * @param {number} [props.bedroom_count=0] - The number of bedrooms. ($17 per bedroom)
   * @param {number} [props.bathroom_count=0] - The number of bathrooms. ($19 per bathroom)
   * @param {number} [props.window_count=0] - The number of windows. ($5 per window)
   * @param {number} [props.oven_count=0] - The number of ovens. ($18 per oven)
   * @param {number} [props.square_feet=0] - The square footage of the property. ($0.04 per sqft)
   * @param {string} [props.service_type="standard"] - The type of service. ($0 (0% charge), $0.5 (50% charge), $0.5 (50% charge))
   * @param {string} [props.service_frequency="one_time"] - The frequency of the service. ($0 (0% discount), $0.2 (20% discount), $0.1 (10% discount), $0.1 (10% discount))
   * @param {number} [props.refrigerator_count=0] - The number of refrigerators. ($10 per refrigerator)
   * @param {number} [props.microwave_count=0] - The number of microwaves. ($10 per microwave)
   * @param {boolean} [props.has_basement=false] - Indicates if the property has a basement. ($75)
   * @param {boolean} [props.has_pet=false] - Indicates if the property has a pet.
   * @param {boolean} [props.has_baseboard=false] - Indicates if the property has baseboard. ($0.04 per sqft)
   * @param {boolean} [props.has_kitchen_cabinets=false] - Indicates if the property has kitchen cabinets. ($40)
   * @param {boolean} [props.has_bathroom_cabinets=false] - Indicates if the property has bathroom cabinets. ($40)
   * @param {boolean} [props.has_change_linens=false] - Indicates if the property requires changing linens.
   */
  const calculate = (props) => {
    // console.log(props);
    const results = calculateEstimate(props);
    setEstimate(results);
  };

  return {
    estimate: {
      total: estimate.total,
      taxes: estimate.taxes,
      subtotal: estimate.subtotal,
      discount: estimate.discount,
      before_discount: estimate.before_discount,
    },
    prices: estimate.prices,
    calculate,
  };
};
