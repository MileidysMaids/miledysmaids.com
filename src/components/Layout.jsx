import React from "react";
import { Logo } from "./Logo.jsx";

export const NavBar = ({ children, ...props }) => {
  return (
    <div className="absolute left-0 top-0 z-10 flex w-full justify-center">
      <div className="drawer" {...props}>
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex h-full flex-col">
          <div className="navbar h-full w-full bg-transparent md:px-10">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-6 w-6 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </label>
            </div>

            <div className="relative mx-2 h-full w-full gap-4 px-2">
              <Logo className="block h-full w-auto" />
              <h1 className="text-xl font-bold">Mileidy's Maids</h1>
            </div>

            <nav className="hidden flex-none lg:block">
              <ul className="menu menu-horizontal gap-6 font-bold">{children}</ul>
            </nav>
          </div>
        </div>

        <div className="drawer-side">
          <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu min-h-full w-80 bg-base-200 p-4">{children}</ul>
        </div>
      </div>
    </div>
  );
};

export const Layout = ({ children }) => {
  return (
    <main className="flex w-full flex-col" data-theme="cake">
      <NavBar className="h-20 w-full md:w-10/12">
        <li>
          <a href="/about">About us</a>
        </li>
        <li>
          <a href="/services">Services</a>
        </li>
        <li>
          <a href="/faq">FAQ</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
      </NavBar>

      <div className="">{children}</div>

      <footer className="top-oval bg-secondary p-10 pt-32 text-primary-content">
        <div className="hidden">
          <div id="contact-us">
            <h2 className="text-2xl font-bold">Contact us</h2>
            <p className="text-lg">Email: support@mileidysmaids.com </p>
            <p className="text-lg">Phone: +1 (404) 123-4567</p>
          </div>

          <div id="social-media" className="flex gap-5">
            <a href="https://facebook.com" className="btn btn-circle btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-6 w-6 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 16V8h6M9 16c-2.667 0-3 2-3 4h6c0-2 0-4-3-4z"></path>
              </svg>
            </a>
            <a href="https://twitter.com" className="btn btn-circle btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-6 w-6 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 2l7 4-7 4V2z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 12h20"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 22l7-4-7-4v8z"></path>
              </svg>
            </a>
            <a href="https://instagram.com" className="btn btn-circle btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-6 w-6 stroke-current">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 2H10a2 2 0 0 0-2 2v4m8-4v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2m8 4h4a2 2 0 0 1 2 2v8m-8-4a2 2 0 0 0-2 2v8"></path>
              </svg>
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-5">
          <Logo className="block h-32 w-auto" />
          <p className="text-center text-lg font-bold">Mileidy's Maids</p>
          <p className="text-center text-lg">Reliable house cleaning professionals serving the greater Atlanta area</p>
          <p className="text-center text-lg">© 2021 Mileidy's Maids</p>
        </div>
      </footer>
    </main>
  );
};
