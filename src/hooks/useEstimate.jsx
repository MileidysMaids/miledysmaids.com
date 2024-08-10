import { useState } from "react";
import { calculateEstimate } from "../utils/calculateEstimate";

const defaultProps = {
  defaultValues: {},
};

export const useEstimate = (props = defaultProps) => {
  const { defaultValues } = props;
  const [estimate, setEstimate] = useState(calculateEstimate(defaultValues));

  const calculate = (props) => {
    const results = calculateEstimate(props);
    setEstimate(results);
  };

  return { estimate, calculate };
};
