import { useEstimate } from "@/hooks/useEstimate";
import React from "react";
import { useState } from "react";
import { MicrowaveIcon, PlusIcon, MinusIcon, DogIcon } from "@/icons/Icons";
import { useForm } from "react-hook-form";

const Button = ({ children, className, ...props }) => (
  <button className={["btn btn-sm", className].join(" ")} {...props}>
    {children}
  </button>
);

const Card = ({ children, className, ...props }) => (
  <div className="card border bg-base-100 shadow-xl" {...props}>
    <div className={["card-body", className].join(" ")}>{children}</div>
  </div>
);

const Service = ({ option_name, label, handleOptionChange, map, price, per_square, Icon, type }) => {
  const value = map[option_name] ? Math.max(map[option_name], 0) : 0;

  const handleOnClick = (option_name, operation) => {
    if (operation === "sum") handleOptionChange(option_name, value + 1);
    if (operation === "subtract") handleOptionChange(option_name, value - 1 < 0 ? 0 : value - 1);
  };

  return (
    <div
      className={[
        "card flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border p-4 text-center transition-all",
        map[option_name] > 0 ? "bg-primary text-white" : "",
      ].join(" ")}
      onClick={() => type === "boolean" && handleOptionChange(option_name, !map[option_name])}>
      {Icon && <Icon className="h-12 w-12" />}
      {type === "count" && (
        <div className="flex items-center gap-2">
          <Button className="btn-circle p-1" onClick={() => handleOnClick(option_name, "subtract")}>
            <MinusIcon className="h-5 w-5" />
          </Button>

          <span className="text-xl font-bold">{value}</span>

          <Button className="btn-circle p-1" onClick={() => handleOnClick(option_name, "sum")}>
            <PlusIcon className="h-5 w-5" />
          </Button>
        </div>
      )}
      <span>{label}</span>
      {/* <span className="font-bold">
        ${price} {per_square ? "/sqft" : ""}
      </span> */}
    </div>
  );
};

export const Services = ({ onNext, onBack, getFormData }) => {
  const [customOptions, setCustomOptions] = useState({});
  const { calculate, estimate, prices } = useEstimate();
  const { register, handleSubmit } = useForm();

  const handleOptionChange = (option, value) => {
    setCustomOptions((prev) => ({ ...prev, [option]: value }));
  };

  React.useEffect(() => {
    calculate(customOptions);
  }, [customOptions]);

  const options = React.useMemo(
    () => [
      { label: "Microwaves", type: "count", option_name: "microwave_count", Icon: MicrowaveIcon, price: prices["microwave_cost"] },
      { label: "Refrigerators", type: "count", option_name: "refrigerator_count", price: prices["refrigerator_cost"] },
      { label: "Windows", type: "count", option_name: "window_count", Icon: MicrowaveIcon, price: prices["windows_cost"] },
      { label: "Ovens", type: "count", option_name: "oven_count", price: prices["oven_cost"] },
      { label: "Basement", type: "boolean", option_name: "has_basement", price: prices["basement_cost"] },
      { label: "Pet", type: "boolean", option_name: "has_pet", Icon: DogIcon, price: prices["pet_charge_cost"] },
      { label: "Baseboard", type: "boolean", option_name: "has_baseboard", price: prices["baseboard_cost"], per_square: true },
      { label: "Kitchen Cabinets", type: "boolean", option_name: "has_kitchen_cabinets", price: prices["kitchen_cab_cost"] },
      { label: "Bathroom Cabinets", type: "boolean", option_name: "has_bathroom_cabinets", price: prices["bathroom_cab_cost"] },
      { label: "Change Linens", type: "boolean", option_name: "has_change_linens", price: prices["change_linens_cost"] },
    ],
    [],
  );

  return (
    <section className="w-full py-12">
      <div className="mb-10 flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Personalize Your Cleaning Service</h1>
        <p className="text-muted-foreground">Choose the options that fit your home's needs.</p>
      </div>
      <div className="container grid grid-cols-7 gap-2 md:gap-8">
        <div className="col-span-5 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-5">
          <div className="col-span-5 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-5">
            {options.map(({ type, option_name, ...rest }) => {
              const props = { option_name, map: customOptions, handleOptionChange, ...rest };
              return <Service type={type} key={option_name} {...props} />;
            })}
          </div>
          {/* Text area for special instructions */}
          <div className="col-span-5 mt-10 flex flex-col gap-1">
            <div className="mb-10 flex flex-col gap-1">
              <label className="text-2xl font-bold tracking-tight">Special Instructions</label>
              <p className="text-muted-foreground">Add any special instructions for your cleaning service here.</p>
            </div>
            <textarea className="textarea textarea-bordered h-32 w-full" placeholder="Special Instructions" {...register("instructions")} />
          </div>
        </div>

        <div className="col-span-2 flex flex-col gap-4 md:flex-col md:gap-8">
          <Card>
            <div className="flex items-center gap-4">
              <span className="font-semibold">Subtotal:</span>
              <span className="text-2xl font-bold">${estimate.subtotal}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-semibold">Taxes:</span>
              <span className="text-2xl font-bold">${estimate.taxes}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-semibold">Total Price:</span>
              <span className="text-2xl font-bold">${estimate.total}</span>
            </div>
          </Card>

          <form className="grid grid-cols-5 gap-2">
            <input className="input input-bordered col-span-5" type="text" placeholder="Full Name" {...register("full_name")} />
            <input className="input input-bordered col-span-4" type="text" placeholder="Service Address" {...register("address")} />
            <input className="input input-bordered col-span-1" type="text" placeholder="Unit #" {...register("unit")} />
            <input className="input input-bordered col-span-3" type="text" placeholder="City" {...register("city")} />
            <input className="input input-bordered col-span-1" type="text" placeholder="State" {...register("state")} />
            <input className="input input-bordered col-span-1" type="text" placeholder="Zip" {...register("zip")} />
            <input className="input input-bordered col-span-5" type="tel" placeholder="Phone Number" {...register("phone")} />
          </form>

          <button className="btn btn-primary" onClick={onNext}>
            Request Cleaning
          </button>
        </div>
      </div>
    </section>
  );
};
