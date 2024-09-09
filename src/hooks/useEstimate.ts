import { useState } from "react";
import { calculateEstimate, CleaningItems } from "../utils/calculateEstimate";
import { prices } from "@/utils/prices";

const defaultProps = {
  defaultValues: {},
};

export const useEstimate = (props = defaultProps) => {
  const { defaultValues } = props;
  const [estimate, setEstimate] = useState(calculateEstimate(defaultValues));

  const calculate = (cleaningItems: CleaningItems) => {
    const results = calculateEstimate(cleaningItems);
    setEstimate(results);
  };

  return {
    prices,
    calculate,
    estimate: {
      total: estimate.total,
      taxes: estimate.taxes,
      subtotal: estimate.subtotal,
      discount: estimate.discount,
      before_discount: estimate.before_discount,
    },
  };
};
