import React from "react";
import { Logo } from "./Logo.js";

export const NavBar = ({ children, ...props }) => {
  return (
    <div className="drawer" {...props}>
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        <nav className="navbar w-full bg-transparent md:px-10">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-6 w-6 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
          </div>

          <div className="mx-2 flex-1 px-2">
            <Logo className="w-24" />
            <h1 className="text-xl font-bold">Mileidy's Maids</h1>
          </div>

          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal gap-6 font-bold">{children}</ul>
          </div>
        </nav>
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu min-h-full w-80 bg-base-200 p-4">{children}</ul>
      </div>
    </div>
  );
};
