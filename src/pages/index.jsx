import * as React from "react";
import { useForm } from "react-hook-form";
import "@/styles/background.css";
import landing_page_foto_1 from "@/images/landing-page-1.jpg";
import landing_page_foto_2 from "@/images/landing-page-2.jpg";
import landing_page_foto_3 from "@/images/landing-page-3.jpg";
import shine from "../images/svg/shine.svg";
import { Script } from "gatsby";
import { useEstimate } from "@/hooks/useEstimate";

const defaultValues = {
  bedroom_count: 1,
  bathroom_count: 1,
  square_feet: 500,
};

export default function IndexPage({ injectedClassNames }) {
  const { estimate, calculate } = useEstimate({ defaultValues });
  const { register, handleSubmit } = useForm({ defaultValues });

  // Calculate estimate on page load
  React.useEffect(() => {
    calculate(defaultValues);
  }, []);

  const onSubmit = (data) => {
    // Convert string values to numbers
    Object.keys(data).forEach((key) => {
      data[key] = Number(data[key]);
    });

    calculate({ ...data });
  };

  return (
    <>
      <section
        id="landing-page"
        className={[
          injectedClassNames,
          "background-svg bottom-oval flex w-full flex-grow flex-col items-center justify-center gap-5 border-r p-5 pt-40 sm:h-screen md:gap-10 md:pt-5",
        ].join(" ")}>
        <h1 className="text-2xl font-bold md:text-7xl">Give your home some shine</h1>

        <p className="hidden px-10 text-lg text-primary-content md:block md:text-3xl">
          Reliable house cleaning professionals serving the greater Atlanta area
        </p>

        <p className="text-xl font-semibold text-primary-content drop-shadow-2xl md:hidden md:px-10 md:text-3xl">
          Book in less than 1 minute!
        </p>

        <form onChange={handleSubmit(onSubmit)} className="flex w-full flex-col items-center justify-center gap-5 py-10 md:flex-row">
          <select
            {...register("bedroom_count")}
            className="select select-secondary w-full max-w-xs bg-secondary/10 font-semibold text-secondary">
            <option disabled value={0}>
              Number of bedrooms
            </option>
            {new Array(10).fill("").map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} Bedroom
              </option>
            ))}
          </select>

          <select
            {...register("bathroom_count")}
            className="select select-secondary w-full max-w-xs bg-secondary/10 font-semibold text-secondary">
            <option disabled value={0}>
              Number of bathrooms
            </option>
            {new Array(10).fill("").map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} Bathroom
              </option>
            ))}
          </select>

          <select
            {...register("square_feet")}
            className="select select-secondary w-full max-w-xs bg-secondary/10 font-semibold text-secondary">
            <option disabled value={0}>
              Estimated square feet
            </option>
            {new Array(10).fill("").map((_, i) => (
              <option key={(i + 1) * 500} value={(i + 1) * 500}>
                {i * 500} ~ {(i + 1) * 500} sq/ft
              </option>
            ))}
          </select>
        </form>

        <a
          className="btn glass btn-warning text-wrap text-secondary md:btn-md lg:btn-lg"
          data-token="50a11f3204e740a39e0971a66f897904"
          data-orgname="Mileidys-Maids"
          href="/service/booking">
          Schedule it! - <span className="text-xl font-bold text-accent">${estimate.subtotal}</span>
          <span className="-translate-x-2 translate-y-1 text-xs">/cleaning</span>
          <object
            className="absolute -right-2 -top-5 h-10 w-7 animate-[pulse_1s_infinite]"
            data={shine}
            type="image/svg+xml"
            aria-label="shine"
          />
          <object
            className="absolute -right-4 -top-7 h-10 w-3 animate-[pulse_2s_infinite]"
            data={shine}
            type="image/svg+xml"
            aria-label="shine"
          />
          <object
            className="absolute -right-7 -top-4 h-10 w-4 animate-[pulse_3s_infinite]"
            data={shine}
            type="image/svg+xml"
            aria-label="shine"
          />
        </a>

        <div className="my-10 flex flex-row sm:hidden sm:gap-10">
          <img className="mask mask-squircle relative left-0 w-96 md:-top-10" src={landing_page_foto_1} alt="cleaning service" />
          <img className="relative left-0 top-0 hidden w-96 rounded-full md:block" src={landing_page_foto_2} alt="cleaning service" />
          <img className="relative left-0 top-10 hidden w-96 rounded-full md:block" src={landing_page_foto_3} alt="cleaning service" />
        </div>
      </section>

      <div className="flex justify-center">
        <h1 className="text-4xl font-light">
          Call now <span className="font-bold text-accent">(770) 610-3339</span>
        </h1>
      </div>
    </>
  );
}

export const Head = () => (
  <>
    <title>Home Page</title>

    {/* Scripts */}
    <script async src="https://online-booking.housecallpro.com/script.js?token=50a11f3204e740a39e0971a66f897904&orgName=Mileidys-Maids" />
  </>
);
