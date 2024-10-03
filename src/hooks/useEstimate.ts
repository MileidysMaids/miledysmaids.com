import React from "react";
import { calculateEstimate } from "../utils/calculateEstimate";
import { CleaningItems } from "@/types/cleaningTypes";
import { prices } from "@/utils/prices";

export const useEstimate = () => {
  const [estimate, setEstimate] = React.useState(calculateEstimate({}));

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
