import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Services } from "./Services";
import { Estimate } from "./Estimate";

const steps = [
  { name: "Quote", component: Estimate },
  { name: "Services", component: Services },
];

export default function Booking() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const methods = useForm();

  React.useEffect(() => {
    // Push the current step to the history stack
    window.history.pushState({ step: currentStep }, steps[currentStep].name, "");

    const handlePopState = (event) => {
      // If popstate is triggered and the state contains a step, navigate to that step
      if (event.state?.step !== undefined) setCurrentStep(event.state.step);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [currentStep]);

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col items-center justify-center">
        <ul className="steps w-1/3">
          {steps.map((step, index) => (
            <li key={index} className={index <= currentStep ? "step step-primary" : "step"}>
              {step.name}
            </li>
          ))}
        </ul>

        {steps.map(({ component: Step }, index) => (
          <div key={index} className={currentStep === index ? "" : "hidden"}>
            <Step onNext={handleNext} onBack={handleBack} />
          </div>
        ))}
      </div>
    </FormProvider>
  );
}
