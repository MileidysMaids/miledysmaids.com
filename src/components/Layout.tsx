import React from "react";
import { Logo } from "./Logo";

export type LayoutClassNames = { injectedClassNames: string };

export const NavBar = ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => {
  return (
    <div className="left-0 top-0 z-10 flex w-dvw lg:absolute lg:justify-center">
      <div className="drawer" {...props}>
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex h-full flex-col">
          <div className="navbar h-full w-full bg-transparent md:px-10">
            <div className="flex-none lg:hidden">
              {children && (
                <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-6 w-6 stroke-current">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                </label>
              )}
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

export const Footer = () => {
  return (
    <footer className="top-oval footer footer-center w-dvw bg-secondary pb-5 pt-10 text-primary-content sm:mt-10">
      <aside>
        <Logo className="block h-32" />
        <p>
          Mileidy's Maids
          <br />
          Top quality house cleaning services
        </p>
        <p>Copyright © {new Date().getFullYear()} Affordable Housekeeping LLC</p>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
            </svg>
          </a>
          <a>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
            </svg>
          </a>
          <a>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
            </svg>
          </a>
        </div>
      </nav>
    </footer>
  );
};

export const Layout = ({ children }: React.PropsWithChildren) => {
  // Inject styles only to the first children element
  const childrenArray = React.Children.toArray(children);
  const firstChildrenWithStyles = React.cloneElement(childrenArray[0] as React.ReactElement, {
    injectedClassNames: "pt-5 md:pt-20 flex-1 ",
  });
  const childrenWithInjectedStyles = [firstChildrenWithStyles, ...childrenArray.slice(1)];

  return (
    <main className="relative flex min-h-[100vh] flex-col overflow-x-hidden" data-theme="cake">
      <NavBar className="h-20 md:w-10/12">
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

      {childrenWithInjectedStyles}

      <Footer />
    </main>
  );
};
