import { useState, useEffect } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config";

// Resolve Tailwind config and extract breakpoints
const getTailwindBreakpoints = () => {
  const config = resolveConfig(tailwindConfig);
  const screens = config.theme.screens;

  // Convert breakpoint values from strings (e.g., '640px') to numbers (e.g., 640)
  return Object.keys(screens).reduce((acc: { [key: string]: number }, key) => {
    const value = screens[key as keyof typeof screens];
    if (typeof value === "string") {
      acc[key] = parseInt(value.replace("px", ""), 10);
    }
    return acc;
  }, {});
};

// Extract breakpoints once at the top level
const breakpoints = getTailwindBreakpoints();

// Helper function to get the current breakpoint based on the window width
const getBreakpointFromWidth = (width: number): string => {
  if (width >= breakpoints["2xl"]) return "2xl";
  if (width >= breakpoints.xl) return "xl";
  if (width >= breakpoints.lg) return "lg";
  if (width >= breakpoints.md) return "md";
  if (width >= breakpoints.sm) return "sm";
  return "xs"; // For any screen smaller than the smallest breakpoint
};

interface UseBreakpoint {
  breakpoint: string;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

// Hook to get the current Tailwind breakpoint
export const useBreakpoint = (): UseBreakpoint => {
  // Calculate initial breakpoint immediately based on current window width
  const initialBreakpoint = getBreakpointFromWidth(typeof window !== "undefined" ? window.innerWidth : 0);
  const [currentBreakpoint, setCurrentBreakpoint] = useState(initialBreakpoint);

  useEffect(() => {
    // Only run in the browser, not during SSR
    if (typeof window === "undefined") return;

    const updateBreakpoint = () => setCurrentBreakpoint(getBreakpointFromWidth(window.innerWidth));

    // Add resize event listener
    window.addEventListener("resize", updateBreakpoint);

    // Cleanup: remove event listener on unmount
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  const isMobile = ["xs", "sm"].includes(currentBreakpoint);

  const isTablet = ["sm", "md"].includes(currentBreakpoint);

  const isDesktop = ["md", "lg", "xl", "2xl"].includes(currentBreakpoint);

  return { breakpoint: currentBreakpoint, isMobile, isTablet, isDesktop };
};
