import { useMediaQuery } from "react-responsive";
import { theme } from "../../tailwind.config"; // Your tailwind config

const breakpoints = theme?.screens;

type BreakpointKey = keyof typeof breakpoints;

export function useBreakpoint<K extends BreakpointKey>(breakpointKey: K) {
  if (!breakpoints) throw new Error("No theme found in tailwind.config");
  if (!breakpointKey) throw new Error("No breakpoint key provided");
  if (typeof breakpointKey !== "string") throw new Error("Breakpoint key must be a string");

  const bool = useMediaQuery({ query: `(min-width: ${breakpoints[breakpointKey]})` });

  const capitalizedKey = (breakpointKey as string)[0].toUpperCase() + (breakpointKey as string).substring(1);

  type Key = `is${Capitalize<K>}`;

  return { [`is${capitalizedKey}`]: bool } as Record<Key, boolean>;
}
