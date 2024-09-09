import React from "react";
import Booking from "@/components/Booking/";
import { LayoutClassNames } from "@/components/Layout";

export default function Component({ injectedClassNames }: LayoutClassNames) {
  return (
    <div className={[injectedClassNames, "flex flex-col"].join(" ")}>
      <Booking />
    </div>
  );
}
