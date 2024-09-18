import React from "react";
import { HomeIcon, BuildingIcon, StoreIcon } from "@/icons/Icons";
import { useFormContext } from "react-hook-form";
import { facilitiesSubCategories, residentialSubCategories, workplaceSubCategories } from "@/utils/calculateEstimate";
import { CleaningCategory } from "@/types/cleaningTypes";
import { FormValues } from "@/types/bookingTypes";

const Card = (props: { children: React.ReactNode; className?: string; selected?: boolean }) => {
  const { children, className, selected, ...rest } = props;
  return (
    <div className={["card max-w-sm bg-base-100 shadow-xl transition-colors", selected ? "bg-primary text-white" : ""].join(" ")} {...rest}>
      <div className={["card-body", className].join(" ")}>{children}</div>
    </div>
  );
};

const InputCN = { className: "input input-bordered w-full " };

export const Cleaning = () => {
  const { register, reset, watch } = useFormContext();
  const [selected, setSelected] = React.useState<CleaningCategory>();

  const handleCardChange = (value: CleaningCategory) => {
    reset({ service: { cleaning_category: value, service_frequency: "ONE_TIME" } } as Partial<FormValues>);
    setSelected(value);
  };

  return (
    <div className={["mt-10 h-full flex-1"].join(" ")}>
      <div className="flex flex-col items-center gap-10">
        <label className="label text-xl">Select the Cleaning Service You Need</label>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card
            selected={selected === CleaningCategory.Residential}
            className={"flex cursor-pointer flex-col items-center justify-center gap-4 p-6 text-center"}>
            <HomeIcon className="h-12 w-12" />
            <h1 className="text-xl font-semibold">Residential</h1>
            <p className="text-muted-foreground">Get a quote for your residential cleaning needs.</p>
            <div className="flex flex-row flex-wrap justify-center gap-1">
              {residentialSubCategories.map((sub_category) => (
                <span className="badge capitalize" key={sub_category}>
                  {sub_category.toLowerCase()}
                </span>
              ))}
            </div>
            <button type="button" className="btn mt-4 w-full" onClick={() => handleCardChange(CleaningCategory.Residential)}>
              Select
            </button>
          </Card>

          <Card selected={selected === CleaningCategory.Commercial} className="flex cursor-pointer flex-col items-center gap-4 p-6">
            <BuildingIcon className="h-12 w-12" />

            <h2 className="text-xl font-semibold">Commercial</h2>
            <p className="text-muted-foreground text-center">Keep your workspace clean and professional.</p>
            <div className="flex flex-row flex-wrap justify-center gap-1">
              {workplaceSubCategories.map((sub_category) => (
                <span className="badge capitalize" key={sub_category}>
                  {sub_category.toLowerCase()}
                </span>
              ))}
            </div>
            <button type="button" className="btn mt-4 w-full" onClick={() => handleCardChange(CleaningCategory.Commercial)}>
              Select
            </button>
          </Card>

          <Card selected={selected === CleaningCategory.Other} className="flex cursor-pointer flex-col items-center gap-4 p-6">
            <StoreIcon className="h-12 w-12" />
            <h2 className="text-xl font-semibold">Facilities & Events</h2>
            <p className="text-muted-foreground text-center">Keep your facilities and event spaces clean and safe.</p>
            <div className="flex flex-row flex-wrap justify-center gap-1">
              {facilitiesSubCategories.map((sub_category) => (
                <span className="badge capitalize" key={sub_category}>
                  {sub_category.toLowerCase()}
                </span>
              ))}
            </div>

            <button type="button" className="btn mt-4 w-full" onClick={() => handleCardChange(CleaningCategory.Other)}>
              Select
            </button>
          </Card>
        </div>

        <div className="flex w-full flex-col items-center gap-4">
          <div className="grid w-full grid-cols-1 items-start gap-4 px-10 md:w-auto md:grid-cols-3">
            {(selected === CleaningCategory.Residential || selected === CleaningCategory.Commercial) && (
              <div className="grid gap-2">
                <label className="label">Square footage</label>
                <select
                  className="select select-bordered"
                  {...register("service.square_feet", {
                    validate: (value) => value > 499 || "This field is required",
                    valueAsNumber: true,
                  })}
                  defaultValue={0}>
                  <option disabled value={0}>
                    Estimated square feet
                  </option>
                  {new Array(10).fill("").map((_, i) => (
                    <option key={(i + 1) * 500} value={(i + 1) * 500}>
                      {i * 500 + 1} ~ {(i + 1) * 500} sq/ft
                    </option>
                  ))}
                </select>
              </div>
            )}
            {selected === CleaningCategory.Residential && (
              <div className="grid gap-2">
                <label className="label">Number of Bedrooms</label>
                <select
                  className="select select-bordered"
                  {...register("service.bedroom_count", {
                    value: 0,
                    validate: (value) => value > 0 || "This field is required",
                    valueAsNumber: true,
                  })}>
                  <option disabled value={0}>
                    Number of bedrooms
                  </option>
                  {new Array(10).fill("").map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} Bedrooms
                    </option>
                  ))}
                </select>
              </div>
            )}
            {(selected === CleaningCategory.Residential || selected === CleaningCategory.Commercial) && (
              <div className="relative grid gap-2">
                <label className="label">Number of Bathrooms</label>
                <select
                  defaultValue={0}
                  className="select select-bordered"
                  {...register("service.bathroom_count", {
                    value: 0,
                    validate: (value) => value > 0 || "This field is required",
                    valueAsNumber: true,
                  })}>
                  <option disabled value={0}>
                    Number of bathrooms
                  </option>
                  {new Array(10).fill("").map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} Bathrooms
                    </option>
                  ))}
                </select>
                {selected === CleaningCategory.Commercial && (
                  <label className="label-text flex flex-1 flex-row items-center gap-2">
                    <input type="checkbox" {...register("service.has_multiple_toilets")} className="checkbox" />
                    These bathrooms have more than one toilet?
                  </label>
                )}
              </div>
            )}
            {selected === CleaningCategory.Commercial && (
              <div className="grid gap-2">
                <label className="label">Number of Toilets</label>
                <input
                  type="number"
                  placeholder="Total number of toilets"
                  className="input input-bordered"
                  min={0}
                  {...register("service.toilet_count", {
                    value: 0,
                    disabled: !watch("service.has_multiple_toilets"),
                    validate: (value) => value > 0 || "This field is required",
                  })}
                />
              </div>
            )}

            {selected === CleaningCategory.Other && (
              <div className="grid gap-2">
                <label className="label" htmlFor="email">
                  Email
                </label>
                <input {...InputCN} id="email" type="email" placeholder="Email" {...register("email")} />
              </div>
            )}
            {selected === CleaningCategory.Other && (
              <div className="grid gap-2">
                <label className="label" htmlFor="phone">
                  Phone
                </label>
                <input {...InputCN} id="phone" type="tel" placeholder="Phone" {...register("contact.phone")} />
              </div>
            )}
            {selected === CleaningCategory.Other && (
              <div className="grid gap-2">
                <label className="label" htmlFor="name">
                  Company Name
                </label>
                <input {...InputCN} id="name" type="text" placeholder="Name" {...register("contact.company_name")} />
              </div>
            )}
          </div>

          <button type="submit" className={["btn btn-wide mt-7", !selected ? "btn-disabled" : ""].join(" ")}>
            {selected === CleaningCategory.Other ? "Contact Us" : "Get Quote"}
          </button>
        </div>
      </div>
    </div>
  );
};
