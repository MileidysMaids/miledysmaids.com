import React from "react";

const Card = ({ children, className, ...props }) => (
  <div className="card w-96 bg-base-100 shadow-xl" {...props}>
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

export default function Component({ injectedClassNames }) {
  return (
    <div className={[injectedClassNames, "flex items-center justify-center"].join(" ")}>
      <div className="flex flex-col items-center gap-10">
        <ul class="steps">
          {/* <li class="step step-primary">Choose cleaning</li> */}
          <li class="step step-primary">Estimate</li>
          <li class="step">Booking</li>
          <li class="step">Receive Product</li>
        </ul>

        <h1 className="text-lg">Select the Cleaning Service You Need</h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card className="flex cursor-pointer flex-col items-center justify-center gap-4 p-6 text-center">
            <HomeIcon className="h-12 w-12" />
            <h1 className="text-xl font-semibold">Home</h1>
            <p className="text-muted-foreground">Get a quote for your residential cleaning needs.</p>
            <Button variant="outline" className="mt-4 w-full">
              Select
            </Button>
          </Card>

          <Card className="flex cursor-pointer flex-col items-center gap-4 p-6">
            <ComputerIcon className="h-12 w-12" />
            <h2 className="text-xl font-semibold">Office</h2>
            <p className="text-muted-foreground text-center">Keep your workspace clean and professional.</p>
            <Button variant="outline" className="mt-4 w-full">
              Select
            </Button>
          </Card>

          <Card className="flex cursor-pointer flex-col items-center gap-4 p-6">
            <BuildingIcon className="h-12 w-12" />
            <h2 className="text-xl font-semibold">Commercial</h2>
            <p className="text-muted-foreground text-center">Maintain a clean and professional environment.</p>
            <Button variant="outline" className="mt-4 w-full">
              Select
            </Button>
          </Card>
        </div>

        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="square-footage">Square Footage</Label>
              <Input id="square-footage" type="number" placeholder="2,000" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Input id="bathrooms" type="number" placeholder="2" />
            </div>
          </div>
          <Button className="w-full">Get Quote</Button>
        </div>
      </div>
    </div>
  );
}

function BuildingIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}

function ComputerIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect width="14" height="8" x="5" y="2" rx="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" />
      <path d="M6 18h2" />
      <path d="M12 18h6" />
    </svg>
  );
}

function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

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
