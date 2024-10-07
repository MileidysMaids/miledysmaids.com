import React from "react";
import { useForm, FormProvider, FieldValues } from "react-hook-form";
import { Services } from "./Services";
import { Cleaning } from "./Cleaning";
import { Booking } from "./Booking";

// Types
import { CleaningCategory, CleaningItems, CleaningSubCategory } from "@/types/cleaningTypes";
import { FormValues } from "@/types/bookingTypes";

type StepDefinition = {
  name: string;
  component: React.ComponentType<Step>;
};

type StepError = {
  error: boolean;
  message: string;
};

export type Step = {
  onNext: (data: FormValues) => void;
  onBack: () => void;
  onChangeError?: (error: StepError) => void;
  error?: StepError;
};

const defaultValuesTest: FormValues = {
  slot: {
    date: new Date("2024-09-17T12:00:00.000Z"),
    slot_number: 28776240,
    time: "10:00 AM",
  },
  contact: {
    full_name: "Bryan E. Tejada",
    phone: "4049901671",
    email: "bryan@me.com",
  },
  service: {
    cleaning_category: CleaningCategory.Residential,
    cleaning_sub_category: CleaningSubCategory.House,
    bedroom_count: 1,
    bathroom_count: 1,
    window_count: 1,
    oven_count: 1,
    includes_baseboard_cleaning: false,
    includes_kitchen_cabinet_cleaning: false,
    includes_bathroom_cabinet_cleaning: false,
    includes_linen_change: false,
    includes_basement: false,
    pet_present: false,
    square_feet: 1000,
    service_frequency: "ONE_TIME",
    refrigerator_count: 1,
    microwave_count: 1,
  },
  address: {
    street: "6115 Abbotts Bridge Rd",
    unit: "#118",
    city: "Atlanta",
    state: "GA",
    zip: "30097",
  },
};

const defaultValues: Partial<FormValues> = {
  service: {
    cleaning_category: CleaningCategory.Residential,
    cleaning_sub_category: CleaningSubCategory.House,
    square_feet: 0,
    service_frequency: "ONE_TIME",
  },
};

const steps: StepDefinition[] = [
  { name: "Cleaning Type", component: Cleaning },
  { name: "Services", component: Services },
  { name: "Booking", component: Booking },
];

export default function Component() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const methods = useForm({ shouldUseNativeValidation: true, defaultValues });
  const [error, setError] = React.useState<StepError>({ error: false, message: "" });

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

  const handleSubmit = async (formData: FieldValues) => {
    fetch("/api/booking/slots", {
      body: JSON.stringify(formData),
      method: "POST",
    })
      .then((res) => res.json())
      .then(({ success, message, error }) => {
        if (!success) return setError({ error, message });
        window.location.href = "/service/success";
      });
  };

  const handleNext = (data: FieldValues) => {
    // If the current step is the last step, submit the form
    if (currentStep + 1 === steps.length) return handleSubmit(data);

    // Move forward and update history
    setCurrentStep((prevStep) => {
      const newStep = prevStep + 1;
      window.history.pushState({ step: newStep }, steps[newStep].name, "");
      return newStep;
    });

    // Scroll to the top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    // Move back and update history
    setCurrentStep((prevStep) => {
      const newStep = prevStep - 1;
      window.history.pushState({ step: newStep }, steps[newStep].name, "");
      return newStep;
    });
  };

  const handleError = (error: StepError) => {
    setError(error);
  };

  return (
    <FormProvider {...methods}>
      <div className="flex w-dvw items-center justify-center">
        <ul className="steps w-full max-w-xl overflow-visible lg:w-1/2">
          {steps.map((step, index) => (
            <li
              key={index}
              {...(error.error ? { "data-content": "!" } : {})}
              className={[
                index <= currentStep ? "step step-primary" : "step",
                index === currentStep && error.error ? "step-error" : "",
              ].join(" ")}>
              {step.name}
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={methods.handleSubmit(handleNext)} className="flex w-dvw flex-1 flex-col">
        {steps.map(
          ({ component: Step }, index) =>
            currentStep === index && <Step key={index} onNext={handleNext} onBack={handleBack} error={error} onChangeError={handleError} />,
        )}
      </form>
    </FormProvider>
  );
}
