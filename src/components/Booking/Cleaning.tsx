import React from "react";
import { HomeIcon, BuildingIcon, StoreIcon } from "@/icons/Icons";
import { useFormContext } from "react-hook-form";
import { facilitiesSubCategories, residentialSubCategories, workplaceSubCategories } from "@/utils/calculateEstimate";
import { CleaningCategory } from "@/types/cleaningTypes";
import { FormValues } from "@/types/bookingTypes";
import { motion } from "framer-motion";
import { safeLocalStorage } from "@/utils/localStorage";

const Card = (props: { children: React.ReactNode; className?: string; selected?: boolean }) => {
  const { children, className, selected, ...rest } = props;
  return (
    <div
      className={[
        "card max-w-sm border bg-base-100 shadow-xl transition-colors",
        selected ? "border-[2px] border-primary text-white" : "",
      ].join(" ")}
      {...rest}>
      <div className={["card-body", className].join(" ")}>{children}</div>
    </div>
  );
};

// 1. Get a quote for your residential cleaning needs.

type CardDetailsProps = {
  type: CleaningCategory;
  selected: boolean;
  handleCardChange: (value: CleaningCategory) => void;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const CardDetails = ({ selected, type, handleCardChange, title, description, icon }: CardDetailsProps) => {
  const subCategories = React.useMemo(() => {
    switch (type) {
      case CleaningCategory.Residential:
        return residentialSubCategories;
      case CleaningCategory.Commercial:
        return workplaceSubCategories;
      case CleaningCategory.Other:
        return facilitiesSubCategories;
      default:
        return [];
    }
  }, []);

  return (
    <Card selected={selected} className={"flex cursor-pointer flex-col items-center justify-center gap-4 p-6 text-center text-secondary"}>
      <div className="text-accent">{icon}</div>
      <h1 className="text-xl font-normal">{title}</h1>
      <p className="text-muted-foreground opacity-90">{description}</p>
      <div className="flex flex-row flex-wrap justify-center gap-1">
        {subCategories.map((sub_category) => (
          <span className="px-2 text-sm font-normal capitalize opacity-75" key={sub_category}>
            {sub_category.toLowerCase()}
          </span>
        ))}
      </div>
      <button type="button" className="btn btn-primary mt-4 w-full" onClick={() => handleCardChange(type)}>
        Select
      </button>
    </Card>
  );
};

const InputCN = { className: "input input-bordered w-full " };

export const Cleaning = () => {
  const { register, reset, watch } = useFormContext();
  const [selected, setSelected] = React.useState<CleaningCategory>();

  const modalRef = React.useRef<HTMLDialogElement>(null);

  const handleCardChange = (value: CleaningCategory) => {
    if (modalRef.current) {
      modalRef.current.showModal();

      // Load data from local storage
      const storedData = JSON.parse(safeLocalStorage.getItem(`formData`) ?? `{}`);

      reset({
        ...storedData,
        service: { cleaning_category: value, service_frequency: "ONE_TIME", ...storedData.service },
      } as Partial<FormValues>);
      setSelected(value);
    }
  };

  const handleContactForm = () => {
    if (selected === CleaningCategory.Other) return (window.location.href = "/");
  };

  return (
    <>
      <div className={["flex flex-1 items-center justify-center"].join(" ")}>
        <div className="flex flex-col items-center gap-10">
          <div className="mt-10 flex w-full justify-center md:mt-10">
            <label className="label text-xl font-bold">Select the Cleaning Service You Need</label>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1 + 1 * 0.3 }}>
              <CardDetails
                icon={<HomeIcon className="h-10 w-10" />}
                selected={selected === CleaningCategory.Residential}
                type={CleaningCategory.Residential}
                handleCardChange={handleCardChange}
                title="Residential"
                description="Get a quote for your residential cleaning needs."
              />
            </motion.div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1 + 2 * 0.3 }}>
              <CardDetails
                icon={<BuildingIcon className="h-10 w-10" />}
                selected={selected === CleaningCategory.Commercial}
                type={CleaningCategory.Commercial}
                handleCardChange={handleCardChange}
                title="Commercial"
                description="Keep your workspace clean and professional."
              />
            </motion.div>

            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1 + 3 * 0.3 }}>
              <CardDetails
                icon={<StoreIcon className="h-10 w-10" />}
                selected={selected === CleaningCategory.Other}
                type={CleaningCategory.Other}
                handleCardChange={handleCardChange}
                title="Facilities & Events"
                description="Keep your facilities and event spaces clean and safe."
              />
            </motion.div>
          </div>
        </div>
      </div>

      <dialog ref={modalRef} id="modal" className="modal">
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
        <div className="modal-box flex flex-col gap-6">
          {/* Title */}
          <div className="flex flex-row items-center justify-between">
            <h3 className="text-lg font-bold">Cleaning Service</h3>
            <h4 className="text-lg font-semibold">{selected}</h4>
          </div>

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

          <button
            type={selected === CleaningCategory.Other ? "button" : "submit"}
            onClick={handleContactForm}
            className={["btn mt-7 w-full", !selected ? "btn-disabled" : ""].join(" ")}>
            {selected === CleaningCategory.Other ? "Contact Us" : "Get Quote"}
          </button>
        </div>
      </dialog>
    </>
  );
};
