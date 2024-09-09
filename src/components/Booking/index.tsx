import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Services } from "./Services";
import { Cleaning } from "./Cleaning";
import { Booking } from "./Booking";

// Types
import type { FormValues } from "./types";

type Step = {
  name: string;
  component: React.ComponentType<StepComponentProps>;
};

type StepComponentProps = {
  onNext: (data: FormValues) => void;
  onBack: () => void;
};

const defaultValuesTest: FormValues = {
  slot: {
    date: "2022-12-01",
    slot_number: 1,
  },
  contact: {
    full_name: "Bryan E Tejada",
    phone: "4049901671",
    email: "bryan@me.com",
  },
  service: {
    cleaning_type: "Residential",
    bedroom_count: 1,
    bathroom_count: 1,
    window_count: 1,
    oven_count: 1,
    has_baseboard: false,
    has_kitchen_cabinets: false,
    has_bathroom_cabinets: false,
    has_change_linens: false,
    has_basement: false,
    has_pet: false,
    square_feet: 1000,
    package_type: "standard",
    service_frequency: "one_time",
    refrigerator_count: 1,
    microwave_count: 1,
  },
  address: {
    street: "6115s Bridge Rd",
    unit: "#118",
    city: "Savannah",
    state: "GA",
    zip: "30097",
  },
};

const steps = [
  { name: "Cleaning Type", component: Cleaning },
  // { name: "Services", component: Services },
  // { name: "Booking", component: Booking },
];

export default function Component() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const methods = useForm({ shouldUseNativeValidation: true, defaultValues: defaultValuesTest });
  // const methods = useForm({ shouldUseNativeValidation: true, defaultValues: { cleaning_type: "Home" } });

  React.useEffect(() => {
    // Push the initial state or replace it if needed
    if (window.history.state === null) window.history.replaceState({ step: currentStep }, steps[currentStep].name, "");

    const handlePopState = (event: PopStateEvent) => {
      // Handle the back/forward navigation
      if (event.state?.step !== undefined) setCurrentStep(event.state.step);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleSubmit = async (formData: FormValues) => {
    return;
    fetch("/api/booking/slots", {
      body: JSON.stringify(formData),
      method: "POST",
    })
      .then((res) => res.json())
      .then(console.log);
  };

  const handleNext = (data: FormValues) => {
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
        {steps.map(({ component: Step }, index) => {
          console.log(currentStep, index);
          return (
            <div key={index} className={["w-full"].join(" ")}>
              {currentStep === index && <Step onNext={handleNext} onBack={handleBack} />}
            </div>
          );
        })}
      </form>
    </FormProvider>
  );
}
