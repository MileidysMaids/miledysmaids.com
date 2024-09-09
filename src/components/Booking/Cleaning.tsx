import React from "react";
import { HomeIcon, BuildingIcon, StoreIcon } from "@/icons/Icons";
import { useFormContext } from "react-hook-form";

const Card = ({ children, className, selected, ...props }) => (
  <div className={["card w-96 bg-base-100 shadow-xl transition-colors", selected ? "bg-primary text-white" : ""].join(" ")} {...props}>
    <div className={["card-body", className].join(" ")}>{children}</div>
  </div>
);

const Label = ({ children, className, ...props }) => (
  <label className={["label", className].join(" ")} {...props}>
    {children}
  </label>
);

const InputCN = { className: "input input-bordered w-full max-w-xs" };

export const Cleaning = ({ onNext }) => {
  const { register, reset, watch } = useFormContext();
  const [selected, setSelected] = React.useState("Residential");

  const handleCardChange = (value) => {
    reset({ cleaning_type: value });
    setSelected(value);
  };

  return (
    <div className={["mt-10 h-full flex-1"].join(" ")}>
      <div className="flex flex-col items-center gap-10">
        <label className="text-xl">Select the Cleaning Service You Need</label>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card
            selected={selected === "Residential"}
            className={"flex cursor-pointer flex-col items-center justify-center gap-4 p-6 text-center"}>
            <HomeIcon className="h-12 w-12" />
            <h1 className="text-xl font-semibold">Residential</h1>
            <p className="text-muted-foreground">Get a quote for your residential cleaning needs.</p>
            <button type="button" className="btn mt-4 w-full" onClick={() => handleCardChange("Residential")}>
              Select
            </button>
          </Card>

          <Card selected={selected === "Office"} className="flex cursor-pointer flex-col items-center gap-4 p-6">
            <BuildingIcon className="h-12 w-12" />
            <h2 className="text-xl font-semibold">Office</h2>
            <p className="text-muted-foreground text-center">Keep your workspace clean and professional.</p>
            <button type="button" className="btn mt-4 w-full" onClick={() => handleCardChange("Office")}>
              Select
            </button>
          </Card>

          <Card selected={selected === "Commercial"} className="flex cursor-pointer flex-col items-center gap-4 p-6">
            <StoreIcon className="h-12 w-12" />
            <h2 className="text-xl font-semibold">Commercial</h2>
            <p className="text-muted-foreground text-center">Maintain a clean and professional environment.</p>
            <button type="button" className="btn mt-4 w-full" onClick={() => handleCardChange("Commercial")}>
              Select
            </button>
          </Card>
        </div>

        <div className="flex flex-col items-center justify-center gap-4">
          <div className="grid grid-cols-3 gap-4 py-10">
            {(selected === "Residential" || selected === "Office") && (
              <div className="grid gap-2">
                <Label>Square footage</Label>
                <select
                  className="select select-bordered"
                  {...register("service.square_feet", {
                    validate: (value) => value > 499 || "This field is required",
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
            {selected === "Residential" && (
              <div className="grid gap-2">
                <Label>Number of Bedrooms</Label>
                <select
                  className="select select-bordered"
                  {...register("service.bedroom_count", { value: 0, validate: (value) => value > 0 || "This field is required" })}>
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
            {(selected === "Residential" || selected === "Office") && (
              <div className="relative grid gap-2">
                <Label>Number of Bathrooms</Label>
                <select
                  defaultValue={0}
                  className="select select-bordered"
                  {...register("service.bathroom_count", { value: 0, validate: (value) => value > 0 || "This field is required" })}>
                  <option disabled value={0}>
                    Number of bathrooms
                  </option>
                  {new Array(10).fill("").map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} Bathrooms
                    </option>
                  ))}
                </select>
                {selected === "Office" && (
                  <label className="flex-1flex-row label-text absolute -bottom-14 flex gap-2">
                    <input type="checkbox" {...register("service.has_multiple_toilets")} className="checkbox" />
                    These bathrooms have more than one toilet?
                  </label>
                )}
              </div>
            )}
            {selected === "Office" && (
              <div className="grid gap-2">
                <Label>Number of Toilets</Label>
                <input
                  type="number"
                  placeholder="Total number of toilets"
                  className="input input-bordered w-full max-w-xs"
                  min={0}
                  {...register("service.toilet_count", {
                    value: 0,
                    disabled: !watch("has_multiple_toilets"),
                    validate: (value) => value > 0 || "This field is required",
                  })}
                />
              </div>
            )}

            {selected === "Commercial" && (
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <input {...InputCN} id="email" type="email" placeholder="Email" {...register("email")} />
              </div>
            )}
            {selected === "Commercial" && (
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <input {...InputCN} id="phone" type="tel" placeholder="Phone" {...register("contact.phone")} />
              </div>
            )}
            {selected === "Commercial" && (
              <div className="grid gap-2">
                <Label htmlFor="name">Company Name</Label>
                <input {...InputCN} id="name" type="text" placeholder="Name" {...register("contact.company_name")} />
              </div>
            )}
          </div>

          <button type="submit" className={["btn btn-wide mt-7", !selected ? "btn-disabled" : ""].join(" ")}>
            {selected === "Commercial" ? "Contact Us" : "Get Quote"}
          </button>
        </div>
      </div>
    </div>
  );
};
