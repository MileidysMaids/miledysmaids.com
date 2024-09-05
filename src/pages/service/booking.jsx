import React from "react";
import Booking from "@/components/Booking/";

export default function Component({ injectedClassNames }) {
  return (
    <div className={[injectedClassNames, "flex flex-col"].join(" ")}>
      <Booking />
    </div>
  );
}
