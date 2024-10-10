import * as React from "react";
import { DayPicker, ClassNames, useDayPicker, CalendarDay, Modifiers } from "react-day-picker";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const classes = {
  root: "flex flex-col justify-center items-center w-full h-full relative sm:pt-9 ",
  months: "flex flex-col sm:flex-col space-y-4 sm:space-x-4 sm:space-y-0 w-full h-full relative",
  month: "space-y-4 flex flex-col w-full h-full ",
  month_caption: "flex justify-center pt-1 items-center sm:mt-10",
  caption_label: "absolute flex items-center justify-center top-0 h-9 left-0 text-sm md:text-xl text-primary font-bold text-center w-full",
  nav: "flex flex-row justify-between items-center w-full h-9 absolute top-0 z-10 left-0",
  button_previous: " hover:text-white rounded-full",
  button_next: " hover:text-white rounded-full",
  month_grid: "w-full h-full flex flex-col",
  weekdays: "grid grid-cols-7",
  week: "grid grid-cols-7 h-full ",
  weeks: "flex flex-col justify-between items-between h-full ",
  day: "h-9 w-9 p-0 self-center text-center text-primary",
  day_button: cn(
    buttonVariants({ variant: "ghost" }),
    "h-full w-full p-0 font-bold aria-selected:opacity-100 rounded-full  focus:text-white hover:text-white selected:text-white",
  ),
  today: "bg-secondary text-white rounded-full focus:rounded-full",
  range_start: "day-range-start rounded-full ",
  range_end: "day-range-end",
  selected: "bg-accent text-white rounded-full focus:rounded-full focus:text-white",
  outside:
    "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
  disabled: "text-muted-foreground opacity-50 font-normal",
  range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
  hidden: "invisible",

  chevron: "h-10 w-10 hover:bg-accent hover:text-accent-foreground p-1",
} as ClassNames;

const DayButton = (
  props: {
    day: CalendarDay;
    modifiers: Modifiers;
  } & JSX.IntrinsicElements["button"],
) => {
  const { day, modifiers, ...rest } = props;
  // console.log(modifiers);

  const btnRef = React.useRef<HTMLButtonElement>(null);

  const animations = {
    initial: { x: 10, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { delay: (modifiers.outside ? 1 : Number(props.children)) * 0.025 },
  };

  // @ts-ignore
  return <motion.button ref={btnRef} {...rest} {...animations} />;
};

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps & { onSelect: (date: string) => void }) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{ ...classes, ...classNames }}
      components={{ DayButton }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
