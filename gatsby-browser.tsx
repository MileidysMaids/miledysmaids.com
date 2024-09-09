import React from "react";
import "./src/styles/global.css";
import { Layout } from "@/components/Layout";
// import { ProviderMap } from "@/components/Providers";
import type { GatsbyBrowser } from "gatsby";

// Wraps every page in a component
export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
  // return (
  //   <ProviderMap>
  //     <Layout {...props}>{element}</Layout>
  //   </ProviderMap>
  // );
};
