import React from "react";
import { HomeIcon, BuildingIcon, ComputerIcon } from "@/icons/Icons";
import { useFormContext } from "react-hook-form";

const Card = ({ children, className, selected, ...props }) => (
  <div className={["card w-96 bg-base-100 shadow-xl transition-colors", selected ? "bg-primary text-white" : ""].join(" ")} {...props}>
    <div className={["card-body", className].join(" ")}>{children}</div>
  </div>
);

const Button = ({ children, className, ...props }) => (
  <div className={["btn", className].join(" ")} {...props}>
    {children}
  </div>
);

const Label = ({ children, className, ...props }) => (
  <label className={["label", className].join(" ")} {...props}>
    {children}
  </label>
);

const Input = ({ children, className, ...props }) => (
  <input className={["input input-bordered w-full max-w-xs", className].join(" ")} {...props}>
    {children}
  </input>
);

export const Estimate = ({ injectedClassNames, onNext, setFormData }) => {
  const { register, handleSubmit, getValues } = useFormContext();
  const [selected, setSelected] = React.useState(null);

  const onSubmit = (data) => {
    setFormData(data);
    onNext();
  };

  return (
    <div className={[injectedClassNames, "flex items-center justify-center"].join(" ")}>
      <form className="flex flex-col items-center gap-10" onSubmit={handleSubmit(onSubmit)}>
        <label className="text-lg">Select the Cleaning Service You Need</label>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card selected={selected === "Home"} className={"flex cursor-pointer flex-col items-center justify-center gap-4 p-6 text-center"}>
            <HomeIcon className="h-12 w-12" />
            <h1 className="text-xl font-semibold">Home</h1>
            <p className="text-muted-foreground">Get a quote for your residential cleaning needs.</p>
            <Button className="mt-4 w-full" onClick={() => setSelected("Home")}>
              Select
            </Button>
          </Card>

          <Card selected={selected === "Office"} className="flex cursor-pointer flex-col items-center gap-4 p-6">
            <ComputerIcon className="h-12 w-12" />
            <h2 className="text-xl font-semibold">Office</h2>
            <p className="text-muted-foreground text-center">Keep your workspace clean and professional.</p>
            <Button className="mt-4 w-full" onClick={() => setSelected("Office")}>
              Select
            </Button>
          </Card>

          <Card selected={selected === "Commercial"} className="flex cursor-pointer flex-col items-center gap-4 p-6">
            <BuildingIcon className="h-12 w-12" />
            <h2 className="text-xl font-semibold">Commercial</h2>
            <p className="text-muted-foreground text-center">Maintain a clean and professional environment.</p>
            <Button className="mt-4 w-full" onClick={() => setSelected("Commercial")}>
              Select
            </Button>
          </Card>
        </div>

        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="square-footage">Square Footage</Label>
              <Input id="square-footage" type="number" placeholder="2,000" {...register("square-footage")} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Input id="bathrooms" type="number" placeholder="2" {...register("bathrooms")} />
            </div>
          </div>
          <Button className="w-full" onClick={onNext}>
            Get Quote
          </Button>
        </div>
      </form>
    </div>
  );
};

// import React from "react";
// import { useEstimate } from "../hooks/useEstimate";
// import { PaymentElement } from "@stripe/react-stripe-js";
// import { useForm } from "react-hook-form";
// import { usePayments } from "@/hooks/usePayments";
// import { CheckoutForm } from "@/components/CheckoutForm";

// export default function EstimatePage() {
//   const { Checkout, stripe } = usePayments(CheckoutForm);
//   const { estimate, calculate } = useEstimate();
//   // On form change, calculate the estimate
//   const { register, handleSubmit } = useForm();

//   const handleCalculateEstimate = (data) => {
//     calculate(data);
//   };

//   return (
//     <>
//       <div className="max-w-3xl">
//         <Checkout />
//       </div>
//     </>
//   );
// }
