import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Services } from "./Services";
import { Cleaning } from "./Cleaning";
import { Booking } from "./Booking";

const steps = [
  { name: "Cleaning Type", component: Cleaning },
  { name: "Services", component: Services },
  { name: "Booking", component: Booking },
];

const defaultValuesTest = {
  cleaning_type: "Home",
  square_feet: "500",
  bedroom_count: "1",
  bathroom_count: "1",
  instructions: "test",
  full_name: "Bryan E Tejada",
  address: "6115 Abbotts Bridge Rd",
  unit: "#118",
  city: "Duluth",
  state: "GA",
  zip: "30097",
  phone: "4049901671",
  window_count: 1,
  microwave_count: 1,
  oven_count: 1,
  refrigerator_count: 1,
};

export default function Component() {
  const [currentStep, setCurrentStep] = React.useState(0);
  // const methods = useForm({ shouldUseNativeValidation: true, defaultValues: defaultValuesTest });
  const methods = useForm({ shouldUseNativeValidation: true, defaultValues: { cleaning_type: "Home" } });

  React.useEffect(() => {
    // Push the initial state or replace it if needed
    if (window.history.state === null) window.history.replaceState({ step: currentStep }, steps[currentStep].name, "");

    const handlePopState = (event) => {
      // Handle the back/forward navigation
      if (event.state?.step !== undefined) setCurrentStep(event.state.step);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleSubmit = async (formData) => {
    fetch("/api/booking/slots", {
      body: JSON.stringify(formData),
      method: "POST",
    })
      .then((res) => res.json())
      .then(console.log);
  };

  const handleNext = (data) => {
    // If the current step is the last step, submit the form
    if (currentStep + 1 === steps.length) return handleSubmit(data);

    // Move forward and push the new state to history
    setCurrentStep((prevStep) => {
      const newStep = prevStep + 1;
      window.history.pushState({ step: newStep }, steps[newStep].name, "");
      return newStep;
    });
  };

  const handleBack = () => {
    // Move back and update history
    setCurrentStep((prevStep) => {
      const newStep = prevStep - 1;
      window.history.pushState({ step: newStep }, steps[newStep].name, "");
      return newStep;
    });
  };

  return (
    <FormProvider {...methods}>
      <div className="flex w-dvw items-center justify-center">
        <ul className="steps w-1/3">
          {steps.map((step, index) => (
            <li key={index} className={[index <= currentStep ? "step step-primary" : "step"].join(" ")}>
              {step.name}
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={methods.handleSubmit(handleNext)} className="flex w-dvw flex-1 flex-col">
        {steps.map(({ component: Step }, index) => (
          <div key={index} className={["w-full"].join(" ")}>
            {currentStep === index && <Step onNext={handleNext} onBack={handleBack} />}
          </div>
        ))}
      </form>
    </FormProvider>
  );
}
