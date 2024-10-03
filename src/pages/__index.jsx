import * as React from "react";
import "../styles/background.css";
import landing_page_foto_1 from "../images/landing-page-1.jpg";
import landing_page_foto_2 from "../images/landing-page-2.jpg";
import landing_page_foto_3 from "../images/landing-page-3.jpg";
import shine from "../images/svg/shine.svg";
import { CalculatorIcon } from "../icons/Icons";
import { Layout } from "../components/Layout";

export default function IndexPage() {
  return (
    <Layout>
      <section
        id="landing-page"
        className="background-svg bottom-oval flex w-full flex-grow flex-col items-center justify-center gap-5 border-r p-5 pt-40 md:h-screen md:gap-10 md:pt-5">
        <h1 className="text-2xl font-bold md:text-7xl">Give your home some shine</h1>
        <p className="px-10 text-lg text-primary-content md:text-3xl">
          Reliable house cleaning professionals serving the greater Atlanta area
        </p>

        <div className="relative rounded-xl border-[3px] border-success bg-transparent shadow-lg md:my-5">
          <a className="btn glass btn-warning text-wrap text-secondary md:btn-md lg:btn-lg">
            <span className="w-7">
              <CalculatorIcon />
            </span>
            Starting at - <span className="text-xl font-bold text-accent">$160.00</span>
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
        </div>

        <p className="px-10 text-lg text-primary-content md:text-3xl">Estimates calculator and Scheduling appointments</p>
        <h1 className="text-2xl font-bold text-accent md:text-7xl">Coming soon...</h1>

        <div className="my-10 flex flex-row md:hidden md:gap-10">
          <img className="relative left-0 w-96 rounded-full md:-top-10" src={landing_page_foto_1} alt="cleaning service" />
          <img className="relative left-0 top-0 hidden w-96 rounded-full md:block" src={landing_page_foto_2} alt="cleaning service" />
          <img className="relative left-0 top-10 hidden w-96 rounded-full md:block" src={landing_page_foto_3} alt="cleaning service" />
        </div>
      </section>

      <div className="flex justify-center">
        <h1 className="text-4xl font-light">
          Call now <span className="font-bold text-accent">(770) 610-3339</span>
        </h1>
      </div>
    </Layout>
  );
}

export const Head = () => (
  <>
    <title>Home Page</title>
  </>
);
