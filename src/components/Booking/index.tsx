import React from "react";
import { useForm, FormProvider, FieldValues } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { Services } from "./Services";
import { Cleaning } from "./Cleaning";
import { Booking } from "./Booking";

// Types
import { CleaningCategory, CleaningItems, CleaningSubCategory } from "@/types/cleaningTypes";
import { FormValues } from "@/types/bookingTypes";
import { ChevronLeftIcon } from "lucide-react";
import { safeLocalStorage } from "@/utils/localStorage";

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
    linen_change_count: 3,
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
  const btnRef = React.useRef<HTMLButtonElement>();
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

  React.useEffect(() => {
    // @ts-ignore
    const navigationType = window.performance.getEntriesByType("navigation")[0]?.type; // Check where did the user come from

    // Check if the page was refreshed
    const isPageReload = navigationType === "reload";

    if (isPageReload) {
      // Load form data from local storage
      const storedData = JSON.parse(safeLocalStorage.getItem(`formData`) ?? `{}`);
      const step = JSON.parse(safeLocalStorage.getItem("step") ?? "{}");

      // Set form data
      methods.reset(storedData);
      setCurrentStep(step - 1);
    } else {
      // Clear local storage
      safeLocalStorage.removeItem("formData");
      safeLocalStorage.setItem(`step`, JSON.stringify(currentStep + 1));
    }
  }, []);

  const handleSubmit = async (formData: FieldValues) => {
    fetch("/api/booking/slots", {
      body: JSON.stringify(formData),
      method: "POST",
    })
      .then((res) => res.json())
      .then(({ success, message, error }) => {
        if (!success) return setError({ error, message });

        // Clear local storage
        safeLocalStorage.removeItem("formData");
        safeLocalStorage.removeItem("step");

        window.location.href = "/service/success";
      });
  };

  const handleNext = (data: FieldValues) => {
    // Get data from local storage
    const storedData = JSON.parse(safeLocalStorage.getItem(`formData`) ?? `{}`);

    // Save data to local storage
    safeLocalStorage.setItem(`formData`, JSON.stringify({ ...storedData, ...data }));
    safeLocalStorage.setItem(`step`, JSON.stringify(currentStep + 2));

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
    // Save data to local storage
    safeLocalStorage.setItem(`formData`, JSON.stringify(methods.getValues()));
    safeLocalStorage.setItem(`step`, JSON.stringify(currentStep));

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

  const handleStepClick = (clickedStep: number) => {
    const savedStep = JSON.parse(safeLocalStorage.getItem("step") ?? "1");

    // Don't go beyond the last step
    if (clickedStep > savedStep) return;

    const index = clickedStep - 1;
    setCurrentStep(index);
  };

  const isBlocked = (clickedStep: number) => {
    const savedStep = JSON.parse(safeLocalStorage.getItem("step") ?? "1");
    return clickedStep > savedStep;
  };

  return (
    <FormProvider {...methods}>
      <div className="flex w-dvw flex-col items-center justify-center">
        <div className="relative my-10 flex w-full max-w-screen-xl items-center justify-center bg-red-500">
          {/* Go back */}
          <div className="absolute left-0 hidden md:block">
            <button className="btn btn-outline" disabled={currentStep === 0} onClick={handleBack}>
              <ChevronLeftIcon className="h-15 w-15" />
              Go Back
            </button>
          </div>

          <ul className="steps absolute w-full max-w-xl overflow-visible lg:w-1/2">
            {steps.map((step, index) => (
              <li
                key={index}
                {...(error.error ? { "data-content": "!" } : {})}
                onClick={() => handleStepClick(index + 1)}
                className={[
                  isBlocked(index + 1) ? "cursor-not-allowed" : "cursor-pointer",
                  index <= currentStep ? "step step-primary" : "step",
                  index === currentStep && error.error ? "step-error" : "",
                ].join(" ")}>
                {step.name}
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={methods.handleSubmit(handleNext)} className="relative flex w-dvw max-w-screen-xl flex-1 flex-col">
          <AnimatePresence>
            {steps.map(
              ({ component: Step }, index) =>
                currentStep === index && (
                  <motion.div
                    key={index}
                    initial={{ x: 10, opacity: 0, position: "absolute", top: 0, left: 0, width: "100%" }}
                    animate={{ x: 0, opacity: 1, position: "relative", top: 0, left: 0, width: "100%" }}
                    exit={{ x: -10, opacity: 0, position: "absolute", top: 0, left: 0, width: "100%" }}
                    transition={{ duration: 0.5, ease: "easeInOut", delay: 0.5 }}
                    style={{ width: "100%" }}>
                    <Step onNext={handleNext} onBack={handleBack} error={error} onChangeError={handleError} />
                  </motion.div>
                ),
            )}
          </AnimatePresence>

          {/* Side door button for submit */}
          {/* <button ref={btnRef} type="submit" className="hidden" /> */}
        </form>
      </div>
    </FormProvider>
  );
}
