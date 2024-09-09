import React from "react";
import static_logo from "../images/logo.png";

export const Logo = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  return <img src={static_logo} {...props} alt="logo" />;
};
