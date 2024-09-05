import { useEstimate } from "@/hooks/useEstimate";
import React from "react";
import { useFormContext } from "react-hook-form";
import {
  MicrowaveIcon,
  PlusIcon,
  MinusIcon,
  DogIcon,
  BedIcon,
  CookingPotIcon,
  RefrigeratorIcon,
  CabinetsIcon,
  ContainerIcon,
  WindowIcon,
  BaseboardIcon,
  HomeIcon,
  BathIcon,
  BedFrontIcon,
  RuleIcon,
  DropletIcon,
  BuildingIcon,
  DoorIcon,
} from "@/icons/Icons";

const Button = ({ children, className, ...props }) => (
  <button type="button" className={["btn btn-sm", className].join(" ")} {...props}>
    {children}
  </button>
);

const Card = ({ children, className, ...props }) => (
  <div className="card border bg-base-100 shadow-xl" {...props}>
    <div className={["card-body", className].join(" ")}>{children}</div>
  </div>
);

const Service = ({ option_name, label, handleOptionChange, map, price, per_square, Icon, type }) => {
  const { register, setValue } = useFormContext();

  const value = map[option_name] ? Math.max(map[option_name], 0) : 0;

  const handleOnClick = (option_name, operation) => {
    if (operation === "sum") {
      handleOptionChange(option_name, value + 1);
      setValue(option_name, value + 1);
    }
    if (operation === "subtract") {
      handleOptionChange(option_name, value - 1 < 0 ? 0 : value - 1);
      setValue(option_name, value - 1 < 0 ? 0 : value - 1);
    }
  };

  return (
    <div
      className={[
        "card flex aspect-square cursor-pointer select-none flex-col items-center justify-center gap-2 rounded-lg border p-4 text-center transition-all",
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
          <input type="range" defaultValue={0} min={0} max={10} className="hidden" {...register(option_name)} />
        </div>
      )}
      <span>{label}</span>
      {/* <span className="font-bold">
        ${price} {per_square ? "/sqft" : ""}
      </span> */}
      <span
        className={[
          "absolute bottom-7 font-bold text-white duration-300",
          type === "boolean" && map[option_name] > 0 ? "opacity-100" : "opacity-0",
        ].join(" ")}>
        Yes
      </span>
    </div>
  );
};

export const Services = ({ onNext }) => {
  const { calculate, estimate, prices } = useEstimate();
  const { register, getValues } = useFormContext();
  // const { register } = useForm();

  const data = React.useMemo(getValues, [getValues]);
  const [customOptions, setCustomOptions] = React.useState({ ...data });

  React.useEffect(() => {
    calculate(customOptions);
  }, [customOptions]);

  const handleOptionChange = (option, value) => {
    setCustomOptions((prev) => ({ ...prev, [option]: value }));
  };

  const options = React.useMemo(
    () => [
      { label: "Windows", type: "count", option_name: "window_count", Icon: WindowIcon, price: prices["windows_cost"] },
      { label: "Microwaves", type: "count", option_name: "microwave_count", Icon: MicrowaveIcon, price: prices["microwave_cost"] },
      { label: "Ovens", type: "count", option_name: "oven_count", Icon: CookingPotIcon, price: prices["oven_cost"] },
      {
        label: "Refrigerators",
        type: "count",
        option_name: "refrigerator_count",
        Icon: RefrigeratorIcon,
        price: prices["refrigerator_cost"],
      },
      { label: "Basement", type: "boolean", option_name: "has_basement", Icon: ContainerIcon, price: prices["basement_cost"] },
      { label: "Do you have a pet?", type: "boolean", option_name: "has_pet", Icon: DogIcon, price: prices["pet_charge_cost"] },

      {
        label: "Baseboard",
        type: "boolean",
        option_name: "has_baseboard",
        Icon: BaseboardIcon,
        price: prices["baseboard_cost"],
        per_square: true,
      },
      { label: "Change Linens", type: "boolean", option_name: "has_change_linens", Icon: BedIcon, price: prices["change_linens_cost"] },
      {
        label: "Kitchen Cabinets",
        type: "boolean",
        option_name: "has_kitchen_cabinets",
        Icon: CabinetsIcon,
        price: prices["kitchen_cab_cost"],
      },
      {
        label: "Bathroom Cabinets",
        type: "boolean",
        option_name: "has_bathroom_cabinets",
        Icon: CabinetsIcon,
        price: prices["bathroom_cab_cost"],
      },
    ],
    [],
  );

  return (
    <div className="flex justify-center py-12">
      <div className="container grid grid-cols-7 gap-2 md:gap-8">
        <div className="col-span-5 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-5">
          {/* Services */}
          <div className="col-span-5 flex flex-col gap-1">
            <div className="mb-10 flex flex-col gap-1">
              <h1 className="text-2xl font-bold tracking-tight">Personalize Your Cleaning Service</h1>
              <p className="text-muted-foreground">Choose the options that fit your home's needs.</p>
            </div>
            <div className="col-span-5 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-5">
              {options.map(({ type, option_name, ...rest }) => {
                const props = { option_name, map: customOptions, handleOptionChange, ...rest };
                return <Service type={type} key={option_name} {...props} />;
              })}
            </div>
          </div>

          {/* Special Instructions */}
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
              {data.cleaning_type === "Home" && (
                <>
                  <HomeIcon className="h-6 w-6" />
                  <span className="text-xl font-bold">Home</span>
                </>
              )}
              {data.cleaning_type === "Office" && (
                <>
                  <BuildingIcon className="h-6 w-6" />
                  <span className="text-xl font-bold">Office</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-4">
              <RuleIcon className="h-6 w-6" />
              <span className="text-xl font-bold">
                {data.square_feet - 499} ~ {data.square_feet} /sqft
              </span>
            </div>
            {data.bedroom_count && (
              <div className="flex items-center gap-4">
                <BedFrontIcon className="h-6 w-6" />
                <span className="text-xl font-bold">
                  {data.bedroom_count} Bedroom{data.bedroom_count > 1 ? "s" : ""}
                </span>
              </div>
            )}
            <div className="flex items-center gap-4">
              {data.cleaning_type === "Home" && <BathIcon className="h-6 w-6" />}
              {data.cleaning_type === "Office" && <DoorIcon className="h-6 w-6" />}
              <span className="text-xl font-bold">
                {data.bathroom_count} Bathroom{data.bathroom_count > 1 ? "s" : ""}
              </span>
            </div>

            {data.has_multiple_toilets && (
              <div className="flex items-center gap-4">
                <DropletIcon className="h-6 w-6" />
                <span className="text-xl font-bold">
                  {data.toilet_count} Toilet{data.toilet_count > 1 ? "s" : ""}
                </span>
              </div>
            )}

            <span className="divider" />

            <div className="">
              <div className="flex items-center justify-between gap-4">
                <span className="">Subtotal</span>
                <span className="">${estimate.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="">Taxes</span>
                <span className="">${estimate.taxes.toFixed(2)}</span>
              </div>

              <span className="divider" />

              <div className="mt-3 flex scale-125 items-center justify-between gap-4 rounded-full bg-primary px-5 py-2 text-primary-content">
                <span className="text-lg font-bold">Total:</span>
                <span className="text-lg font-bold">${estimate.total.toFixed(2)}</span>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-5 gap-2">
            <input
              className="input input-bordered col-span-5"
              type="text"
              placeholder="Full Name"
              {...register("full_name", { required: "Please enter your full name" })}
            />
            <input
              className="input input-bordered col-span-4"
              type="text"
              placeholder="Service Address"
              {...register("address", { required: "Please enter your address" })}
            />
            <input className="input input-bordered col-span-1" type="text" placeholder="Unit #" {...register("unit")} />
            <input
              className="input input-bordered col-span-3"
              type="text"
              placeholder="City"
              {...register("city", { required: "Please enter your city" })}
            />
            <input
              className="input input-bordered col-span-1"
              type="text"
              placeholder="State"
              {...register("state", { required: "Please enter your state" })}
            />
            <input
              className="input input-bordered col-span-1"
              type="text"
              placeholder="Zip"
              {...register("zip", { required: "Please enter your zip" })}
            />
            <input
              className="input input-bordered col-span-5"
              type="tel"
              placeholder="Phone Number"
              {...register("phone", { required: "Please enter your phone" })}
            />
          </div>

          <button type="submit" className="btn text-xl">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};
