import React from "react";

export const Card = ({ children, className, ...props }: React.ComponentProps<"div">) => (
  <div className="card border bg-base-100 shadow-xl" {...props}>
    {children}
  </div>
);

export const CardContent = ({ children, className, ...props }: React.ComponentProps<"div">) => (
  <div className={["card-body", className].join(" ")}>{children}</div>
);
