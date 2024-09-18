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
import { Step } from ".";
import { CleaningCategory, CleaningItems, CleaningItemsKeys } from "@/types/cleaningTypes";
import { FormValues } from "@/types/bookingTypes";

const Card = ({ children, className, ...props }: React.ComponentProps<"div">) => (
  <div className="card border bg-base-100 shadow-xl" {...props}>
    <div className={["card-body", className].join(" ")}>{children}</div>
  </div>
);

type ServiceOption = {
  label: string;
  type: "count" | "boolean";
  option_name: CleaningItemsKeys;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  price: number;
};

interface ServiceProps {
  label: string;
  type: "count" | "boolean";
  option_name: CleaningItemsKeys;
  price: number;
  handleOptionChange: (option_name: CleaningItemsKeys, value: any) => void;
  map: CleaningItems;
  per_square?: boolean;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const Service = ({ option_name, label, handleOptionChange, map, price, per_square, Icon, type }: ServiceProps) => {
  const { register, setValue } = useFormContext();
  const option_value: number = map[option_name] as number;
  const option_value_form_context = `service.${option_name}`;

  const value = option_value ? Math.max(option_value, 0) : 0;

  const handleOnClick = (option_name: CleaningItemsKeys, operation: "sum" | "subtract") => {
    if (operation === "sum") {
      handleOptionChange(option_name, value + 1);
      setValue(option_value_form_context, value + 1);
    }
    if (operation === "subtract") {
      handleOptionChange(option_name, value - 1 < 0 ? 0 : value - 1);
      setValue(option_value_form_context, value - 1 < 0 ? 0 : value - 1);
    }
  };

  const MinusButton = ({ className, size = "sm" }: { className?: string; size?: string }) => (
    <button
      type="button"
      className={[`btn btn-circle btn-${size} flex items-center p-1`, className].join(" ")}
      onClick={() => handleOnClick(option_name, "subtract")}>
      <MinusIcon className="h-5 w-5" />
    </button>
  );

  const PlusButton = ({ className, size = "sm" }: { className?: string; size?: string }) => (
    <button
      type="button"
      className={[`btn btn-circle btn-${size} flex items-center p-1`, className].join(" ")}
      onClick={() => handleOnClick(option_name, "sum")}>
      <PlusIcon className="h-5 w-5" />
    </button>
  );

  return (
    <div
      className={[
        "card flex cursor-pointer select-none flex-row items-center justify-between gap-3 rounded-lg border p-4 text-center transition-all lg:aspect-square lg:justify-center",
        option_value > 0 ? "bg-primary text-white" : "",
      ].join(" ")}
      onClick={() => type === "boolean" && handleOptionChange(option_name, !option_value)}>
      <div className="flex flex-row items-center justify-center gap-2 rounded-lg lg:flex-col">
        {Icon && <Icon className="h-12 w-12" />}
        {type === "count" && (
          <div className="flex items-center gap-2">
            <MinusButton className="hidden lg:block" />
            <span className="text-xl font-bold">{value}</span>
            <PlusButton className="hidden lg:block" />

            <input
              type="range"
              defaultValue={0}
              min={0}
              max={10}
              className="hidden"
              {...register(option_value_form_context, { valueAsNumber: true })}
            />
          </div>
        )}
        <span>{label}</span>
        <span
          className={["font-bold text-white duration-300", type === "boolean" && option_value > 0 ? "opacity-100" : "opacity-0"].join(" ")}>
          {type === "boolean" && option_value > 0 ? "Yes" : ""}
        </span>
      </div>

      <span className="flex flex-row gap-3">
        {type === "count" && <MinusButton className="block lg:hidden" size="sm" />}
        {type === "count" && <PlusButton className="block lg:hidden" size="sm" />}
      </span>
    </div>
  );
};

export const Services = ({ onNext }: Step) => {
  const { calculate, estimate, prices } = useEstimate();
  const { register, getValues } = useFormContext();

  const { service } = React.useMemo(getValues as unknown as () => FormValues, [getValues]);
  const [customOptions, setCustomOptions] = React.useState({ ...service });

  React.useEffect(() => {
    calculate(customOptions);
  }, [customOptions]);

  const handleOptionChange = (option: CleaningItemsKeys, value: any) => {
    setCustomOptions((prev) => ({ ...prev, [option]: value }));
  };

  const options = React.useMemo(
    () =>
      [
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
        { label: "Basement", type: "boolean", option_name: "includes_basement", Icon: ContainerIcon, price: prices["basement_cost"] },
        { label: "Do you have a pet?", type: "boolean", option_name: "pet_present", Icon: DogIcon, price: prices["pet_charge_cost"] },

        {
          label: "Baseboard",
          type: "boolean",
          option_name: "includes_baseboard_cleaning",
          Icon: BaseboardIcon,
          price: prices["baseboard_cost"],
          per_square: true,
        },
        {
          label: "Change Linens",
          type: "boolean",
          option_name: "includes_linen_change",
          Icon: BedIcon,
          price: prices["change_linens_cost"],
        },
        {
          label: "Kitchen Cabinets",
          type: "boolean",
          option_name: "includes_kitchen_cabinet_cleaning",
          Icon: CabinetsIcon,
          price: prices["kitchen_cab_cost"],
        },
        {
          label: "Bathroom Cabinets",
          type: "boolean",
          option_name: "includes_bathroom_cabinet_cleaning",
          Icon: CabinetsIcon,
          price: prices["bathroom_cab_cost"],
        },
      ] as ServiceOption[],
    [],
  );

  return (
    <div className="flex justify-center py-12">
      <div className="container grid grid-cols-1 gap-20 px-8 lg:grid-cols-7 lg:gap-8">
        <div className="col-span-1 grid grid-cols-1 gap-20 lg:col-span-5 lg:grid-cols-5">
          {/* Services */}
          <div className="col-span-1 flex flex-col gap-1 lg:col-span-5">
            <div className="mb-10 flex flex-col gap-1">
              <h1 className="text-2xl font-bold tracking-tight">Personalize Your Cleaning Service</h1>
              <p className="text-muted-foreground">Choose the options that fit your home's needs.</p>
            </div>
            <div className="col-span-5 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
              {options.map(({ type, option_name, ...props }) => {
                return (
                  <Service
                    type={type}
                    key={option_name}
                    option_name={option_name}
                    map={customOptions}
                    handleOptionChange={handleOptionChange}
                    {...props}
                  />
                );
              })}
            </div>
          </div>

          {/* Special Instructions */}
          <div className="col-span-1 flex flex-col gap-1 lg:col-span-5">
            <div className="mb-10 flex flex-col gap-1">
              <label className="text-2xl font-bold tracking-tight">Special Instructions</label>
              <p className="text-muted-foreground">Add any special instructions for your cleaning service here.</p>
            </div>
            <textarea
              className="textarea textarea-bordered h-56 w-full lg:h-36"
              placeholder="Special Instructions"
              {...register("service.special_requests")}
            />
          </div>
        </div>

        {/* Right Side - Estimated Cost */}
        <div className="col-span-1 flex flex-col gap-4 lg:col-span-2 lg:flex-col lg:gap-8">
          <Card>
            <div className="flex items-center gap-4">
              {service.cleaning_category === CleaningCategory.Residential && (
                <>
                  <HomeIcon className="h-6 w-6" />
                  <span className="text-xl font-bold">{CleaningCategory.Residential}</span>
                </>
              )}
              {service.cleaning_category === CleaningCategory.Commercial && (
                <>
                  <BuildingIcon className="h-6 w-6" />
                  <span className="text-xl font-bold">{CleaningCategory.Commercial}</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-4">
              <RuleIcon className="h-6 w-6" />
              <span className="text-xl font-bold">
                {service.square_feet - 499} ~ {service.square_feet} /sqft
              </span>
            </div>

            {service.bedroom_count && (
              <div className="flex items-center gap-4">
                <BedFrontIcon className="h-6 w-6" />
                <span className="text-xl font-bold">
                  {service.bedroom_count} Bedroom{service.bedroom_count > 1 ? "s" : ""}
                </span>
              </div>
            )}

            <div className="flex items-center gap-4">
              {service.cleaning_category === CleaningCategory.Residential && <BathIcon className="h-6 w-6" />}
              {service.cleaning_category === CleaningCategory.Commercial && <DoorIcon className="h-6 w-6" />}
              <span className="text-xl font-bold">
                {service.bathroom_count} Bathroom{(service.bathroom_count ?? 0) > 1 ? "s" : ""}
              </span>
            </div>

            {service.has_multiple_toilets && (
              <div className="flex items-center gap-4">
                <DropletIcon className="h-6 w-6" />
                <span className="text-xl font-bold">
                  {service.toilet_count} Toilet{(service.toilet_count ?? 0) > 1 ? "s" : ""}
                </span>
              </div>
            )}

            <span className="divider" />

            <div>
              {/* <div className="flex items-center justify-between gap-4">
                <span className="">Subtotal</span>
                <span className="">${estimate.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="">Taxes</span>
                <span className="">${estimate.taxes.toFixed(2)}</span>
              </div> */}

              {/* <span className="divider" /> */}

              <div className="flex scale-125 items-center justify-between gap-4 rounded-full bg-primary px-5 py-2 text-primary-content sm:scale-110 lg:scale-125">
                <span className="text-lg font-bold">Total:</span>
                <span className="text-lg font-bold">${estimate.subtotal.toFixed(2)}</span>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-5 gap-2">
            <input
              className="input input-bordered col-span-5"
              type="text"
              placeholder="Full Name"
              {...register("contact.full_name", { required: "Please enter your full name" })}
            />
            <input
              className="input input-bordered col-span-4"
              type="text"
              placeholder="Service Address"
              {...register("address.street", { required: "Please enter your address" })}
            />
            <input className="input input-bordered col-span-1" type="text" placeholder="Unit #" {...register("address.unit")} />
            <input
              className="input input-bordered col-span-3"
              type="text"
              placeholder="City"
              {...register("address.city", { required: "Please enter your city" })}
            />
            <input
              className="input input-bordered col-span-1"
              type="text"
              placeholder="State"
              {...register("address.state", { required: "Please enter your state" })}
            />
            <input
              className="input input-bordered col-span-1"
              type="text"
              placeholder="Zip"
              {...register("address.zip", { required: "Please enter your zip" })}
            />
            <input
              className="input input-bordered col-span-5"
              type="email"
              placeholder="Email"
              {...register("contact.email", { required: "Please enter your email" })}
            />
            <input
              className="input input-bordered col-span-5"
              type="tel"
              placeholder="Phone Number"
              {...register("contact.phone", { required: "Please enter your phone" })}
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
