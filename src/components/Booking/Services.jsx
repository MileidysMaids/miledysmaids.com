import { useEstimate } from "@/hooks/useEstimate";
import React from "react";
import { useState } from "react";
import { MicrowaveIcon, PlusIcon, MinusIcon, DogIcon } from "@/icons/Icons";

const Button = ({ children, className, ...props }) => (
  <div className={["btn btn-sm", className].join(" ")} {...props}>
    {children}
  </div>
);

const Card = ({ children, className, ...props }) => (
  <div className="card bg-base-100 shadow-xl" {...props}>
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
      {Icon && <Icon className="h-8 w-8" />}
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
      <span className="font-bold">
        ${price} {per_square ? "/sqft" : ""}
      </span>
    </div>
  );
};

export const Services = ({ onNext, onBack }) => {
  const [customOptions, setCustomOptions] = useState({});
  const { calculate, estimate, prices } = useEstimate();

  const handleOptionChange = (option, value) => {
    setCustomOptions((prev) => ({ ...prev, [option]: value }));
  };

  React.useEffect(() => {
    calculate(customOptions);
  }, [customOptions]);

  const options = [
    { label: "Windows", type: "count", option_name: "window_count", Icon: MicrowaveIcon, price: prices["windows_cost"] },
    { label: "Ovens", type: "count", option_name: "oven_count", price: prices["oven_cost"] },
    { label: "Refrigerators", type: "count", option_name: "refrigerator_count", price: prices["refrigerator_cost"] },
    { label: "Microwaves", type: "count", option_name: "microwave_count", Icon: MicrowaveIcon, price: prices["microwave_cost"] },
    { label: "Basement", type: "boolean", option_name: "has_basement", price: prices["basement_cost"] },
    { label: "Pet", type: "boolean", option_name: "has_pet", Icon: DogIcon, price: prices["pet_charge_cost"] },
    { label: "Baseboard", type: "boolean", option_name: "has_baseboard", price: prices["baseboard_cost"], per_square: true },
    { label: "Kitchen Cabinets", type: "boolean", option_name: "has_kitchen_cabinets", price: prices["kitchen_cab_cost"] },
    { label: "Bathroom Cabinets", type: "boolean", option_name: "has_bathroom_cabinets", price: prices["bathroom_cab_cost"] },
    { label: "Change Linens", type: "boolean", option_name: "has_change_linens", price: prices["change_linens_cost"] },
  ];

  const ServicesRender = () => {
    return options.map(({ type, option_name, ...rest }) => {
      const props = { option_name, map: customOptions, handleOptionChange, ...rest };

      return <Service type={type} key={option_name} {...props} />;
    });
  };

  return (
    <section className="w-full py-12">
      <div className="mb-10 flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Personalize Your Cleaning Service</h1>
        <p className="text-muted-foreground">Choose the options that fit your home's needs.</p>
      </div>
      <div className="container grid grid-cols-5 gap-6 md:gap-8">
        <div className="col-span-3 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          <ServicesRender />
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
        </div>
      </div>

      <div className="flex justify-end">
        <Button size="lg" onClick={onNext}>
          Request Cleaning
        </Button>
      </div>
    </section>
  );
};
