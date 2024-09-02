import React from "react";
import Booking from "@/components/Booking/Booking";

export default function Component({ injectedClassNames }) {
  return (
    <div className={[injectedClassNames].join(" ")}>
      <Booking />
    </div>
  );
}
