import * as React from "react";
import shine from "../images/svg/shine.svg";
import landing_page_photo_1 from "@/images/landing-page-1.jpg";
import landing_page_photo_2 from "@/images/landing-page-2.jpg";
import landing_page_photo_3 from "@/images/landing-page-3.jpg";

import { LayoutClassNames } from "@/components/Layout";

export default function IndexPage({ injectedClassNames }: LayoutClassNames) {
  React.useEffect(() => {
    fetch("/api/health");
  }, []);

  const HomePageHeader = () => (
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

      <p className="px-10 text-lg text-secondary md:block md:text-3xl">
        Starting at -<span className="font-bold text-accent"> $80</span>
        <span className="-translate-x-2 translate-y-1 text-sm">/cleaning</span>
      </p>

      <a
        className="btn glass btn-warning text-wrap text-secondary md:btn-md lg:btn-lg"
        data-token="50a11f3204e740a39e0971a66f897904"
        data-orgname="Mileidys-Maids"
        href="/service/booking">
        Book now!
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
        <img className="mask mask-squircle relative left-0 w-96 md:-top-10" src={landing_page_photo_1} alt="cleaning service" />
        <img className="relative left-0 top-0 hidden w-96 rounded-full md:block" src={landing_page_photo_2} alt="cleaning service" />
        <img className="relative left-0 top-10 hidden w-96 rounded-full md:block" src={landing_page_photo_3} alt="cleaning service" />
      </div>
    </section>
  );

  return (
    <>
      <HomePageHeader />

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
